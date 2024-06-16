function reverseAlphabet(inputStr) {
    let alphabetPart = '';
    let numberPart = '';
    

    for (let i = 0; i < inputStr.length; i++) {
        let char = inputStr.charAt(i);
        if (/[a-zA-Z]/.test(char)) {
            alphabetPart += char;
        } else if (/[0-9]/.test(char)) {
            numberPart += char;
        }
    }
    
    let reversedAlphabet = alphabetPart.split('').reverse().join('');
    

    let result = reversedAlphabet + numberPart;
    
    return result;
}


let inputString = "NEGIE1";
let hasil = reverseAlphabet(inputString);
console.log(`Hasil = "${hasil}"`);
