import IPA from "../data/IPA.json"

function getIpaSymbols() {
  const symbols: Array<{id: number, name: string, symbol: string}> = []
  IPA.forEach((symbol, idx)=> {
    symbols.push({id: idx, name: symbol.name, symbol: symbol.symbol})
  })

  return symbols
}
export default getIpaSymbols
