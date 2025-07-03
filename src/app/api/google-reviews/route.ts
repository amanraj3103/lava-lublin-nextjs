import { NextRequest, NextResponse } from 'next/server';

interface GoogleReview {
  author_name: string;
  rating: number;
  relative_time_description: string;
  text: string;
  profile_photo_url?: string;
}

interface GooglePlacesResponse {
  result: {
    reviews: GoogleReview[];
    rating: number;
    user_ratings_total: number;
  };
  status: string;
}

export async function POST(request: NextRequest) {
  try {
    const { placeId, apiKey, maxReviews = 6 } = await request.json();

    if (!placeId || !apiKey) {
      return NextResponse.json(
        { error: 'Missing required parameters: placeId and apiKey' },
        { status: 400 }
      );
    }

    // Validate API key format (basic check)
    if (!apiKey.startsWith('AIza')) {
      return NextResponse.json(
        { error: 'Invalid API key format' },
        { status: 400 }
      );
    }

    // Fetch reviews from Google Places API
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=reviews,rating,user_ratings_total&key=${encodeURIComponent(apiKey)}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Google API responded with status: ${response.status}`);
    }

    const data: GooglePlacesResponse = await response.json();

    if (data.status !== 'OK') {
      return NextResponse.json(
        { error: `Google API error: ${data.status}` },
        { status: 400 }
      );
    }

    // Process and limit reviews
    const reviews = (data.result.reviews || [])
      .slice(0, maxReviews)
      .map(review => ({
        author_name: review.author_name,
        rating: review.rating,
        relative_time_description: review.relative_time_description,
        text: review.text,
        profile_photo_url: review.profile_photo_url,
      }));

    // Calculate average rating
    const averageRating = data.result.rating || 0;

    // Add caching headers for performance
    const headers = {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400', // Cache for 1 hour, stale for 24 hours
      'Content-Type': 'application/json',
    };

    return NextResponse.json(
      {
        reviews,
        averageRating,
        totalReviews: data.result.user_ratings_total || 0,
        status: 'success',
      },
      { headers }
    );

  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch reviews from Google Places API',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
} 