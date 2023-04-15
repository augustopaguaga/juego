import { useState } from "react"

export default function Teclado({ correctas, incorrectas, revisa, nivel }){

    const style1={
        backgroundColor:"rgb(117 202 121)",
        borderRadius:"5px",
        border: "none",
        width:"40px",
        height:"45px",
        color: "white",
        margin: '3px',
        fontWeight: 'bolder',
        padding: '10px'
    }
    const style2={
        backgroundColor:"#f87b7b",
        pointerEvents: 'none',
        borderRadius:"5px",
        border: "none",
        width:"40px",
        color: "white",
        height:"45px",
        fontWeight: 'bolder',
        margin: '3px'
    }
    const style3={
        backgroundColor:"#e2e8f0",
        borderRadius:"5px",
        border: "none",
        width:"40px",
        height:"45px",
        fontWeight: 'bolder',
        margin: '3px',
        color: 'black',
        cursor: 'pointer'
    }

    const[teclas1, setTeclas1] = useState(["Q","W","E","R","T","Y","U","I","O","P"]); 
    const[teclas2, setTeclas2] = useState(["A","S","D","F","G","H","J","K","L","Ñ"]);
    const[teclas3, setTeclas3] = useState(["Z","X","C","V","B","N","M"]);
    const[corrects, setCorrects] = useState(correctas);
    const[incorrects, setInorrects] = useState(incorrectas);
    

    function styles(item){

        if (correctas.includes(item)) {
            return style1;
          }else {
            if (incorrectas.includes(item)) {
                return style2;
              }else {
                return style3;
              }  
          }
    }

    function revisar2(item){
        if(correctas.includes(item)===false && incorrectas.includes(item)===false && nivel<=6){
            revisa(item);
        }
    }



    return(
        <div style={{marginTop: '2rem'}}>
           <div>{teclas1.map((item)=>(<button key={item} style={styles(item)} onClick={(event) => revisar2(event.target.textContent)}>{item}</button>))}</div>
           <div>{teclas2.map((item)=>(<button key={item} style={styles(item)} onClick={(event) => revisar2(event.target.textContent)}>{item}</button>))}</div>
           <div>{teclas3.map((item)=>(<button key={item} style={styles(item)} onClick={(event) => revisar2(event.target.textContent)}>{item}</button>))}</div> 
        </div>
    )
}