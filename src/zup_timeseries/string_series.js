const english = [
  '!@#$%^&*()_+',
  'QWERTYUIOP{}|',
  'ASDFGHJKL:"',
  'ZXCVBNM<>?',
  '1234567890-=',
  'qwertyuiop[]\\',
  'asdfghjkl;\'',
  'zxcvbnm,./'
];

const thai    = [
  '+๑๒๓๔ู฿๕๖๗๘๙' ,
  '๐"ฎฑธํ๊ณฯญฐ,ฅ',
  'ฤฆฏโฌ็๋ษศซ.' ,
  '()ฉฮฺ์?ฒฬฦ' ,
  'ๅ/_ภถุึคตจขช' ,
  'ๆไำพะัีรนยบลฃ' ,
  'ฟหกดเ้่าสว' ,
  'งผปแอิืทมใฝ'
];

export const findCharPosition = (char, layoutMatrix) => {
  let [x, y] = [-1, -1];

  layoutMatrix.forEach((row, rowIndex) => {
    const columnIndex = row.indexOf(char);

    if (columnIndex !== -1) {
      [x, y] = [columnIndex, rowIndex];
    }
  });

  return {x, y};
};

export const stringToKeyboardPosition = (string) => {
  const transform = (c) => {
    const engLocation = findCharPosition(c, english);

    if(engLocation.x !== -1 && engLocation.y !== -1) {
      return Object.assign(engLocation, { z: 0 });
    } else {
      const thaiLocation = findCharPosition(c, thai);
      return Object.assign(thaiLocation, { z: 1 });
    }
  };

  return string.split('').map(transform);
};
