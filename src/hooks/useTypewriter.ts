import { useState, useEffect, useCallback } from 'react';

interface UseTypewriterOptions {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  delayBetweenWords?: number;
  loop?: boolean;
}

export const useTypewriter = (options: UseTypewriterOptions) => {
  const {
    words,
    typeSpeed = 100,
    deleteSpeed = 50,
    delayBetweenWords = 2000,
    loop = true
  } = options;

  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  const type = useCallback(() => {
    const currentWord = words[wordIndex];
    
    if (isWaiting) return;

    if (!isDeleting) {
      // Typing
      if (text.length < currentWord.length) {
        setText(currentWord.substring(0, text.length + 1));
      } else {
        // Word complete, wait then start deleting
        setIsWaiting(true);
        setTimeout(() => {
          setIsWaiting(false);
          setIsDeleting(true);
        }, delayBetweenWords);
      }
    } else {
      // Deleting
      if (text.length > 0) {
        setText(currentWord.substring(0, text.length - 1));
      } else {
        // Word deleted, move to next word
        setIsDeleting(false);
        if (loop || wordIndex < words.length - 1) {
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }
  }, [text, wordIndex, isDeleting, isWaiting, words, delayBetweenWords, loop]);

  useEffect(() => {
    const speed = isDeleting ? deleteSpeed : typeSpeed;
    const timer = setTimeout(type, speed);
    return () => clearTimeout(timer);
  }, [type, isDeleting, typeSpeed, deleteSpeed]);

  return { text, isTyping: !isDeleting && text.length < words[wordIndex]?.length };
};
