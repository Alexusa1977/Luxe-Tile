
import React, { useState } from 'react';
import { ProjectDetail, ProjectArea, TileType } from '../types';
import { 
  Home, 
  Utensils, 
  Bath, 
  Sofa, 
  Bed,
  Trees, 
  MoreHorizontal, 
  ChevronLeft, 
  CheckCircle2, 
  HelpCircle,
  MessageSquare,
  Check,
  Hammer,
  Calendar as CalendarIcon,
  Upload,
  X
} from 'lucide-react';
import { getMaterialAdvice } from '../services/geminiService';

interface StepProjectInfoProps {
  data: ProjectDetail;
  updateData: (data: Partial<ProjectDetail>) => void;
  onBack: () => void;
  onSubmit: () => void;
}

const StepProjectInfo: React.FC<StepProjectInfoProps> = ({ data, updateData, onBack, onSubmit }) => {
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  const areas = [
    { id: ProjectArea.KITCHEN, icon: Utensils, label: 'Kitchen' },
    { id: ProjectArea.BATHROOM, icon: Bath, label: 'Bathroom' },
    { id: ProjectArea.LIVING_ROOM, icon: Sofa, label: 'Living Room' },
    { id: ProjectArea.BEDROOM, icon: Bed, label: 'Bedroom' },
    { id: ProjectArea.OUTDOOR, icon: Trees, label: 'Outdoor' },
    { id: ProjectArea.OTHER, icon: MoreHorizontal, label: 'Other' },
  ];

  const subAreasByArea: Record<ProjectArea, string[]> = {
    [ProjectArea.KITCHEN]: ['Floor', 'Backsplash', 'Countertop', 'Island'],
    [ProjectArea.BATHROOM]: ['Floor', 'Shower Walls', 'Shower Floor', 'Tub Surround', 'Vanity Backsplash'],
    [ProjectArea.LIVING_ROOM]: ['Floor', 'Fireplace', 'Accent Wall'],
    [ProjectArea.BEDROOM]: ['Floor', 'Accent Wall', 'Closet'],
    [ProjectArea.OUTDOOR]: ['Patio', 'Pool Deck', 'Walkway', 'Facade'],
    [ProjectArea.OTHER]: ['Floor', 'Wall', 'Other'],
  };

  const tileTypes = Object.values(TileType);

  const toggleArea = (areaId: ProjectArea) => {
    const currentAreas = data.area;
    let newAreas: ProjectArea[];

    if (currentAreas.includes(areaId)) {
      if (currentAreas.length === 1) return;
      newAreas = currentAreas.filter(a => a !== areaId);
      const newSubAreas = (data.subArea || []).filter(s => !s.startsWith(areaId));
      updateData({ area: newAreas, subArea: newSubAreas });
    } else {
      newAreas = [...currentAreas, areaId];
      updateData({ area: newAreas });
    }
  };

  const toggleSubArea = (areaId: ProjectArea, sub: string) => {
    const id = `${areaId} - ${sub}`;
    const current = data.subArea || [];
    const updated = current.includes(id)
      ? current.filter(item => item !== id)
      : [...current, id];
    updateData({ subArea: updated });
  };

  const handleAskAi = async () => {
    if (!aiQuestion.trim()) return;
    setIsLoadingAi(true);
    const advice = await getMaterialAdvice(aiQuestion);
    setAiResponse(advice);
    setIsLoadingAi(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        const newFiles = Array.from(e.target.files);
        updateData({ photos: [...(data.photos || []), ...newFiles] });
    }
  };

  const removePhoto = (index: number) => {
      const newPhotos = [...(data.photos || [])];
      newPhotos.splice(index, 1);
      updateData({ photos: newPhotos });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Project Details</h2>
        <p className="text-slate-500">Tell us about the space you want to transform.</p>
      </div>

      {/* Area Selection (Multi-select) */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-3">Which rooms are we working on? (Select all that apply)</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {areas.map((area) => {
            const isSelected = data.area.includes(area.id);
            return (
              <button
                key={area.id}
                onClick={() => toggleArea(area.id)}
                className={`relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-200'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <Check className="w-4 h-4 text-indigo-600" />
                  </div>
                )}
                <area.icon className={`w-6 h-6 mb-2 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span className="text-sm font-medium">{area.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Sub-Areas (Grouped by Selected Area) */}
      {data.area.length > 0 && (
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 space-y-6">
          <label className="block text-sm font-medium text-slate-700">
            What surfaces need tiling?
          </label>
          
          {data.area.map(areaId => (
            <div key={areaId} className="animate-in fade-in slide-in-from-top-2 duration-300">
               <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 border-b border-slate-200 pb-1">
                 {areas.find(a => a.id === areaId)?.label} Surfaces
               </h4>
               <div className="flex flex-wrap gap-2">
                 {subAreasByArea[areaId].map((sub) => {
                   const fullId = `${areaId} - ${sub}`;
                   const isActive = data.subArea?.includes(fullId);
                   return (
                     <button
                       key={fullId}
                       onClick={() => toggleSubArea(areaId, sub)}
                       className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                         isActive
                           ? 'bg-indigo-600 text-white shadow-md'
                           : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                       }`}
                     >
                       {sub}
                     </button>
                   );
                 })}
               </div>
            </div>
          ))}

          {data.subArea?.length === 0 && (
            <p className="text-xs text-amber-600 mt-2 flex items-center">
               Please select at least one surface.
            </p>
          )}
        </div>
      )}

      {/* Demolition & Start Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Demolition Toggle */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between shadow-sm">
            <div className="flex items-center mb-4">
                <div className="bg-indigo-50 p-2 rounded-lg mr-3">
                    <Hammer className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                    <h3 className="font-medium text-slate-900 text-sm">Removal Needed?</h3>
                    <p className="text-xs text-slate-500">Remove old flooring/tile?</p>
                </div>
            </div>
            <div className="flex bg-slate-100 rounded-lg p-1">
                <button 
                    type="button"
                    onClick={() => updateData({ requiresDemo: false })}
                    className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all ${!data.requiresDemo ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    No
                </button>
                <button 
                    type="button"
                    onClick={() => updateData({ requiresDemo: true })}
                    className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all ${data.requiresDemo ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    Yes
                </button>
            </div>
        </div>

        {/* Start Date */}
        <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Estimated Start Date</label>
            <div className="relative">
                <CalendarIcon className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <input 
                    type="date" 
                    value={data.startDate}
                    onChange={(e) => updateData({ startDate: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none h-[62px]"
                />
            </div>
        </div>
      </div>

      {/* Material Selection & AI Helper */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="block text-sm font-medium text-slate-700">Preferred Material</label>
          <button
            onClick={() => setShowAiModal(true)}
            className="text-xs flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
          >
            <HelpCircle className="w-3 h-3 mr-1" />
            Not sure? Ask AI Expert
          </button>
        </div>
        <select
          value={data.tileType}
          onChange={(e) => updateData({ tileType: e.target.value as TileType })}
          className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-200 outline-none bg-white"
        >
          {tileTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Square Footage Slider */}
      <div>
        <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-slate-700">Estimated Total Area</label>
            <span className="text-sm font-bold text-indigo-600">{data.approxSqFt} sq. ft.</span>
        </div>
        <input
          type="range"
          min="20"
          max="4000"
          step="10"
          value={data.approxSqFt}
          onChange={(e) => updateData({ approxSqFt: parseInt(e.target.value) })}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>20 sq ft</span>
            <span>4000+ sq ft</span>
        </div>
      </div>

      {/* Photo Upload */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Upload Photos (Optional)</label>
        <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors relative cursor-pointer group">
            <input 
                type="file" 
                multiple 
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                onChange={handleFileChange}
            />
            <div className="group-hover:scale-105 transition-transform duration-200">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm text-slate-600 font-medium">Click to upload or drag and drop</p>
                <p className="text-xs text-slate-400 mt-1">JPG, PNG up to 5MB</p>
            </div>
        </div>
        
        {/* File List */}
        {data.photos && data.photos.length > 0 && (
            <div className="mt-4 space-y-2">
                {data.photos.map((file, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-200 text-sm animate-in slide-in-from-left-2 duration-200">
                        <div className="flex items-center overflow-hidden">
                            <div className="bg-indigo-100 p-1.5 rounded mr-3">
                                <Upload className="w-3 h-3 text-indigo-600" />
                            </div>
                            <span className="truncate max-w-[200px] text-slate-700 font-medium">{file.name}</span>
                            <span className="ml-2 text-xs text-slate-400">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                        </div>
                        <button 
                            onClick={() => removePhoto(idx)} 
                            className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-1 rounded transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Additional Notes / Description</label>
        <textarea
            value={data.description}
            onChange={(e) => updateData({ description: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-200 outline-none min-h-[100px]"
            placeholder="Describe your vision, specific colors, or existing conditions..."
        />
      </div>

      {/* Navigation */}
      <div className="flex gap-4 pt-4">
        <button
          onClick={onBack}
          className="flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <button
          onClick={onSubmit}
          className="flex-[2] flex items-center justify-center space-x-2 py-3 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/30 transition-all"
        >
          <span>Submit Request</span>
          <CheckCircle2 className="w-5 h-5" />
        </button>
      </div>

      {/* AI Modal */}
      {showAiModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-800 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-indigo-600" />
                AI Material Consultant
              </h3>
              <button onClick={() => setShowAiModal(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>
            
            <div className="mb-4 bg-slate-50 p-4 rounded-lg min-h-[100px] max-h-[200px] overflow-y-auto text-sm text-slate-700">
              {aiResponse ? aiResponse : "Ask me about durability, slip resistance, or style trends..."}
            </div>

            <div className="flex gap-2">
              <input 
                type="text" 
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                placeholder="e.g., Best tile for a dog friendly home?"
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                onKeyDown={(e) => e.key === 'Enter' && handleAskAi()}
              />
              <button 
                onClick={handleAskAi}
                disabled={isLoadingAi || !aiQuestion.trim()}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
              >
                {isLoadingAi ? '...' : 'Ask'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepProjectInfo;
