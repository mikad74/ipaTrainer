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

type Choices = {
  vowels: VowelChoices;
  consonants: ConsonantChoices;
};

type VowelChoices = {
  height: Array<string>;
  place: Array<string>;
  roundedness: Array<string>;
};
type ConsonantChoices = {
  manner: Array<string>;
  place: Array<string>;
  voicing: Array<string>;
};

type IsCorrect = 'correct' | 'pending' | 'incorrect'
