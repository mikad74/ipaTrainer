function generateChoices(symbols: Array<IpaEntry>) {
  const choices: Choices = {
    vowels: {
      height: [],
      place: [],
      roundedness: [],
    },
    consonants: {
      manner: [],
      place: [],
      voicing: [],
    },
  };
  symbols.forEach((symbol) => {
    if (symbol.type === "vowel") {
      if (
        !choices.vowels.height.includes(symbol.articulation.firstDimension)
      ) {
        if(symbol.articulation.firstDimension !== "vowel") choices.vowels.height.push(symbol.articulation.firstDimension);
      } else if (
        !choices.vowels.place.includes(symbol.articulation.secondDimension)
      ) {
        choices.vowels.place.push(symbol.articulation.secondDimension);
      } else if (
        !choices.vowels.roundedness.includes(symbol.articulation.thirdDimension)
      ) {
        choices.vowels.roundedness.push(symbol.articulation.thirdDimension);
      }
    } else if (symbol.type === "consonant") {
      if (
        !choices.consonants.voicing.includes(symbol.articulation.firstDimension)
      ) {
        if(symbol.articulation.firstDimension) choices.consonants.voicing.push(symbol.articulation.firstDimension);
      } else if (
        !choices.consonants.place.includes(symbol.articulation.secondDimension)
      ) {
        choices.consonants.place.push(symbol.articulation.secondDimension);
      } else if (
        !choices.consonants.manner.includes(symbol.articulation.thirdDimension)
      ) {
        choices.consonants.manner.push(symbol.articulation.thirdDimension);
      }
    }
  });
  return choices;
}

export default generateChoices;
