import IPA from "../data/IPA.json";

function getIpaSymbols(ipaSet?: Array<number>) {
  const symbols: Array<{
    id: number;
    symbol: string;
    type: string;
    articulation: Articulation;
  }> = [];
  IPA.forEach((symbol) => {
    if (ipaSet && !ipaSet?.includes(symbol.id)) {
      return
    }
    const articulation: Articulation = {
      firstDimension: "",
      secondDimension: "",
      thirdDimension: "",
    };
    if (symbol.type === "vowel") {
      articulation.firstDimension = symbol.articulation.height ? symbol.articulation.height: "";
      articulation.secondDimension = symbol.articulation.place ? symbol.articulation.place: "";
      articulation.thirdDimension = symbol.articulation.roundedness ? symbol.articulation.roundedness : "" ;
    } else if (symbol.type === "consonant") {
      articulation.firstDimension = symbol.articulation.voicing? symbol.articulation.voicing: "";
      articulation.secondDimension = symbol.articulation.place?symbol.articulation.place:"";
      articulation.thirdDimension = symbol.articulation.manner?symbol.articulation.manner:"";
    }

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
