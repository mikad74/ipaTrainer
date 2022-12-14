import React, { useEffect, useState } from "react";
import getIpaSymbols from "../utils/getIpaSymbols";
import SymbolTypeButtons from "./SymbolTypeButtons";
import VowelButtons from "./VowelButtons";
import ConsonantButtons from "./ConsonantButtons";
import "./Game.css";

type Articulation = {
  firstDimension: string;
  secondDimension: string;
  thirdDimension: string;
};

type ipaEntry = {
  id: number;
  symbol: string;
  type: string;
  articulation: Articulation;
};

type UpdateStage = (vowel: boolean) => void;

function setupGame() {
  const symbols: Array<ipaEntry> = getIpaSymbols();
  const nextSymbol = () => {
    const randomIndex: number = Math.floor(Math.random() * symbols.length);
    return symbols[randomIndex];
  };
  return { nextSymbol };
}

function showAnswer(ipaSymbol: ipaEntry) {
  return `${ipaSymbol.articulation.firstDimension} ${
    ipaSymbol.articulation.secondDimension
  } ${ipaSymbol.articulation.thirdDimension} ${
    ipaSymbol.type === "vowel" ? "vowel" : ""
  }`;
}

function Game() {
  const ipaGame = setupGame();
  const [ipaSymbol, setIpaSymbol] = useState(ipaGame.nextSymbol());
  const [answer, setAnswer] = useState("");
  const [page, setPage] = useState(0);
  const [isVowel, setIsVowel] = useState(true);
  const [stage, setStage] = useState<{ page: number; vowel: boolean }>({
    page: 0,
    vowel: true,
  });
  const nextPage = (vowel: boolean) => {
    setPage((old) => old + 1);
    setIsVowel(vowel);
  };

  return (
    <div className="game-container">
      <div className="prompt-container">
        <div className="ipa-prompt ipa">{ipaSymbol.symbol}</div>
      </div>
      <div className="answer-container">
        <div className="answer-prompt">{answer}</div>
      </div>
      <div className="button-container">
        {page === 0 && <SymbolTypeButtons nextPage={nextPage} />}
        {page > 0 && isVowel === true && <VowelButtons page={page} />}
        {page > 0 && isVowel === false && (
          <ConsonantButtons page={page} />
        )}

        <button
          onClick={() => {
            setIpaSymbol(ipaGame.nextSymbol());
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
