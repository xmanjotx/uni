import { useState } from 'react';

const ApiTest = () => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Direct API key for testing
  const API_KEY = 'sk-3a43fbd8e2084f5288e39ff997117679';

  const testApi = async () => {
    setLoading(true);
    setError('');
    setResult('');
    
    try {
      console.log('Testing with API key:', API_KEY);
      
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [{ role: 'user', content: 'Say hello' }],
          stream: false
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`API error: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (err) {
      console.error('API Test Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">API Connection Test</h2>
      <button 
        onClick={testApi}
        disabled={loading}
        className="px-4 py-2 bg-medical-blue text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        {loading ? 'Testing...' : 'Test DeepSeek API'}
      </button>
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-lg">
          <p className="font-bold">Error:</p>
          <p>{error}</p>
        </div>
      )}
      
      {result && (
        <div className="mt-4">
          <p className="font-bold">Success! API Response:</p>
          <pre className="mt-2 p-3 bg-gray-100 rounded-lg overflow-auto text-xs">
            {result}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ApiTest;