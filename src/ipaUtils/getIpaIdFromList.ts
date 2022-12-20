import ipaFile from "../data/IPA.json"

function getIpaIdFromList(ipaList: string[]) {
  const idList: number[] = []
  ipaList.forEach((symbol) => {
    for (let i =0; i <= ipaFile.length - 1; i++) {
      console.log(ipaFile[i].symbol === symbol)
      if (symbol === ipaFile[i].symbol) {
        idList.push(ipaFile[i].id)
        break;
      }
    }

  })
  console.log(idList)
  return idList

}

export default getIpaIdFromList
