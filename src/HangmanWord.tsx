type HangmanWordProps = {
  guessedLetters: string[];
  wordToGuess: string;
  reveal?: boolean;
};

export function HangmanWord({guessedLetters, wordToGuess, reveal = false}: HangmanWordProps) {
  return (
    <div style={{
      display: 'flex',
      gap: '2rem',
      fontFamily: 'monospace',
      fontSize: '6rem',
      fontWeight: 'bold',
      textTransform: 'uppercase',
    }}>
      {wordToGuess.split('').map((letter, index) => (
        <span key={index} style={{
          borderBottom: '0.1em solid black'
        }}>
          <span style={{
            visibility: 
              guessedLetters.includes(letter) || reveal 
              ? 'visible' 
              : 'hidden',
            color: !guessedLetters.includes(letter) && reveal ? 'red' : 'black',
          }}>{letter}</span>
        </span>
      ))}
    </div>
  );
}
