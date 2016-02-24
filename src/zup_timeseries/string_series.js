const english = '!@#$%^&*()_+' + 'QWERTYUIOP{}|' + 'ASDFGHJKL:"' + 'ZXCVBNM<>?' +
                '1234567890-=' + 'qwertyuiop[]\\' + 'asdfghjkl;\'' + 'zxcvbnm,./';
const thai    = '+๑๒๓๔ู฿๕๖๗๘๙'  + '๐"ฎฑธํ๊ณฯญฐ,ฅ' + 'ฤฆฏโฌ็๋ษศซ.' + '()ฉฮฺ์?ฒฬฦ' +
                'ๅ/_ภถุึคตจขช' + 'ๆไำพะัีรนยบลฃ' + 'ฟหกดเ้่าสว' + 'งผปแอิืทมใฝ';

export const stringToKeyboardPosition = (string) => {
  const transform = (c) => {
    if(english.indexOf(c) != -1) {
      return english.indexOf(c);
    } else {
      return english.length + thai.indexOf(c);
    }
    return -1;
  };

  return string.split('').map(transform);
};


export const translateOffset = (series, comparingSeries) => {
  const calcEngThaiRatio = (aSeries) => {
    const maxEng = 92;
    return aSeries.reduce((acc, e) => acc + (e < maxEng ? 1 : 0)) / aSeries.length
  };

  const isOnTheSameKeyboardLayout =
    Math.abs(calcEngThaiRatio(series) - calcEngThaiRatio(comparingSeries)) < 0.1;

  if(isOnTheSameKeyboardLayout) {
    return series;
  }
  // else
  const mean = series.reduce((acc, curr) => acc + curr) / series.length;
  return series.map(e => e - mean);
};
