import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'Google Reviews API is working',
    status: 'success',
    timestamp: new Date().toISOString(),
    instructions: [
      '1. Set up your Google Places API key in .env.local',
      '2. Update the Place ID in the homepage component',
      '3. Test the integration by visiting your homepage',
      '4. Check the browser console for any errors',
    ],
    requiredEnvVars: [
      'NEXT_PUBLIC_GOOGLE_PLACES_API_KEY',
      'NEXT_PUBLIC_GOOGLE_PLACE_ID',
    ],
    currentConfig: {
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY ? 'Set' : 'Not set',
      placeId: process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID ? 'Set' : 'Not set',
    },
  });
} 