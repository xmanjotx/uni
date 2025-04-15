import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  try {
    const { type, name, content } = await req.json();
    
    const response = await axios.post('https://api.deepseek.com/v1/chat/completions', {
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: 'You are an AI medical assistant analyzing medical documents. Provide clear and structured analysis while noting that you are not a replacement for professional medical diagnosis.'
        },
        {
          role: 'user',
          content: `Please analyze this medical document. File type: ${type}, File name: ${name}\n\nContent: ${content}`
        }
      ]
    }, {
      headers: {
        'Authorization': `Bearer sk-3a43fbd8e2084f5288e39ff997117679`,
        'Content-Type': 'application/json'
      }
    });

    return NextResponse.json({
      analysis: response.data.choices[0].message.content
    });
  } catch (error) {
    console.error('Error in analyze route:', error);
    return NextResponse.json(
      { error: 'Failed to analyze the document' },
      { status: 500 }
    );
  }
}
