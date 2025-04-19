import DoctorAI from './components/DoctorAI';
import { ConversationProvider } from './context/ConversationContext';

function App() {
  return (
    <ConversationProvider>
      <DoctorAI />
    </ConversationProvider>
  );
}

export default App;
