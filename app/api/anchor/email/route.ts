import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, age, location, email } = body;

    // Validate required fields
    if (!name || !age || !location || !email) {
      return NextResponse.json({ success: false, error: 'Missing required visitor data' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: 'Invalid email format' }, { status: 400 });
    }

    const webhookUrl = process.env.N8N_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error('N8N_WEBHOOK_URL is not defined in environment variables');
      return NextResponse.json({ success: false, error: 'Server configuration error' }, { status: 500 });
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        age,
        location,
        email
      }),
    });

    const responseText = await response.text();
    let n8nData: any = {};
    
    try {
      if (responseText) {
        n8nData = JSON.parse(responseText);
      }
    } catch (e) {
      n8nData = { raw: responseText };
    }

    // Normalize n8n response (n8n sometimes returns an array of objects)
    const normalizedData = Array.isArray(n8nData) ? n8nData[0] : n8nData;

    if (!response.ok) {
      const errorMessage = normalizedData.message || normalizedData.error || `Failed to send data to n8n: ${response.status}`;
      return NextResponse.json({ success: false, error: errorMessage }, { status: response.status });
    }

    return NextResponse.json({ success: true, ...normalizedData }, { status: response.status });
  } catch (error: any) {
    console.error('Error in n8n email API route:', error.message);
    return NextResponse.json({ success: false, error: 'Failed to process request' }, { status: 500 });
  }
}
