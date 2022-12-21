import React, { useEffect, useState } from "react";
import generateChoices from "../ipaUtils/generateChoices";
import getIpaSymbols from "../ipaUtils/getIpaSymbols";
import SymbolTypeButtons from "./SymbolTypeButtons";
import VowelButtons from "./VowelButtons";
import ConsonantButtons from "./ConsonantButtons";
import playAudio from "./playAudio";
import checkAnswer from "./checkAnswer";
import getPhoneticsPreset from "../data/presets/phonetics";
import "./Game.css";

function setupGame() {
  const [symbols, setSymbols] = useState(getIpaSymbols([123,133,155,154,150,151,152,139,147,142,148,149,141,131,145,140,136,153,137,12,33,14,36,10,18,60,61,91,93,100,94,95,70,80,110,69,88,99,101,82,33,33,91,18,110,18,69,5,6,27,21,13,103,83,104,89,112,90,117,121,105,113,102,109]));
  const [choices, setChoices] = useState(generateChoices(symbols));
  const nextSymbol = () => {
    const randomIndex: number = Math.floor(Math.random() * symbols.length);
    return symbols[randomIndex];
  };
  const setIpaSet = (ipaSet?: Array<number>) => {
    const newSymbols = getIpaSymbols(ipaSet);
    setSymbols(newSymbols);
    const newChoices = generateChoices(newSymbols);
    setChoices(newChoices);
  };
  return { nextSymbol, choices, setIpaSet };
}

function Game() {
  const [inputHistory, setInputHistory] = useState<string[]>([]);
  const { nextSymbol, choices, setIpaSet } = setupGame();
  const [ipaSymbol, setIpaSymbol] = useState(nextSymbol());
  const [answer, setAnswer] = useState("");
  const [page, setPage] = useState(0);
  const [isVowel, setIsVowel] = useState(true);
  const [isCorrect, setIsCorrect] = useState<IsCorrect>("pending");
  const [highScore, setHighScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [undos, setUndos] = useState(0);
  const [undoing, setUndoing] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());

  useEffect(() => {
    setIpaSet(getPhoneticsPreset());
    const highScore = localStorage.getItem("highScore");
    if (highScore) setHighScore(Number(highScore));
  }, []);

  useEffect(() => {
    setStartTime(Date.now());
  }, [ipaSymbol]);

  const nextPage = (vowel: boolean) => {
    setPage((old) => old + 1);
    setIsVowel(vowel);
  };
  const updateAnswer = (choice: string) => {
    setUndoing(false);
    setAnswer((oldAnswer) => {
      setInputHistory((oldInputHistory) => {
        return [...oldInputHistory, choice];
      });
      return oldAnswer + " " + choice;
    });
  };

  const reset = (resetScore = true) => {
    setAnswer("");
    setPage(0);
    setIpaSymbol(nextSymbol());
    setIsCorrect("pending");
    setShowAnswer(false);
    setUndos(0);
    if (resetScore) updateScore(false);
    clearHistory();
  };

  const undo = () => {
    console.log(undoing, undos);
    if (!undoing) {
      setUndos((oldUndos) => oldUndos + 1);
      setUndoing(true);
    }
    if (inputHistory.length > 0) {
      let newAnswer = "";
      inputHistory.forEach((input, idx) => {
        if (!(idx === inputHistory.length - 1))
          newAnswer = newAnswer + " " + input;
      });
      setPage((oldPage) => (oldPage > 0 ? oldPage - 1 : 0));
      setAnswer(newAnswer);
      const newHistory = [...inputHistory.slice(0, -1)];
      setInputHistory(newHistory);
    } else {
      setPage((oldPage) => (oldPage > 0 ? oldPage - 1 : 0));
      setAnswer("");
    }
  };

  const clearHistory = () => {
    setInputHistory([]);
  };
  const getAnswer = (showVowel = true): string => {
    return `${ipaSymbol.articulation.firstDimension} ${
      ipaSymbol.articulation.secondDimension
    } ${ipaSymbol.articulation.thirdDimension} ${
      ipaSymbol.type === "vowel" && showVowel ? "vowel" : ""
    }`;
  };

  const updateScore = (correct: boolean): void => {
    const timeTaken = (Date.now() - startTime) / 1000;
    if (correct) {
      let undoMultiplier: number;
      switch (undos) {
        case 0:
          undoMultiplier = 1.5;
          break;
        case 1:
          undoMultiplier = 1.2;
          break;
        case 2:
          undoMultiplier = 1;
          break;
        default:
          undoMultiplier = 0.75;
      }
      let timeMultiplier: number;
      if (timeTaken <= 5) timeMultiplier = 2;
      else if (timeTaken > 5 && timeTaken <= 10) {
        timeMultiplier = 2 - (timeTaken - 5) * 0.2;
      } else timeMultiplier = 1;
      setCurrentScore((oldScore) => {
        const newScore = Math.floor(
          oldScore +
            100 *
              (1 + Math.floor(streak / 5) / 10) *
              undoMultiplier *
              timeMultiplier
        );
        if (newScore > highScore) {
          localStorage.setItem("highScore", `${newScore}`);
          setHighScore(newScore);
        }
        return newScore;
      });
    } else {
      setCurrentScore(0);
    }
  };

  useEffect(() => {
    if (page === 4) {
      const result = checkAnswer(getAnswer(false), answer.trim());
      if (result) {
        setIsCorrect("correct");
        updateScore(true);
      } else {
        setIsCorrect("incorrect");
      }
    } else setIsCorrect("pending");
  }, [page]);

  return (
    <div className="game-container">
      <div className="prompt-container">
        <div className="score-container">
          <div className="high-score">
            High Score: <br /> {highScore}{" "}
          </div>
          <div className="current-score">
            Current Score:
            <br /> {currentScore}
          </div>
        </div>
        <div className="ipa-prompt ipa" onClick={() => playAudio(ipaSymbol)}>
          {ipaSymbol.symbol}
        </div>
          <div className="source-container">
          <a href={`https://en.wikipedia.org${ipaSymbol.audioLink}`}rel="noreferrer noopener" target="_blank" className="audio-source">Audio Source</a>
        </div>
      </div>

      <div className="preset-container">
        <button onClick={() => reset()} className="preset-btn btn">
          UvA Phonetics
        </button>
        <button onClick={() => reset()} className="preset-btn btn">
          All IPA Symbols
        </button>
      </div>

      <div className="answer-container">
        {page === 4 && showAnswer ? (
          <div className="correct-answer-prompt">{getAnswer()}</div>
        ) : undefined}
        {!showAnswer && page === 4 ? (
          <button
            className="show-answer-btn btn"
            onClick={() => {
              setShowAnswer(true);
              if (!checkAnswer(getAnswer(false), answer.trim())) {
                updateScore(false);
              }
            }}
          >
            Show Answer
          </button>
        ) : undefined}
        <a href="https://en.wikipedia.org/wiki/IPA_pulmonic_consonant_chart_with_audio" rel="noreferrer noopener" target="_blank" className="sibilant">Help! What is a sibilant</a>
        <div className="answer-input-container">
          <div className={`answer-prompt ${isCorrect}`}>{answer}</div>
          <button className="undo-button btn" onClick={() => undo()}>
            undo
          </button>
        </div>
      </div>

      <div className="button-container">
        {page === 0 && <SymbolTypeButtons nextPage={nextPage} />}
        {page > 0 && isVowel === true && (
          <VowelButtons
            choices={choices.vowels}
            page={page}
            nextPage={nextPage}
            submitAnswer={updateAnswer}
          />
        )}
        {page > 0 && isVowel === false && (
          <ConsonantButtons
            choices={choices.consonants}
            page={page}
            nextPage={nextPage}
            submitAnswer={updateAnswer}
          />
        )}

        <button
          onClick={() => {
            if (checkAnswer(getAnswer(false), answer.trim())) {
              reset(false);
              setStreak((oldStreak) => oldStreak + 1);
            } else {
              reset();
            }
          }}
          className={`next-symbol-btn btn ${
            checkAnswer(getAnswer(false), answer.trim()) ? "" : "red"
          }`}
        >
          next symbol
        </button>
      </div>
    </div>
  );
}

export default Game;
