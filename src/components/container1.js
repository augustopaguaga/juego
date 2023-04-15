
export default function Container1 ({ letrasData, nivel, contain }) {
    const estilo1 = {
      backgroundColor: '#000000c4',
      width: '50px',
      height: '50px',
      verticalAlign: 'middle',
      borderRadius: '5px',
      margin: '3px',
      border: '2px solid rgb(74 74 74)',
    }
    const estilo2 = {
      ...estilo1,
      backgroundColor: 'white',
      border: '2px solid rgb(224, 224, 224)',
    }
    const estilo3 = {
      ...estilo1,
      color: 'white',
      fontWeight: 'bold',
      backgroundColor: '#43a047',
      border: '2px solid #43a047',
      fontSize: '2rem',
      textAlign: 'center',
      lineHeight: '50px',
      transition: '.3s ease',
    }
    const estilo4 = {
      ...estilo2,
      color: '#f87b7b',
      fontWeight: 'bold',
     
      border: '2px solid #f87b7b',
      fontSize: '2rem',
      textAlign: 'center',
      lineHeight: '50px',
      transition: '.3s ease',
    }
  
    const cambiarColor1 = {
      ...estilo2,
      border: '2px solid orange'
    }

    const cambiarColor2 = {
      backgroundColor: 'grey'
    }
  
    function changeColor (index) {
      if (nivel === 1 && index === 3) {
        return cambiarColor1
      }
      if (nivel === 2 && contain === 1 && index !== 0) {
        return cambiarColor1
      }
      if (nivel === 3 && contain === 3 && index !== 0 && index !== 6) {
        return cambiarColor1
      }
      if (
        nivel === 4 &&
        contain === 4 &&
        index !== 0 &&
        index !== 1 &&
        index !== 6
      ) {
        return cambiarColor1
      }
      if (nivel === 5 && contain === 6 && index !== 6) {
        return cambiarColor1
      }
    }

    const getStyle = (letra) => {
      if(!letra) return estilo1
      if(letra.isGuessed) return estilo3
      if(letra.isGuessed===false) return estilo4
     
      if(letra?.wordId === nivel) return cambiarColor1 

      return estilo2
    }
  
    return (
      <div>
        <table>
          <tbody>
            <tr>
              {letrasData.map((letra, index) => (
                <td
                  key={index}
                >
                  <div style={getStyle(letra)} >
                  {letra?.isGuessed != null ? letra.letter.toUpperCase() : ''}
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
  