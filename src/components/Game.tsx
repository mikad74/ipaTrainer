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
  const [symbols, setSymbols] = useState(getIpaSymbols(getPhoneticsPreset()));
  const [choices, setChoices] = useState(generateChoices(symbols));
  const nextSymbol = () => {
    const randomIndex: number = Math.floor(Math.random() * symbols.length);
    return symbols[randomIndex];
  };
  const setIpaSet = (ipaSet?: Array<number>) => {
    const newSymbols = getIpaSymbols(ipaSet)
    setSymbols(newSymbols);
    const newChoices = generateChoices(newSymbols)
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
  const nextPage = (vowel: boolean) => {
    setPage((old) => old + 1);
    setIsVowel(vowel);
  };
  const updateAnswer = (choice: string) => {
    setAnswer((oldAnswer) => {
      setInputHistory((oldInputHistory) => {
        oldInputHistory.push(choice);
        return oldInputHistory;
      });
      return oldAnswer + " " + choice;
    });
  };

  const undo = () => {
    console.log(inputHistory);
    inputHistory.pop();
    if (inputHistory.length > 0) {
      let newAnswer = "";
      inputHistory.forEach((input) => {
        newAnswer = newAnswer + " " + input;
      });
      setPage((oldPage) => (oldPage > 0 ? oldPage - 1 : 0));
      setAnswer(newAnswer);
    } else {
      setPage(0);
      setAnswer("");
    }
  };

  const clearHistory = () => {
    while (inputHistory.length > 0) {
      inputHistory.pop();
    }
  };
  const showAnswer = (): string => {
    return `${ipaSymbol.articulation.firstDimension} ${
      ipaSymbol.articulation.secondDimension
    } ${ipaSymbol.articulation.thirdDimension} ${
      ipaSymbol.type === "vowel" ? "vowel" : ""
    }`;
  };
  useEffect(() => {
    if (page === 4) {
      const answerString = `${ipaSymbol.articulation.firstDimension} ${ipaSymbol.articulation.secondDimension} ${ipaSymbol.articulation.thirdDimension}`;
      const result = checkAnswer(answerString, answer.trim());
      if (result) {
        setIsCorrect("correct");
      } else {
        setIsCorrect("incorrect");
      }
    } else setIsCorrect("pending");
  }, [page]);

  return (
    <div className="game-container">
      <div className="prompt-container">
        <div className="ipa-prompt ipa" onClick={() => playAudio(ipaSymbol)}>
          {ipaSymbol.symbol}
        </div>
      </div>
      <div className="preset-container">
        <button
          onClick={() => {
            setAnswer("");
            setPage(0);
            setIpaSet(getPhoneticsPreset());
            setIsCorrect("pending");
            setIpaSymbol(nextSymbol());
          }}
          className="preset-btn btn"
        >
          UvA Phonetics
        </button>
        <button
          onClick={() => {
            setAnswer("");
            setPage(0);
            setIpaSet();
            setIsCorrect("pending");
            setIpaSymbol(nextSymbol());
          }}
          className="preset-btn btn"
        >
          All IPA Symbols
        </button>
      </div>
      <div className="answer-container">
        {page === 4 ? (
          <div className="correct-answer-prompt">{showAnswer()}</div>
        ) : undefined}
        <div className="answer-input-container">
          <div className={`answer-prompt ${isCorrect}`}>{answer}</div>
          <button className="undo-button btn" onClick={undo}>
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
            setAnswer("");
            setPage(0);
            setIpaSymbol(nextSymbol());
            setIsCorrect("pending");
            clearHistory();
          }}
          className="next-symbol-btn btn"
        >
          next symbol
        </button>
      </div>
    </div>
  );
}

export default Game;
