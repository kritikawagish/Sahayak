import { useRef, useState, useCallback } from 'react';

const LANG_MAP = {
  hi: 'hi-IN',
  bho: 'hi-IN', // Bhojpuri — no dedicated browser locale; simulated via Hindi ASR/TTS voice
  en: 'en-IN',
};

export default function useSpeech(language = 'hi') {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [interim, setInterim] = useState('');
  const recognitionRef = useRef(null);

  const supported =
    typeof window !== 'undefined' &&
    ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);

  const listen = useCallback(() => {
    return new Promise((resolve) => {
      if (!supported) {
        resolve(null);
        return;
      }
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SR();
      recognition.lang = LANG_MAP[language] || 'hi-IN';
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;
      recognitionRef.current = recognition;

      let finalTranscript = '';

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event) => {
        let interimText = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const t = event.results[i][0].transcript;
          if (event.results[i].isFinal) finalTranscript += t;
          else interimText += t;
        }
        setInterim(interimText);
      };
      recognition.onerror = () => {
        setIsListening(false);
        resolve(finalTranscript || null);
      };
      recognition.onend = () => {
        setIsListening(false);
        setInterim('');
        resolve(finalTranscript || null);
      };

      try {
        recognition.start();
      } catch {
        resolve(null);
      }
    });
  }, [language, supported]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
  }, []);

  const speak = useCallback(
    (text) => {
      return new Promise((resolve) => {
        if (!('speechSynthesis' in window) || !text) {
          resolve();
          return;
        }
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = LANG_MAP[language] || 'hi-IN';
        utter.rate = 0.95;
        utter.onstart = () => setIsSpeaking(true);
        utter.onend = () => {
          setIsSpeaking(false);
          resolve();
        };
        utter.onerror = () => {
          setIsSpeaking(false);
          resolve();
        };
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utter);
      });
    },
    [language]
  );

  return { listen, stopListening, speak, isListening, isSpeaking, interim, supported };
}
