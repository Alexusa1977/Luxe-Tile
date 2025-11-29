import { FormData } from '../types';

export const formatEmailBody = (data: FormData): string => {
  const { lead, project } = data;
  return `
New Estimate Request from Bbizness App
======================================

LEAD INFORMATION
----------------
Name:    ${lead.firstName} ${lead.lastName}
Email:   ${lead.email}
Phone:   ${lead.phone}
Address: ${lead.street}, ${lead.city}, ${lead.state} ${lead.zip}

PROJECT DETAILS
---------------
Areas:       ${project.area.join(', ')}
Surfaces:    ${project.subArea?.join(', ') || 'None specified'}
Material:    ${project.tileType}
Approx Size: ${project.approxSqFt} sq ft
Demolition:  ${project.requiresDemo ? 'Yes' : 'No'}
Start Date:  ${project.startDate || 'Flexible'}
Photos:      ${project.photos?.length || 0} attached

Description:
${project.description || 'No additional notes provided.'}

Marketing Consent: ${lead.marketingConsent ? 'Yes' : 'No'}
  `.trim();
};

export const generateMailtoLink = (data: FormData): string => {
  const subject = encodeURIComponent(`Estimate Request: ${data.lead.firstName} ${data.lead.lastName}`);
  const body = encodeURIComponent(formatEmailBody(data));
  return `mailto:teamwin365@gmail.com?subject=${subject}&body=${body}`;
};
