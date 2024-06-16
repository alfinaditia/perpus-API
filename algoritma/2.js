function longestWord(sentence) {
    let words = sentence.split(" ");
    
    let kataPanjang = "";
    
    for (let i = 0; i < words.length; i++) {
        if (words[i].length > kataPanjang.length) {
            kataPanjang = words[i];
        }
    }
    
    return kataPanjang;
}

const sentence = "Saya sangat senang mengerjakan soal algoritma";
let longest = longestWord(sentence);
console.log("kata : ", sentence)
console.log("kata terpanjang : ", longest); 
