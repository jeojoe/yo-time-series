export const stringToKeyboardPosition = (string) => {
  const english = '!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:"ZXCVBNM<>?1234567890-=qwertyuiop[]\\asdfghjkl;\'zxcvbnm,./';
  const thai    = '+๑๒๓๔ู฿๕๖๗๘๙๐"ฎฑธํ๊ณฯญฐ,ฅฤฆฏโฌ็๋ษศซ.()ฉฮฺ์?ฒฬฦๅ/_ภถุึคตจขชๆไำพะัีรนยบลฃฟหกดเ้่าสวงผปแอิืทมใฝ';

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


