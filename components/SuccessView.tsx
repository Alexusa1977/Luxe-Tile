
import React from 'react';
import { CheckCircle, Mail } from 'lucide-react';
import { FormData } from '../types';
import { generateMailtoLink } from '../services/emailService';

const SuccessView: React.FC<{ data: FormData }> = ({ data }) => {
  const mailtoLink = generateMailtoLink(data);

  return (
    <div className="text-center py-12 px-6 animate-in zoom-in-95 duration-500">
      <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
        <CheckCircle className="w-10 h-10 text-green-600" />
      </div>
      <h2 className="text-3xl font-bold text-slate-900 mb-4">Request Received!</h2>
      <p className="text-slate-600 mb-2 max-w-md mx-auto">
        Thanks, {data.lead.firstName}. We have successfully received your project details.
      </p>
      <p className="text-indigo-600 font-medium mb-8 max-w-md mx-auto bg-indigo-50 p-3 rounded-lg border border-indigo-100">
        We will send the formal estimate request to your email ({data.lead.email}) and via SMS to {data.lead.phone} shortly.
      </p>
      
      <p className="text-sm text-slate-400 mb-8 max-w-md mx-auto">
         Project Location: {data.lead.street}, {data.lead.city}, {data.lead.state} {data.lead.zip}
      </p>
      
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm max-w-sm mx-auto text-left mb-6">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Project Summary</h3>
        <div className="space-y-3 text-sm">
           <div className="flex justify-between">
             <span className="text-slate-500">Areas:</span>
             <span className="font-medium text-slate-900 text-right max-w-[60%]">
               {data.project.area.join(', ')}
             </span>
           </div>
           <div className="flex flex-col gap-1">
             <span className="text-slate-500">Selected Surfaces:</span>
             <div className="flex flex-wrap gap-1 justify-end">
                {data.project.subArea?.map(sub => (
                    <span key={sub} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-xs">
                        {sub}
                    </span>
                )) || <span className="text-slate-400 text-right">General</span>}
             </div>
           </div>
           <div className="flex justify-between pt-2">
             <span className="text-slate-500">Material:</span>
             <span className="font-medium text-slate-900">{data.project.tileType}</span>
           </div>
           <div className="flex justify-between">
             <span className="text-slate-500">Total Size:</span>
             <span className="font-medium text-slate-900">{data.project.approxSqFt} sq. ft.</span>
           </div>
           <div className="flex justify-between border-t border-slate-100 pt-2 mt-2">
             <span className="text-slate-500">Demolition:</span>
             <span className={`font-medium ${data.project.requiresDemo ? 'text-amber-600' : 'text-slate-900'}`}>
                {data.project.requiresDemo ? 'Yes, required' : 'No, not needed'}
             </span>
           </div>
           <div className="flex justify-between">
             <span className="text-slate-500">Start Date:</span>
             <span className="font-medium text-slate-900">
                {data.project.startDate ? new Date(data.project.startDate).toLocaleDateString() : 'Flexible'}
             </span>
           </div>
           {data.project.photos && data.project.photos.length > 0 && (
            <div className="flex justify-between">
                <span className="text-slate-500">Photos Attached:</span>
                <span className="font-medium text-slate-900">{data.project.photos.length} files</span>
            </div>
           )}
        </div>
      </div>

      <div className="space-y-4">
        <a 
          href={mailtoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors w-full max-w-sm"
        >
          <Mail className="w-4 h-4" />
          <span>Send Details to Bbizness via Email</span>
        </a>
        
        <div>
            <button 
                onClick={() => window.location.reload()}
                className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
            >
                Start a New Estimate
            </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessView;
