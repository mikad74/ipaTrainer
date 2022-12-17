function playAudio(ipaSymbol: IpaEntry) {
  if (ipaSymbol.type === "consonant") {
    const source = `${ipaSymbol.articulation.thirdDimension}-${ipaSymbol.articulation.secondDimension}-${ipaSymbol.articulation.firstDimension}.ogg`;
    console.log(source.replace(" ", "-"));
    const audio = new Audio(`./soundFiles/${source.replace(" ", "-")}`);
    audio.play();
  } else {
    const source = `${ipaSymbol.articulation.firstDimension}-${ipaSymbol.articulation.secondDimension}-${ipaSymbol.articulation.thirdDimension}.ogg`;
    console.log(source.replace(" ", "-"));
    const audio = new Audio(`./soundFiles/${source.replace(" ", "-")}`);
    audio.play();
  }
}

export default playAudio;
