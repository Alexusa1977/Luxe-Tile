import React, { useState } from 'react';
import { FormData, INITIAL_FORM_DATA, LeadInfo, ProjectDetail } from './types';
import StepLeadInfo from './components/StepLeadInfo';
import StepProjectInfo from './components/StepProjectInfo';
import SuccessView from './components/SuccessView';
import { Layers } from 'lucide-react';
import { formatEmailBody } from './services/emailService';

const App: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateLead = (data: Partial<LeadInfo>) => {
    setFormData(prev => ({ ...prev, lead: { ...prev.lead, ...data } }));
  };

  const updateProject = (data: Partial<ProjectDetail>) => {
    setFormData(prev => ({ ...prev, project: { ...prev.project, ...data } }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);
  
  // In a real app, this would submit to an API
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate network delay for sending email
    setTimeout(() => {
        const emailBody = formatEmailBody(formData);
        
        console.group("📧 Email Service Simulation");
        console.log(`To: teamwin365@gmail.com`);
        console.log(`Subject: New Estimate Request - ${formData.lead.firstName} ${formData.lead.lastName}`);
        console.log(`Body:\n${emailBody}`);
        console.log("---------------------------------------------------");
        
        if (formData.lead.marketingConsent) {
            console.log(`[System] Queued confirmation email to client: ${formData.lead.email}`);
            console.log(`[System] Queued confirmation SMS to client: ${formData.lead.phone}`);
        }
        console.groupEnd();

        setIsSubmitting(false);
        nextStep(); 
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4 sm:px-6">
      
      {/* Header / Logo */}
      <div className="mb-10 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600 text-white mb-4 shadow-lg shadow-indigo-600/30">
          <Layers className="w-7 h-7" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Bbizness Estimates</h1>
        <p className="text-slate-500 mt-2 text-lg">Premium Flooring & Tile Solutions</p>
      </div>

      {/* Main Form Container */}
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100">
        
        {/* Progress Bar (Only show if not success) */}
        {step < 3 && (
          <div className="bg-slate-50 px-8 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === 1 ? 'bg-indigo-600 text-white' : 'bg-green-500 text-white'}`}>
                {step > 1 ? '✓' : '1'}
              </div>
              <span className={`text-sm font-medium ${step === 1 ? 'text-indigo-900' : 'text-slate-500'}`}>Contact</span>
            </div>
            <div className="h-1 flex-1 mx-4 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-600 transition-all duration-500 ease-out"
                style={{ width: step === 1 ? '50%' : '100%' }}
              />
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === 2 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                2
              </div>
              <span className={`text-sm font-medium ${step === 2 ? 'text-indigo-900' : 'text-slate-500'}`}>Details</span>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="p-6 md:p-10">
          {step === 1 && (
            <StepLeadInfo 
              data={formData.lead} 
              updateData={updateLead} 
              onNext={nextStep} 
            />
          )}
          {step === 2 && (
            <StepProjectInfo 
              data={formData.project} 
              updateData={updateProject} 
              onBack={prevStep}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          )}
          {step === 3 && (
            <SuccessView data={formData} />
          )}
        </div>
      </div>
      
      <p className="mt-8 text-slate-400 text-sm">
        &copy; {new Date().getFullYear()} Bbizness Inc. All rights reserved.
      </p>
    </div>
  );
};

export default App;