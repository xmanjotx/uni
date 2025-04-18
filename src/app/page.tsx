import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-blue-50 p-4 sm:p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">AI Doctor Assistant</h1>
        
        <div className="border rounded-lg p-4 mb-6 h-96 overflow-y-auto bg-gray-50">
          {/* Chat messages will go here */}
        </div>
        
        <div className="flex gap-4">
          <input 
            type="text" 
            placeholder="Ask a medical question..."
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            Send
          </button>
        </div>
        
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Medical Reports</label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" accept="application/pdf,image/*" multiple />
            </label>
          </div>
        </div>
      </main>
    </div>
  );
}
