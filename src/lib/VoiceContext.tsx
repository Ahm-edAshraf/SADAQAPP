'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface VoiceContextType {
  isListening: boolean;
  voiceEnabled: boolean;
  toggleVoice: () => void;
  startListening: () => void;
  stopListening: () => void;
  speak: (text: string) => void;
  lastCommand: string | null;
}

const VoiceContext = createContext<VoiceContextType>({
  isListening: false,
  voiceEnabled: true,
  toggleVoice: () => {},
  startListening: () => {},
  stopListening: () => {},
  speak: () => {},
  lastCommand: null,
});

export const useVoice = () => useContext(VoiceContext);

export const VoiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [lastCommand, setLastCommand] = useState<string | null>(null);

  useEffect(() => {
    // Check if user has a preference stored
    const storedPreference = localStorage.getItem('voiceEnabled');
    if (storedPreference === 'false') {
      setVoiceEnabled(false);
    }
  }, []);
  
  // This is a simulated voice recognition function
  // In a real implementation, this would use the Web Speech API
  const startListening = () => {
    if (!voiceEnabled) return;
    
    setIsListening(true);
    // In a real implementation, this would start listening for voice commands
    // For the prototype, we're just simulating the behavior
    
    // Simulate finishing listening after 3 seconds
    setTimeout(() => {
      stopListening();
      // Simulate a random command for demonstration
      const demoCommands = [
        "Go to dashboard",
        "Make a donation",
        "Request aid",
        "Go to settings",
      ];
      const randomCommand = demoCommands[Math.floor(Math.random() * demoCommands.length)];
      setLastCommand(randomCommand);
    }, 3000);
  };
  
  const stopListening = () => {
    setIsListening(false);
  };
  
  // Simulated text-to-speech function
  const speak = (text: string) => {
    if (!voiceEnabled) return;
    
    console.log(`Speaking: ${text}`);
    // In a real implementation, this would use the Web Speech API
    // For example:
    // const speech = new SpeechSynthesisUtterance(text);
    // window.speechSynthesis.speak(speech);
  };
  
  const toggleVoice = () => {
    setVoiceEnabled((prev) => {
      const newValue = !prev;
      localStorage.setItem('voiceEnabled', String(newValue));
      return newValue;
    });
  };
  
  return (
    <VoiceContext.Provider
      value={{
        isListening,
        voiceEnabled,
        toggleVoice,
        startListening,
        stopListening,
        speak,
        lastCommand,
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
}; 