'use client';

import { useState } from 'react';

interface FileUploadProps {
  onFileUpload: (content: string) => void;
}

export default function FileUpload({ onFileUpload }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const processFile = async (file: File) => {
    setIsProcessing(true);
    try {
      if (file.type === 'application/pdf') {
        // For PDF files, we'll just extract the name for now
        // TODO: Implement PDF text extraction
        return `Analyzing PDF: ${file.name}`;
      } else if (file.type.startsWith('image/')) {
        // For images, we'll use the file name
        // TODO: Implement image analysis
        return `Analyzing Image: ${file.name}`;
      } else {
        const text = await file.text();
        return text;
      }
    } catch (error) {
      console.error('Error processing file:', error);
      throw new Error('Failed to process file');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length === 0) return;

    try {
      const content = await processFile(files[0]);
      onFileUpload(content);
    } catch (error) {
      console.error('Error handling file:', error);
      // TODO: Implement proper error handling UI
    }
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      const content = await processFile(files[0]);
      onFileUpload(content);
    } catch (error) {
      console.error('Error handling file:', error);
      // TODO: Implement proper error handling UI
    }
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        onChange={handleFileInput}
        accept=".pdf,.txt,image/*"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div className="text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {isProcessing ? 'Processing...' : 'Drop files here or click to upload'}
        </p>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
          PDF, TXT, or Image files
        </p>
      </div>
    </div>
  );
}