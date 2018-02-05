import React from 'react'

const Kurssi = ({ kurssi }) =>{
  const reducer = (accumulator, currentValue) => accumulator + currentValue
  const tehtavat = kurssi.osat.map(osa=>osa.tehtavia)

  return (
    <div>
      <h1>{kurssi.nimi}</h1>
        {kurssi.osat.map(osa => <li key={osa.id}>{osa.nimi} {osa.tehtavia} </li>)}
        <li>Yhteensä {tehtavat.reduce(reducer)} tehtävää</li>
    </div>
  )
}

export default Kurssi
