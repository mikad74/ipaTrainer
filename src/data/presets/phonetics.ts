import getIpaIdFromList from "../../ipaUtils/getIpaIdFromList"

function getPhoneticsPreset() {
  // Something
  const symbolList = [ "i","y","ʉ","u","ɪ","ʏ","ʊ","e","ø","ə","o","ɛ","œ","ʌ","ɔ","æ","a","ɑ","ɒ","p","t","k","q"/*, "ʔ" */,"b","d","g","f","θ","s","ʃ","ç","x","χ","h","v","ð","z","ʒ" ,"ʝ","ɣ","ʁ","ɦ" ,"ts","tʃ","dz","dʒ","m","ɱ","n","ɲ","ŋ","w","ʋ","ɹ","ɻ","j","ɥ","l","ɫ","ʎ","r","ʀ","ɾ" ]
  const ipaIds = getIpaIdFromList(symbolList)
  return ipaIds
}

export default getPhoneticsPreset
