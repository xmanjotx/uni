import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    
    const response = await axios.post('https://api.deepseek.com/v1/chat/completions', {
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: 'You are an AI medical assistant. Provide helpful medical information and analysis while being clear that you are not a replacement for professional medical advice.'
        },
        { role: 'user', content: message }
      ]
    }, {
      headers: {
        'Authorization': `Bearer sk-3a43fbd8e2084f5288e39ff997117679`,
        'Content-Type': 'application/json'
      }
    });

    return NextResponse.json({
      reply: response.data.choices[0].message.content
    });
  } catch (error) {
    console.error('Error in chat route:', error);
    return NextResponse.json(
      { error: 'Failed to process your request' },
      { status: 500 }
    );
  }
}
