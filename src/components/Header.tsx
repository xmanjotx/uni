import React from 'react';

export default function Header() {
  return (
    <div className="flex items-center mb-6">
      <h1 className="text-2xl font-bold text-blue-600">AI Doctor Assistant</h1>
      <span className="ml-2 text-sm text-gray-500">Your Smart Health Buddy</span>
    </div>
  );
}