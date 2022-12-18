import React from "react";

function VowelButtons({
  page,
  nextPage,
  choices,
  submitAnswer,
}: {
  page: number;
  nextPage: (vowel: boolean) => void;
  choices: VowelChoices;
  submitAnswer: (choice: string) => void;
}) {
  return (
    <div className="answer-buttons">
      <>
        {page === 1
          ? choices.height.map((choice, idx) => {
              return (
                <button
                  className="choice-btn btn"
                  key={idx}
                  onClick={() => {
                    submitAnswer(choice);
                    nextPage(true);
                    // Update state
                  }}
                >
                  {choice}
                </button>
              );
            })
          : undefined}
      </>
      <>
        {page === 2
          ? choices.place.map((choice, idx) => {
              return (
                <button
                  className="choice-btn btn"
                  key={idx}
                  onClick={() => {
                    submitAnswer(choice);
                    nextPage(true);
                    // Update state
                  }}
                >
                  {choice}
                </button>
              );
            })
          : undefined}
      </>
      <>
        {page === 3
          ? choices.roundedness.map((choice, idx) => {
              return (
                <button
                  className="choice-btn btn"
                  key={idx}
                  onClick={() => {
                    submitAnswer(choice);
                    nextPage(true);
                    // Update state
                  }}
                >
                  {choice}
                </button>
              );
            })
          : undefined}
      </>
    </div>
  );
}

export default VowelButtons;
