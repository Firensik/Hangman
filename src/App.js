import { useEffect, useState } from "react";

function App() {
  const [inputWords, setInputWords] = useState("");
  const [failWords, setFailWords] = useState([]);
  const [inputGuessLetters, setInputGuessLetters] = useState("");

  const [guessLetters, setGuessLetters] = useState([]);

  const [words, setWords] = useState("");
  const [countWords, setCountWords] = useState(0);
  const [countFail, setCountFail] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  //Dodac upper albo lowe dla kazdej litery
  //Dodac blokade dla spacji oraz wymyslec sposob aby odrazu pokazywal spacje

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setWords(inputWords);
      setInputWords("");
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
    const modifiedWords = words.replace(/ /g, "  ");
    const wordsArray = modifiedWords.split("");

    console.log(guessLetters);

    return wordsArray.map((word, index) => {
      return (
        <span
          key={index}
          style={{
            borderBottom: ".1em solid black",
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
        <input
          placeholder="words"
          type="text"
          value={inputWords}
          onInput={toInputUppercase}
          onKeyDown={handleKeyPress}
          onChange={(e) => setInputWords(e.target.value)}
        />
      </div>
      <div>
        <input
          disabled={countFail === 7}
          placeholder="Guess Letters"
          type="text"
          value={inputGuessLetters}
          onInput={toInputUppercase}
          onKeyDown={handleGuessKeyPress}
          onChange={handleGuessLetterChange}
        />
      </div>
      <div>{createWordElement()}</div>
      <div>
        <h1>Fail: {countFail} / 7</h1>
        {gameOver && <h1>Game Over!</h1>}
        {win && <h1>You Win!</h1>}
      </div>
    </div>
  );
}

export default App;
