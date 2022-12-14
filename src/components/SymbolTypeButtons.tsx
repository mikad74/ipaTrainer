import React from "react";

type Props = {
  nextPage: (vowel: boolean) => void;
};

function SymbolTypeButtons({ nextPage }: Props) {
  return (
    <div className="answer-buttons">
      <button
        className="btn"
        onClick={() => {
          console.log("clicked vowel");
          nextPage(true);
        }}
      >
        Vowel
      </button>
      <button
        className="btn"
        onClick={() => {
          nextPage(false);
        }}
      >
        Consonant
      </button>
    </div>
  );
}

export default SymbolTypeButtons;
