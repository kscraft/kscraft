'use client';

import { useEffect } from 'react';
import Clarity from '@microsoft/clarity';

export default function ClarityAnalytics() {
  useEffect(() => {
    // Only run on the client, and optionally only in production
    // Initialize Clarity with the project ID
    const isVercelRuntime = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production';
    
    if (isVercelRuntime) {
      Clarity.init('wqurhlymlt');
    }
  }, []);

  return null;
}
