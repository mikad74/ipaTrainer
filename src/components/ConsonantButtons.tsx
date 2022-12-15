import React from "react";

function ConsonantButtons({
  page,
  nextPage,
  choices,
  submitAnswer,
}: {
  page: number;
  nextPage: (vowel: boolean) => void;
  choices: ConsonantChoices;
  submitAnswer: (choice: string) => void;
}) {
  return (
    <div className="consonant-buttons">
      <>
        {page === 1
          ? choices.voicing.map((choice, idx) => {
              return (
                <button
                  className="choice-btn btn"
                  key={idx}
                  onClick={() => {
                    submitAnswer(choice);
                    nextPage(false);
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
                    nextPage(false);
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
          ? choices.manner.map((choice, idx) => {
              return (
                <button
                  className="choice-btn btn"
                  key={idx}
                  onClick={() => {
                    submitAnswer(choice);
                    nextPage(false);
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

export default ConsonantButtons;
