function playAudio(ipaSymbol: IpaEntry) {
  if (ipaSymbol.type === "consonant") {
    const source = `${ipaSymbol.articulation.thirdDimension}-${ipaSymbol.articulation.secondDimension}-${ipaSymbol.articulation.firstDimension}.ogg.m4a`;
    console.log(source.replace(" ", "-"));
    const audio = new Audio(`./soundFiles/${source.replace(" ", "-")}`);
    audio.play();
  } else {
    const source = `${ipaSymbol.articulation.firstDimension}-${ipaSymbol.articulation.secondDimension}-${ipaSymbol.articulation.thirdDimension}.ogg.m4a`;
    console.log(source.replace(" ", "-"));
    const audio = new Audio(`./soundFiles/${source.replace(" ", "-")}`);
    audio.play();
  }
}

export default playAudio;
