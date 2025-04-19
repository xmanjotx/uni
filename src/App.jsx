import DoctorAI from './components/DoctorAI';
import { ConversationProvider } from './context/ConversationContext';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <ConversationProvider>
        <DoctorAI />
      </ConversationProvider>
    </div>
  );
}

export default App;
