export const encryptCodes = (password, passcode) => {
    let result = [];
    let passLen = passcode.length;
    for (let i = 0; i < password.length; i++) {
        let passOffset = i % passLen;
        let calAscii = password.charCodeAt(i) + passcode.charCodeAt(passOffset);
        result.push(calAscii);
    }
    return JSON.stringify(result);
};
export const decryptCodes = (password, passcode) => {
    let result = [];
    let str = '';
    if (password) {
        let codesArr = JSON.parse(password);
        let passLen = passcode.length;
        for (let i = 0; i < codesArr.length; i++) {
            let passOffset = i % passLen;
            let calAscii = codesArr[i] - passcode.charCodeAt(passOffset);
            result.push(calAscii);
        }
        for (let i = 0; i < result.length; i++) {
            let ch = String.fromCharCode(result[i]);
            str += ch;
        }
        return str;
    }
    else {
        return null;
    }
};
