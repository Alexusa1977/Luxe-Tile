
import React from 'react';
import { LeadInfo } from '../types';
import { User, Mail, Phone, ChevronRight, MapPin, MessageSquare } from 'lucide-react';

interface StepLeadInfoProps {
  data: LeadInfo;
  updateData: (data: Partial<LeadInfo>) => void;
  onNext: () => void;
}

const StepLeadInfo: React.FC<StepLeadInfoProps> = ({ data, updateData, onNext }) => {
  const isValid = 
    data.firstName && 
    data.lastName && 
    data.email && 
    data.phone &&
    data.street &&
    data.city &&
    data.state &&
    data.zip &&
    data.marketingConsent;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Let's Get Started</h2>
        <p className="text-slate-500 mt-2">We need a few details to contact you about your estimate.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">First Name</label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <input
              type="text"
              value={data.firstName}
              onChange={(e) => updateData({ firstName: e.target.value })}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              placeholder="Jane"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Last Name</label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <input
              type="text"
              value={data.lastName}
              onChange={(e) => updateData({ lastName: e.target.value })}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              placeholder="Doe"
              required
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <input
              type="email"
              value={data.email}
              onChange={(e) => updateData({ email: e.target.value })}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              placeholder="jane@example.com"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => updateData({ phone: e.target.value })}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              placeholder="(555) 123-4567"
              required
            />
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-6">
        <h3 className="text-md font-semibold text-slate-800 mb-4">Project Address</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Street Address</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input
                type="text"
                value={data.street}
                onChange={(e) => updateData({ street: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                placeholder="123 Main St"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-6 gap-4">
            <div className="col-span-3 space-y-2">
              <label className="text-sm font-medium text-slate-700">City</label>
              <input
                type="text"
                value={data.city}
                onChange={(e) => updateData({ city: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                placeholder="New York"
                required
              />
            </div>
            <div className="col-span-1 space-y-2">
              <label className="text-sm font-medium text-slate-700">State</label>
              <input
                type="text"
                value={data.state}
                onChange={(e) => updateData({ state: e.target.value })}
                className="w-full px-2 py-3 text-center rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                placeholder="NY"
                maxLength={2}
                required
              />
            </div>
            <div className="col-span-2 space-y-2">
              <label className="text-sm font-medium text-slate-700">Zip</label>
              <input
                type="text"
                value={data.zip}
                onChange={(e) => updateData({ zip: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                placeholder="10001"
                required
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 mt-4">
        <div className="flex items-start space-x-3">
          <div className="flex h-6 items-center">
            <input
              id="consent"
              type="checkbox"
              checked={data.marketingConsent}
              onChange={(e) => updateData({ marketingConsent: e.target.checked })}
              className="h-5 w-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
            />
          </div>
          <div className="text-sm leading-snug">
            <label htmlFor="consent" className="font-medium text-slate-900 cursor-pointer">
              Communication Authorization
            </label>
            <p className="text-slate-500 mt-1">
              I authorize LuxeTile to send me the detailed estimate and project updates via email and SMS.
            </p>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={!isValid}
          className={`w-full flex items-center justify-center space-x-2 py-4 rounded-lg font-semibold text-white transition-all transform ${
            isValid
              ? 'bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/30 translate-y-0'
              : 'bg-slate-300 cursor-not-allowed'
          }`}
        >
          <span>Continue to Project Details</span>
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
};

export default StepLeadInfo;
