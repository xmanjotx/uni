# UniCure - AI Medical Assistant

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue" alt="Version 1.0.0">
  <img src="https://img.shields.io/badge/license-MIT-green" alt="License MIT">
  <img src="https://img.shields.io/badge/react-18.2.0-61DAFB" alt="React 18.2.0">
  <img src="https://img.shields.io/badge/vite-5.0.0-646CFF" alt="Vite 5.0.0">
  <img src="https://img.shields.io/badge/tailwindcss-3.3.5-38B2AC" alt="TailwindCSS 3.3.5">
</p>

<p align="center">
  <img src="docs/unicure-logo.png" alt="UniCure Logo" width="200">
</p>

## 🩺 Overview

UniCure is a modern, interactive AI-powered medical assistant designed to provide general health information and guidance. With a sleek, futuristic interface and powerful AI capabilities, UniCure makes accessing health information intuitive and engaging.

**Important Disclaimer**: UniCure is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.

## ✨ Features

- **AI-Powered Medical Assistant**: Leverages DeepSeek Chat API for intelligent, context-aware responses
- **Interactive Chat Interface**: Sleek, modern UI with real-time streaming responses
- **Point-Based Responses**: Information is presented in easy-to-read bullet points
- **File Attachments**: Upload images or take photos directly within the chat
- **Quick Suggestions**: Common health queries available with a single click
- **Interactive Feedback**: Provide thumbs up/down feedback on AI responses
- **Copy Functionality**: Easily copy responses to clipboard
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Smooth Animations**: Polished transitions and effects for a premium feel

## 🚀 Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/unicure.git
   cd unicure
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env` file in the root directory and add your DeepSeek API key:
   ```
   VITE_DEEPSEEK_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## 🔧 Configuration

### Environment Variables

- `VITE_DEEPSEEK_API_KEY`: Your DeepSeek API key

### API Configuration

The application is configured to use the DeepSeek Chat API. You can modify the API settings in `src/App.jsx`:

```javascript
const API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;

// API endpoint
const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
  // ...
});
```

## 🧩 Project Structure

```
unicure/
├── public/              # Static assets
├── src/                 # Source code
│   ├── components/      # React components
│   │   ├── ChatInterface.jsx       # Main chat interface
│   │   ├── MessageBubble.jsx       # Individual message component
│   │   ├── QuickSuggestions.jsx    # Quick suggestion buttons
│   │   ├── TypingIndicator.jsx     # Loading indicator
│   │   └── Disclaimer.jsx          # Medical disclaimer
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles
├── .env                 # Environment variables (create this)
├── index.html           # HTML entry point
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind CSS configuration
└── vite.config.js       # Vite configuration
```

## 🎨 UI/UX Features

### Sleek Design

UniCure features a modern, glossy blue interface inspired by cutting-edge medical applications:

- **Gradient Headers**: Smooth blue gradients for a premium feel
- **Card-Based Layout**: Clean, organized information presentation
- **Rounded Corners**: Soft UI elements for a friendly appearance
- **Subtle Shadows**: Depth and dimension without overwhelming the interface

### Animations

The application includes several animations for a polished user experience:

- **Fade-in Effects**: Elements gracefully appear on the screen
- **Slide-up Animations**: Messages animate into view
- **Hover Effects**: Interactive elements respond to user interaction
- **Typing Indicator**: Animated dots show when the AI is responding

### Interactive Elements

- **Feedback Buttons**: Thumbs up/down on AI responses
- **Copy Button**: One-click copying of responses
- **Attachment Options**: File upload and camera capture
- **Quick Suggestions**: Animated suggestion buttons

## 🔄 How It Works

1. **User Input**: Users can type questions, select quick suggestions, or attach images
2. **API Processing**: The input is sent to the DeepSeek Chat API
3. **Streaming Response**: The AI response streams in real-time with a typing indicator
4. **Formatting**: Responses are automatically formatted into bullet points for readability
5. **Interaction**: Users can provide feedback or copy responses

## 📱 Mobile Responsiveness

UniCure is fully responsive and works on devices of all sizes:

- **Flexible Layout**: Adapts to different screen sizes
- **Touch-Friendly**: Large tap targets for mobile users
- **Native Camera Integration**: Use device camera for photo capture
- **Compact UI**: Optimized space usage on small screens

## 🛠️ Technologies Used

- **React**: Frontend library for building the user interface
- **Vite**: Build tool and development server
- **TailwindCSS**: Utility-first CSS framework for styling
- **Lucide React**: Icon library
- **DeepSeek Chat API**: AI language model for generating responses

## 🔒 Security Considerations

- API keys are stored in environment variables, not in the codebase
- User data is not stored persistently
- No sensitive medical data is collected

## 🔮 Future Enhancements

- **Dark Mode**: Toggle between light and dark themes
- **Voice Input**: Speak questions instead of typing
- **Symptom Checker**: Interactive tool for preliminary symptom assessment
- **Medication Reminders**: Set and receive medication reminders
- **Health Tracking**: Monitor basic health metrics over time
- **Multi-language Support**: Expand to additional languages

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ⚠️ Medical Disclaimer

UniCure is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.

---

<p align="center">Made with ❤️ for better health information access</p>