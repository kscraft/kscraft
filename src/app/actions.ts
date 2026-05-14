'use server';

import { z } from 'zod';
import fs from 'fs/promises';
import path from 'path';

const inquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid corporate email'),
  phone: z.string().min(8, 'Please enter a valid phone number'),
  scope: z.string().min(1, 'Please select a project scope'),
  requirements: z.string().min(10, 'Technical requirements must be more detailed'),
  utmSource: z.string().optional(),
});

export async function submitInquiry(prevState: unknown, formData: FormData) {
  const validatedFields = inquirySchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    scope: formData.get('scope'),
    requirements: formData.get('requirements'),
    utmSource: formData.get('utmSource') || 'direct',
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Please review your submission.',
    };
  }

  // Simulate database latency
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const leadData = {
    ...validatedFields.data,
    timestamp: new Date().toISOString(),
  };

  console.log('Technical Inquiry Received:', leadData);

  // Persist to local JSON file
  try {
    const leadsFilePath = path.join(process.cwd(), 'leads.json');
    let existingLeads = [];
    try {
      const fileData = await fs.readFile(leadsFilePath, 'utf8');
      existingLeads = JSON.parse(fileData);
    } catch (e) {
      // File doesn't exist yet, which is fine
    }
    existingLeads.push(leadData);
    await fs.writeFile(leadsFilePath, JSON.stringify(existingLeads, null, 2), 'utf8');
  } catch (error) {
    console.error('Failed to persist lead:', error);
    // Don't fail the user request if persistence fails
  }

  // In a real scenario, we would use a library like Resend or Nodemailer here to send email.

  return {
    success: true,
    message: 'Technical inquiry received. Our engineering team will review your requirements and respond shortly.',
  };
}
