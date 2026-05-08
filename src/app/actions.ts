'use server';

import { z } from 'zod';

const inquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid corporate email'),
  scope: z.string().min(1, 'Please select a project scope'),
  requirements: z.string().min(10, 'Technical requirements must be more detailed'),
});

export async function submitInquiry(prevState: unknown, formData: FormData) {
  const validatedFields = inquirySchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    scope: formData.get('scope'),
    requirements: formData.get('requirements'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Please review your submission.',
    };
  }

  // Simulate database latency or email dispatch
  await new Promise((resolve) => setTimeout(resolve, 1500));

  console.log('Technical Inquiry Received:', validatedFields.data);

  // In a real scenario, we would use a library like Resend or Nodemailer here.
  // For now, we return a success state that the UI can handle.

  return {
    success: true,
    message: 'Technical inquiry received. Our engineering team will review your requirements and respond shortly.',
  };
}
