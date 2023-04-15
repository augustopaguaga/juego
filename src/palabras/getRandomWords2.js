import data from "../palabras/words.json";

export async function getRandomWords2() {

    const jsonArray=data;
    const words= [];
    let number=0;

    //get random words
    while (number<=8) {
        let randomNumber =  Math.floor(Math.random() * jsonArray.length)
        let word = jsonArray[randomNumber]
        if(word.length>=5 && !words.includes(word)){
        words.push(word) 
        number++;
        } 
    }
    return words;
}