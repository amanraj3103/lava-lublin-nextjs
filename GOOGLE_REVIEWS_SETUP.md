# Google Reviews Integration Setup

This guide will help you set up the Google Places API to display real Google reviews on your LAVA LUBLIN website.

## Prerequisites

1. A Google Cloud Platform account
2. A Google Business Profile for LAVA LUBLIN
3. Basic knowledge of Google Cloud Console

## Step 1: Get Your Google Places API Key

### 1.1 Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable billing for your project (required for API usage)

### 1.2 Enable the Places API
1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Places API"
3. Click on "Places API" and click "Enable"

### 1.3 Create API Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy the generated API key
4. **Important**: Restrict the API key to only the Places API and your domain for security

### 1.4 Set API Key Restrictions (Recommended)
1. Click on your API key to edit it
2. Under "Application restrictions", select "HTTP referrers (websites)"
3. Add your domain: `https://your-domain.com/*`
4. Under "API restrictions", select "Restrict key"
5. Select "Places API" from the dropdown
6. Click "Save"

## Step 2: Get Your Place ID

### 2.1 Find Your Place ID
1. Go to [Google's Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)
2. Search for "LAVA LUBLIN" and your address
3. Copy the Place ID (it looks like: `ChIJN1t_tDeuEmsRUsoyG83frY4`)

### 2.2 Verify Your Place ID
You can also find your Place ID by:
1. Going to your Google Business Profile
2. Looking at the URL when you're in the reviews section
3. The Place ID is in the URL parameters

## Step 3: Configure Environment Variables

### 3.1 Create Environment File
Create a `.env.local` file in your project root:

```bash
# Google Places API Configuration
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=your_actual_api_key_here
NEXT_PUBLIC_GOOGLE_PLACE_ID=your_actual_place_id_here
```

### 3.2 For Production (Vercel)
1. Go to your Vercel project dashboard
2. Navigate to "Settings" > "Environment Variables"
3. Add the following variables:
   - `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY`: Your API key
   - `NEXT_PUBLIC_GOOGLE_PLACE_ID`: Your Place ID

## Step 4: Test the Integration

### 4.1 Local Testing
1. Start your development server: `npm run dev`
2. Navigate to your homepage
3. Scroll to the testimonials section
4. You should see real Google reviews loading

### 4.2 Troubleshooting
If reviews don't load:
1. Check the browser console for errors
2. Verify your API key is correct
3. Ensure the Places API is enabled
4. Check that your Place ID is correct
5. Verify API key restrictions allow your domain

## Step 5: Monitor API Usage

### 5.1 Set Up Quotas
1. In Google Cloud Console, go to "APIs & Services" > "Quotas"
2. Set up alerts for when you approach your quota limits
3. Monitor usage in the "APIs & Services" > "Dashboard"

### 5.2 Cost Management
- Google Places API has a free tier: 1,000 requests per day
- Additional requests cost $0.017 per request
- The implementation includes caching to minimize API calls

## Security Best Practices

1. **Never expose your API key** in client-side code (already handled by the API route)
2. **Restrict your API key** to only the Places API and your domain
3. **Monitor usage** regularly to prevent unexpected charges
4. **Use environment variables** for all sensitive data
5. **Implement rate limiting** if needed (handled by the API route)

## Features Included

✅ **Real-time Google Reviews**: Fetches actual reviews from your Google Business Profile
✅ **Responsive Design**: Works on all devices
✅ **Loading States**: Smooth loading animations
✅ **Error Handling**: Graceful fallback to sample reviews
✅ **Caching**: Reduces API calls and improves performance
✅ **Accessibility**: ARIA labels and keyboard navigation
✅ **SEO Friendly**: Proper structured data and meta tags
✅ **Mobile Optimized**: Touch-friendly interface

## Customization

You can customize the component by modifying:
- `maxReviews`: Number of reviews to display (default: 6)
- Styling: Update the Tailwind classes in `GoogleReviews.tsx`
- Animation: Modify the Framer Motion animations
- Fallback content: Update the sample reviews in the error handler

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your API key and Place ID are correct
3. Ensure your Google Business Profile has reviews
4. Contact Google Cloud Support for API-related issues

## Legal Compliance

This implementation follows Google's Terms of Service:
- Properly attributes reviews to Google
- Links to the original Google reviews page
- Respects user privacy and data protection
- Complies with Google's display guidelines 