import { useEffect, useState } from "react";

function App() {
  const [inputWords, setInputWords] = useState("");
  const [failWords, setFailWords] = useState([]);
  const [inputGuessLetters, setInputGuessLetters] = useState("");

  const [guessLetters, setGuessLetters] = useState([]);

  const [words, setWords] = useState("");
  const [countFail, setCountFail] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [startWord, setStartWords] = useState(true);
  const [start, setStart] = useState(false);

  //Dodac upper albo lowe dla kazdej litery
  //Dodac blokade dla spacji oraz wymyslec sposob aby odrazu pokazywal spacje

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setWords(inputWords);
      setInputWords("");
      setStart(true);
      setStartWords(false);
    }
  };
  const toInputUppercase = (e) => {
    e.target.value = ("" + e.target.value).toUpperCase();
  };

  const handleGuessKeyPress = (e) => {
    if (e.key === "Enter") {
      setGuessLetters([...guessLetters, inputGuessLetters]);
      setInputGuessLetters("");
    }
  };

  const handleGuessLetterChange = (e) => {
    const value = e.target.value.toUpperCase();
    setInputGuessLetters(value);
    if (words.includes(value) && !guessLetters.includes(value)) {
      setGuessLetters([...guessLetters, value]);
      if (words.length === guessLetters.length) {
        setWin(true);
      }
    } else {
      setFailWords([...failWords, value]);
      setCountFail(countFail + 1);
      if (countFail === 6) {
        setGameOver(true);
      }
    }
  };

  const createWordElement = () => {
    const modifiedWords = words.replace("  ");
    const wordsArray = modifiedWords.split("");

    console.log(guessLetters, words);

    return wordsArray.map((word, index) => {
      return (
        <span
          key={index}
          style={{
            borderBottom: ".2em solid black",
            margin: "5px",
          }}
        >
          <span
            style={{
              visibility: guessLetters.includes(word) ? "visible" : "hidden",
            }}
          >
            {word}
          </span>
        </span>
      );
    });
  };

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {startWord == true && (
          <input
            placeholder="words"
            type="text"
            value={inputWords}
            onInput={toInputUppercase}
            onKeyDown={handleKeyPress}
            onChange={(e) => setInputWords(e.target.value)}
          />
        )}
      </div>
      {start == true && (
        <div>
          <input
            disabled={gameOver}
            placeholder="Guess Letters"
            type="text"
            value={inputGuessLetters}
            // onInput={toInputUppercase}
            maxLength={1}
            // onKeyDown={handleGuessKeyPress}
            onChange={handleGuessLetterChange}
          />

          <div>
            <h1>Fail: {countFail} / 7</h1>
            {gameOver && <h1>Game Over!</h1>}
            {gameOver && <h1>Correct word is "{words}"</h1>}
            {win && <h1>You Win!</h1>}
          </div>
        </div>
      )}
      <div>{createWordElement()}</div>
    </div>
  );
}

export default App;
