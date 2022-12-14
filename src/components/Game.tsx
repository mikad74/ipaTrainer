import React, { useEffect, useState } from "react";
import getIpaSymbols from "../utils/getIpaSymbols";
import "./Game.css";

type Articulation = {
  firstDimension: string,
  secondDimension: string,
  thirdDimension: string,
}

type ipaEntry = {
  id: number;
  symbol: string;
  type: string;
  articulation: Articulation;
};

function setupGame() {
  const symbols: Array<ipaEntry> = getIpaSymbols();
  const nextSymbol = () => {
    const randomIndex: number = Math.floor(Math.random() * symbols.length);
    return symbols[randomIndex];
  };
  return { nextSymbol };
}

function showAnswer(ipaSymbol: ipaEntry) {
  return `${ipaSymbol.articulation.firstDimension} ${ipaSymbol.articulation.secondDimension} ${ipaSymbol.articulation.thirdDimension} ${ipaSymbol.type === "vowel"? "vowel": ""}`;
}

function Game() {
  const ipaGame = setupGame();
  const [ipaSymbol, setIpaSymbol] = useState(ipaGame.nextSymbol());
  return (
    <div className="game-container">
      <div className="prompt-container">
        <div className="ipa-prompt ipa">{ipaSymbol.symbol}</div>
      </div>
      <div className="answer-container">
        <div className="answer-prompt">{showAnswer(ipaSymbol)}</div>
      </div>
      <div className="button-container">
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
