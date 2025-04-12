import { useState } from 'react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [selectedTheme, setSelectedTheme] = useState('default');

  const quickPrompts = [
    {
      title: "Common Symptoms",
      prompts: [
        "I have a persistent headache",
        "Experiencing chest pain",
        "Dealing with anxiety",
        "Can't sleep well"
      ]
    },
    {
      title: "Health & Wellness",
      prompts: [
        "Diet recommendations",
        "Exercise routine",
        "Stress management",
        "Better sleep habits"
      ]
    }
  ];

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-[#1A1A1A] text-white transition-all duration-300 ease-in-out z-50 
      ${isOpen ? 'w-64' : 'w-0'} overflow-hidden`}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
            UniCure AI
          </h1>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* New Chat Button */}
        <button className="w-full py-3 px-4 mb-6 rounded-lg bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 transition-all duration-200 flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Chat
        </button>

        {/* Theme Selector */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Theme</h3>
          <div className="flex gap-2">
            {['default', 'calm', 'focus'].map((theme) => (
              <button
                key={theme}
                onClick={() => setSelectedTheme(theme)}
                className={`w-8 h-8 rounded-full ${
                  selectedTheme === theme ? 'ring-2 ring-blue-500' : ''
                } ${
                  theme === 'default' ? 'bg-gradient-to-r from-blue-400 to-teal-400' :
                  theme === 'calm' ? 'bg-gradient-to-r from-purple-400 to-pink-400' :
                  'bg-gradient-to-r from-green-400 to-emerald-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Quick Prompts */}
        <div className="space-y-6">
          {quickPrompts.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-sm font-medium text-gray-400 mb-2">{section.title}</h3>
              <div className="space-y-2">
                {section.prompts.map((prompt, promptIdx) => (
                  <button
                    key={promptIdx}
                    className="w-full text-left px-4 py-2 rounded-lg bg-[#2A2A2A] hover:bg-[#3A3A3A] transition-colors text-sm"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#1A1A1A] border-t border-gray-800">
        <div className="flex items-center gap-3 text-sm text-gray-400">
          <span>Made with 💙</span>
          <span>•</span>
          <a href="#" className="hover:text-white transition-colors">About</a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;