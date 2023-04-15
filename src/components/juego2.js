import { useEffect, useState } from "react";
import { getRandomWords2 } from "../palabras/getRandomWords2";




export default function Juego2() {

    const mainArray= useState(Array(9).fill(Array(3).fill(null)));

    useEffect(()=>{
        getWords();
    }, [])

    const getWords = async () => {
        const words = await getRandomWords2();

        
    }

}