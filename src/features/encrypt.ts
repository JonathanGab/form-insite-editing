export const encryptCodes = (password: string, passcode: string) => {
  let result = [];
  let passLen: number = passcode.length;
  for (let i = 0; i < password.length; i++) {
    let passOffset: number = i % passLen;
    let calAscii: number =
      password.charCodeAt(i) + passcode.charCodeAt(passOffset);
    result.push(calAscii);
  }
  return JSON.stringify(result);
};

export const decryptCodes = (password: string, passcode: string) => {
  let result = [];
  let str: string = '';
  if (password) {
    let codesArr: number[] = JSON.parse(password);
    let passLen: number = passcode.length;
    for (let i = 0; i < codesArr.length; i++) {
      let passOffset: number = i % passLen;
      let calAscii: number = codesArr[i] - passcode.charCodeAt(passOffset);
      result.push(calAscii);
    }
    for (let i = 0; i < result.length; i++) {
      let ch = String.fromCharCode(result[i]);
      str += ch;
    }
    return str;
  } else {
    return null;
  }
};
