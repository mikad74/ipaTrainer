import React, { useEffect, useState } from "react";
import generateChoices from "../utils/generateChoices";
import getIpaSymbols from "../utils/getIpaSymbols";
import SymbolTypeButtons from "./SymbolTypeButtons";
import VowelButtons from "./VowelButtons";
import ConsonantButtons from "./ConsonantButtons";
import "./Game.css";

function setupGame() {
  const symbols: Array<ipaEntry> = getIpaSymbols();
  const choices = generateChoices(symbols);
  console.log(choices);
  const nextSymbol = () => {
    const randomIndex: number = Math.floor(Math.random() * symbols.length);
    return symbols[randomIndex];
  };
  return { nextSymbol, choices };
}

function showAnswer(ipaSymbol: ipaEntry) {
  return `${ipaSymbol.articulation.firstDimension} ${
    ipaSymbol.articulation.secondDimension
  } ${ipaSymbol.articulation.thirdDimension} ${
    ipaSymbol.type === "vowel" ? "vowel" : ""
  }`;
}


function Game() {
  const { nextSymbol, choices } = setupGame();
  const [ipaSymbol, setIpaSymbol] = useState(nextSymbol());
  const [answer, setAnswer] = useState("");
  const [page, setPage] = useState(0);
  const [isVowel, setIsVowel] = useState(true);
  const [isCorrect, setIsCorrect] = useState<IsCorrect>("pending")
  const nextPage = (vowel: boolean) => {
    setPage((old) => old + 1);
    setIsVowel(vowel);
  };
  const updateAnswer = (choice: string) => {
    setAnswer((oldAnswer) => {
      return oldAnswer + " " + choice
    })
  }
  useEffect(() => {
    if (page === 4) {
      const answerString = `${ipaSymbol.articulation.firstDimension} ${ipaSymbol.articulation.secondDimension} ${ipaSymbol.articulation.thirdDimension}`
      console.log(answerString, answer)
      if (answerString === answer.trim()) {
        setIsCorrect("correct")
      }
      else {
        setIsCorrect("incorrect")
      }
    }
  }, [page])

  return (
    <div className="game-container">
      <div className="prompt-container">
        <div className="ipa-prompt ipa">{ipaSymbol.symbol}</div>
      </div>
      <div className="answer-container">
        <div className={`answer-prompt ${isCorrect}`}>{answer}</div>
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
            setAnswer("")
            setPage(0)
            setIpaSymbol(nextSymbol());
            setIsCorrect("pending")
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
