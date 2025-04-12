import { useState } from 'react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [selectedTheme, setSelectedTheme] = useState('default');

  const quickPrompts = [
    {
      title: "Clinical Assessment",
      prompts: [
        "• Describe your symptoms in detail",
        "• When did these symptoms begin?",
        "• Rate your pain (1-10)",
        "• Previous medical history"
      ]
    },
    {
      title: "Preventive Care",
      prompts: [
        "• Vaccination schedule",
        "• Health screening recommendations",
        "• Lifestyle modifications",
        "• Nutrition guidance"
      ]
    }
  ];

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 ease-in-out z-50 
      ${isOpen ? 'w-64' : 'w-0'} overflow-hidden`}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-[#1A3B5B]">
            Opticure AI
          </h1>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-600 hover:text-[#1A3B5B]"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* New Consultation Button */}
        <button className="w-full py-3 px-4 mb-6 rounded-lg bg-[#1A3B5B] text-white hover:bg-[#2C4F7A] transition-all duration-200 flex items-center justify-center gap-2 shadow-md">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Consultation
        </button>

        {/* Practice Mode */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Consultation Mode</h3>
          <div className="flex gap-2">
            {['General', 'Pediatric', 'Geriatric'].map((mode) => (
              <button
                key={mode}
                onClick={() => setSelectedTheme(mode)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedTheme === mode
                    ? 'bg-[#1A3B5B] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Prompts */}
        <div className="space-y-6">
          {quickPrompts.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-sm font-medium text-gray-600 mb-2">{section.title}</h3>
              <div className="space-y-2">
                {section.prompts.map((prompt, promptIdx) => (
                  <button
                    key={promptIdx}
                    className="w-full text-left px-4 py-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-sm text-gray-700 hover:text-[#1A3B5B]"
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
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <span className="text-[#1A3B5B]">Professional Medical AI</span>
          <span>•</span>
          <a href="#" className="hover:text-[#1A3B5B] transition-colors">Guidelines</a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;