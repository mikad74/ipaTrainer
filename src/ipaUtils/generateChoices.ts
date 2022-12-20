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
        !choices.vowels.height.includes(symbol.articulation.firstDimension.toLowerCase())
      ) {
        if(symbol.articulation.firstDimension !== "vowel") choices.vowels.height.push(symbol.articulation.firstDimension.toLowerCase());
      } else if (
        !choices.vowels.place.includes(symbol.articulation.secondDimension.toLowerCase())
      ) {
        choices.vowels.place.push(symbol.articulation.secondDimension.toLowerCase());
      } else if (
        !choices.vowels.roundedness.includes(symbol.articulation.thirdDimension.toLowerCase())
      ) {
        choices.vowels.roundedness.push(symbol.articulation.thirdDimension.toLowerCase());
      }
    } else if (symbol.type === "consonant") {
      if (
        !choices.consonants.voicing.includes(symbol.articulation.firstDimension.toLowerCase())
      ) {
        if(symbol.articulation.firstDimension) choices.consonants.voicing.push(symbol.articulation.firstDimension.toLowerCase());
      } if (
        !choices.consonants.place.includes(symbol.articulation.secondDimension.toLowerCase())
      ) {
        choices.consonants.place.push(symbol.articulation.secondDimension.toLowerCase());
      } if (
        !choices.consonants.manner.includes(symbol.articulation.thirdDimension.toLowerCase())
      ) {
        choices.consonants.manner.push(symbol.articulation.thirdDimension.toLowerCase());
      }
    }
  });
  return choices;
}

export default generateChoices;
