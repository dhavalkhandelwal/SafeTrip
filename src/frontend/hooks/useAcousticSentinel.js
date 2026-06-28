import { useState, useEffect, useRef } from 'react';

export function useAcousticSentinel(enabled, onTrigger) {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);
  
  const recognitionRef = useRef(null);
  const enabledRef = useRef(enabled);
  const triggerRef = useRef(onTrigger);

  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  useEffect(() => {
    triggerRef.current = onTrigger;
  }, [onTrigger]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError('Acoustic Sentinel is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    
    let isManuallyStopped = false;
    let hasTriggered = false;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
      hasTriggered = false;
    };

    recognition.onresult = (event) => {
      if (hasTriggered) return;
      
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript.toLowerCase();
      
      const triggerWords = ['help', 'bachao', 'emergency', 'save me'];
      if (triggerWords.some(word => transcript.includes(word))) {
        console.log('🚨 Acoustic Sentinel detected distress word:', transcript);
        hasTriggered = true;
        isManuallyStopped = true;
        recognition.stop();
        if (triggerRef.current) triggerRef.current();
      }
    };

    recognition.onerror = (event) => {
      if (event.error !== 'no-speech' && event.error !== 'aborted') {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setError('Microphone access denied. Please allow microphone access.');
          isManuallyStopped = true;
        }
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      if (enabledRef.current && !isManuallyStopped) {
        try {
          recognition.start();
        } catch (e) {
          // ignore
        }
      }
    };

    recognitionRef.current = recognition;

    if (enabledRef.current) {
      try { recognition.start(); } catch (e) {}
    }

    return () => {
      isManuallyStopped = true;
      recognition.stop();
    };
  }, []); // Run once on mount

  // Watch for enabled changes
  useEffect(() => {
    if (enabled && recognitionRef.current && !isListening && !error) {
      try {
        recognitionRef.current.start();
      } catch (e) {}
    } else if (!enabled && isListening && recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }, [enabled, isListening, error]);

  return { isListening, error };
}
