import IPA from "../data/IPA.json";

type Articulation = {
  firstDimension: string ;
  secondDimension: string ;
  thirdDimension: string ;
};

function getIpaSymbols() {
  const symbols: Array<{
    id: number;
    symbol: string;
    type: string;
    articulation: Articulation;
  }> = [];
  IPA.forEach((symbol) => {
    const articulation: Articulation = {
      firstDimension: "",
      secondDimension: "",
      thirdDimension: "",
    };
    if (symbol.type === "vowel") {
      articulation.firstDimension = symbol.articulation.roundedness ? symbol.articulation.roundedness : "" ;
      articulation.secondDimension = symbol.articulation.height ? symbol.articulation.height: "";
      articulation.thirdDimension = symbol.articulation.place ? symbol.articulation.place: "";
    } else if (symbol.type === "consonant") {
      articulation.firstDimension = symbol.articulation.voicing? symbol.articulation.voicing: "";
      articulation.secondDimension = symbol.articulation.place?symbol.articulation.place:"";
      articulation.thirdDimension = symbol.articulation.manner?symbol.articulation.manner:"";
    }

    // const keys = Object.keys(symbol.articulation)
    // console.log(keys)
    // const articulation: Articulation = {
    //   firstDimension: symbol.articulation[keys[0]] ? symbols.articulation[keys[0]] : "",
    //   secondDimension: symbol.articulation[keys[1]],
    //   thirdDimension: symbol.articulation[keys[2]] ? symbols.articulation[keys[2]] : "",
    // }
    symbols.push({
      id: symbol.id,
      symbol: symbol.symbol,
      type: symbol.type,
      articulation: articulation,
    });
  });

  return symbols;
}
export default getIpaSymbols;
