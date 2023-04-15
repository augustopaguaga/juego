import { useEffect, useState } from 'react'
import Container1 from './container1'
import Teclado from './teclado'
import { getRandomWords } from '../palabras/getRandomWords'








const VERTICAL_IDX = Math.floor(Math.random() * 4) + 2;

export default function Juego1 () {

const intentosStyle = {
  backgroundColor: '#333',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '10px 20px',
  borderRadius: '5px',
  width: '50px',
  margin: '0 auto',
  textAlign:'center'
}
const scoreLabel = {
 
  fontSize: '14px',

}
const scoreCount = {
    fontSize: '24px',
  fontWeight: 'bold',
  color: '#ffcc00', 
}

const btnStyle = {
  display: 'inline-block',
  borderRadius: '5px',
  backgroundColor: '#007bff',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  padding: '12px 24px',
  textAlign: 'center',
  textDecoration: 'none',
  transition: 'background-color 0.3s ease',

  hover : {
    backgroundColor: '#0062cc',
    color: '#fff',
  }
}



  //Define mainArray state. Is an Array whit 6 arrays (for words) whit 9 positions for the letters, starting as null value
  const [mainArray, setMainArray] = useState(Array(6).fill(Array(8).fill(null)))
  
  const [letrasCorrectas, setLetrasCorrectas] = useState([])
  const [letrasIncorrectas, setLetrasIncorrectas] = useState([])
  const [nivel, setNivel] = useState(0)
  const [palabras, setPalabras] = useState([])
  const [tiempo, setTiempo] = useState(0)
  const [tiempoUnix, setTiempoUnix] = useState(0)
  const [nivelCorrecto, setNivelCorrecto] = useState([])
 
  /*
  useEffect(() => {

window.FB.getLoginStatus(function(response) {
  statusChangeCallback(response);
});
    function statusChangeCallback(response) {
      console.log('statusChangeCallback');
      console.log(response);
      // The response object is returned with a status field that lets the
      // app know the current login status of the person.
      // Full docs on the response object can be found in the documentation
      // for FB.getLoginStatus().
      if (response.status === 'connected') {
          // Logged into your app and Facebook.
          console.log('Welcome!  Fetching your information.... ');
          window.FB.api('/me', function (response) {
              console.log('Successful login for: ' + response.name);
              document.getElementById('status').innerHTML =
                'Thanks for logging in, ' + response.name + '!';
          });
      } else {
          // The person is not logged into your app or we are unable to tell.
          document.getElementById('status').innerHTML = 'Please log ' +
            'into this app.';
      }
  }

  }, [])
  */

 

  useEffect(() => {
    const allNull = mainArray.every(row => row.every(val => val === null));
    if (allNull) {
      getWords();
    }
  }, [mainArray]);


  const getWords = async () => {
    //get words
    const words = await getRandomWords(VERTICAL_IDX)
    //split first word string into array
    let currentWordArr = [...words[0]]

    //add vertical word to array
    let gridArray = mainArray.map((row, rowIdx) =>
      row.map((l, letterIndex) =>
        letterIndex === VERTICAL_IDX
          ? {
              letter: currentWordArr[rowIdx],
              isGuessed: null,
              wordId: 0
            }
          : l
      )
    )

    //map array to add horizontal words
    gridArray = gridArray.map((row, rowIdx) => {
      //get current word
      let word = words[rowIdx + 1]
      //get the letter of the vertical word.
      let mainLetter = row[VERTICAL_IDX].letter
      let [before, after] = word.split(mainLetter, 2)

      //find the index where word it gonna start on the array.
      let letterIdx =
        before.length > 0 ? VERTICAL_IDX - before.length : VERTICAL_IDX + 1

      //currentLetterIndex.
      let currentLetter = 0

      //map each array of word
      return row.map((l, index) => {
        //save the letter to add
        const letter = word[currentLetter]

        // if there is not letter (null) just return.
        if (!word[currentLetter]) return l

        //if the current idx is over the vertical letter skip it and just return.
        if (index === VERTICAL_IDX) {
          if (currentLetter === 0) {
            currentLetter++
            return l
          }

          letterIdx++
          currentLetter++
          return l
        }

        //if the index is in the letterIdx return the new letter
        if (index === letterIdx) {
          //sum variables to next letter
          letterIdx++
          currentLetter++

          return {
            wordId: rowIdx + 1,
            letter: letter,
            isGuessed: null
          }
        }

        //in default case just return.
        return l
      })
    })

    //save it in the state.
    setMainArray(gridArray)
  }

  function jugar () {
    /*
    if (palabras && Object.keys(palabras).length !== 0) {
      let segundos = 0
      const intervalId = setInterval(() => {
        segundos++
        setTiempo(segundos)
      }, 1000)

      const unixTime = Math.floor(Date.now() / 1000)
      console.log(unixTime)
      setTiempoUnix(unixTime)
    } else {
      alert('error')
    }
    */
  
    setMainArray(Array(6).fill(Array(8).fill(null)))
    setNivel(0)
    setLetrasCorrectas([])
    setLetrasIncorrectas([])
    setNivelCorrecto([])
    
    getWords();
  }

  function revisar (inputLetter) {
    //bolean
    let hasMatched

    //map the array and modify it if letter is correct.
    let newArr = mainArray.map(row => {
      return row.map(word => {
        if (
          removeAccents(word?.letter) === inputLetter.toLowerCase() &&
          word?.wordId === nivel
        ) {
          hasMatched = true
          return { ...word, isGuessed: true }
        } else {
          return word
        }
      })
    })

    //if not has matched return and set incorrect letter
    if (!hasMatched) {
      setLetrasIncorrectas([...letrasIncorrectas, inputLetter])
      if(letrasIncorrectas.length >= 7){
      changeLevel(false, newArr, nivelCorrecto);
      }
      return 
    }

    //if has matched set the array and set correct letter
    setMainArray(newArr)
    setLetrasCorrectas([...letrasCorrectas, inputLetter])

    //Check if all letters of the same level are guessed. In case of true increment the level and reset the letters
    if (
      newArr.every(row =>
        row.filter(l => l?.wordId === nivel).every(l => l?.isGuessed===true)
      )
    ) {
     let nivelCorrect=[...nivelCorrecto, nivel]
      setNivelCorrecto(nivelCorrect);
      
      changeLevel(true, newArr, nivelCorrect);
    }
  }

  //remove accents from letter to validate correctly
  function removeAccents (str) {
    if (!str) return null

    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
  }


  function changeLevel (data , array, nivelCorrect) {
    
      let newArr = array.map((row, idx) => {
       return row.map((word, index) => {
   
        if(
          word?.letter &&
          idx===nivel &&
          word?.wordId === 0
        ){
          
          return { ...word, isGuessed: true }
        
        }else{
          if(
            word?.letter &&
            idx!==nivel &&
            word?.wordId === 0 &&
            !nivelCorrect?.includes(idx + 1) && 
            !nivelCorrect?.includes(0)
          ){
            return { ...word, isGuessed: false }
          }
        }
      
          if (
            word?.letter &&
            word?.wordId === nivel &&
            data===false
          )

          {
            return { ...word, isGuessed: false }
          }else {
            return word
          }
      
        })
      })
      
      setMainArray(newArr);
      setNivel(nivel+1)
      setLetrasCorrectas([])
      setLetrasIncorrectas([])
      if(nivel+1===7){

      }
  }

  return (
    <div>
   

      <div style={{ marginTop: '1rem',}} >
        <button onClick={jugar} style={btnStyle}>Volver a Empezar</button>
      </div>
      <div >
        <button style={{display:'none'}}>Salir</button>
      </div>
      <div>
        <div style={{display:'none'}}>
          <label>tiempo de juego: {tiempo}</label> <br></br>
          <label>{nivel === 7 ? 'GANASTEEEEE' : ''}</label>
        </div>

        <div 
          style={{
            display: 'flex',
            width: '200px',
            justifyContent: 'center', // Centra horizontalmente el contenedor
            alignItems: 'stretch',
            margin: '0 auto',
            marginTop: '1rem', 
          }}
        >
        <div style={intentosStyle}>
          <label style={scoreLabel}> ❤ <label style={scoreCount}>{8 - letrasIncorrectas.length}</label></label> <br></br>
        </div>
        <div style={intentosStyle}>
          <label style={scoreLabel}> Aciertos: <label style={scoreCount}>{nivelCorrecto.length}</label></label> <br></br>
        </div>
        </div>

        <div
          style={{
            marginTop: '4rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          {mainArray.map((row, index) => (
            <div>
              {' '}
              <Container1 letrasData={row} nivel={nivel} contain={index + 1} />
            </div>
          ))}
          <Teclado
            correctas={letrasCorrectas}
            incorrectas={letrasIncorrectas}
            revisa={revisar}
            nivel={nivel}
          />
        </div>
      </div>
    </div>
  )
}
