import {useCallback, useEffect, useState} from "react";
import words from './wordList.json';
import {HangmanDrawing} from "./HangmanDrawing";
import {HangmanWord} from "./HangmanWord";
import {Keyboard} from "./Keyboard";

function getWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function App() {
  const [wordToGuess, setWordToGuess] = useState(getWord());

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const incorrectLetters = guessedLetters.filter((letter) => !wordToGuess.includes(letter));

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess.split('').every((letter) => guessedLetters.includes(letter));

  const addGuessedLetter = useCallback((letter: string) => {
    if (guessedLetters.includes(letter) || isLoser || isWinner) {
      return;
    }
  
    setGuessedLetters(currentLetters => [...currentLetters, letter]);
  }, [guessedLetters, isWinner, isLoser]);

  useEffect(() => {
    const handler = (evt: KeyboardEvent) => {
      const key = evt.key;
        
      if (!key.match(/^[а-я]$/)) {
        return;
      }

      evt.preventDefault();
      addGuessedLetter(key);
    };

    window.addEventListener('keypress', handler);

    return () => {
      window.removeEventListener('keypress', handler);
    };
  }, [guessedLetters]);

  useEffect(() => {
    const handler = (evt: KeyboardEvent) => {
      const key = evt.key;
        
      if (key !== 'Enter') {
        return;
      }

      evt.preventDefault();
      setGuessedLetters([]);
      setWordToGuess(getWord());
    };

    window.addEventListener('keypress', handler);

    return () => {
      window.removeEventListener('keypress', handler);
    };
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '2rem',
      margin: '0 auto',
      maxWidth: '800px',
    }}>
      <div style={{
        fontFamily: 'sans-serif',
        fontSize: '2rem',
        textAlign: 'center',
      }}>
        {(!isWinner && !isLoser) && 'Нажимайте клавиши...'}
        {isWinner && 'Победа! Нажмите Enter для новой игры.'}
        {isLoser && 'Бывает... Нажмите Enter для новой игры.'}
      </div>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord reveal={isLoser} guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
      <Keyboard 
        disabled={isWinner || isLoser}
        activeLetters={guessedLetters.filter((letter) => wordToGuess.includes(letter))}
        inactiveLetters={incorrectLetters}
        addGuessedLetter={addGuessedLetter}/>
    </div>
  )
}

export default App;
