import React from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = (props) => {
  if (props.kaikki < 1) {
    return (
      <p>Yhtään palautetta ei ole annettu</p>
    )
  }
  else {
    return (
      <div>
        <table>
          <tbody>
            <tr><td>Hyvä: </td><Statistic value={props.hyva} /></tr>
            <tr><td>Neutraali: </td><Statistic value={props.neutraali} /></tr>
            <tr><td>Huono: </td><Statistic value={props.huono} /></tr>
            <tr><td>Keskiarvo: </td><Statistic value={(props.hyva - props.huono) / props.kaikki} /></tr>
            <tr><td>Positiivisia: </td><Statistic value={props.hyva/props.kaikki * 100} pro="%" /></tr>
          </tbody>
        </table>
      </div>
    )
  }
}

const Statistic = ({value, pro}) => {
  return (
    <td>{value} {pro}</td>
  )
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0,
      kaikki: 0
    }
  }

  annaPalaute = (palaute) => {
    return () => {
      this.setState(palaute)
      this.setState({kaikki: this.state.kaikki +1})
    }
  }

  render() {
    return (
      <div>
        <h1>anna palautetta</h1>
        <div>
          <Button handleClick={this.annaPalaute({ hyva: this.state.hyva +1})} text="hyvä" />
          <Button handleClick={this.annaPalaute({ neutraali: this.state.neutraali +1})} text="neutraali" />
          <Button handleClick={this.annaPalaute({ huono: this.state.huono +1})} text="huono" />
        </div>
        <div>
          <h1>statistiikkaa</h1>
          <Statistics hyva={this.state.hyva}
          neutraali={this.state.neutraali}
          huono={this.state.huono}
          kaikki={this.state.kaikki} />
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
