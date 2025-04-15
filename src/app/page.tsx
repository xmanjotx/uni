import Image from "next/image";
import DoctorChat from './DoctorChat';

export default function Home() {
  return (
    <main className="main-home">
      <h1 className="title">AI Doctor Assistant</h1>
      <DoctorChat />
    </main>
  );
}
