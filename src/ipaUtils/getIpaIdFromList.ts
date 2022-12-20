import ipaFile from "../data/IPA.json"

function getIpaIdFromList(ipaList: string[]) {
  const idList: number[] = []
  ipaList.forEach((symbol) => {
    for (let i =0; i <= ipaFile.length - 1; i++) {
      if (symbol === ipaFile[i].symbol) {
        idList.push(ipaFile[i].id)
        break;
      }
    }

  })
  return idList

}

export default getIpaIdFromList
