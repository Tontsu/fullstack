import React from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: [0,0,0,0,0,0]
    }
  }

LaskeRandom = () => {
  return () => {
    this.setState({ selected: Math.floor((Math.random() * 6))})
  }
}

Aanesta = () => {
  return () => {
    let temp = this.state.votes
    temp[this.state.selected]++
    this.setState({votes: temp})
  }
}

  render() {
    return (
      <div>
        <div>
          {this.props.anecdotes[this.state.selected]}
        </div>
        <div>
          has {this.state.votes[this.state.selected]} votes
        </div>
        <div>
          <Button handleClick={this.Aanesta()} text="vote" />
          <Button handleClick={this.LaskeRandom()} text="next anecdote" />
        </div>
        <div>
          <h1>anectode with most votes:</h1>
          {this.props.anecdotes[this.state.votes.indexOf(Math.max(...this.state.votes))]}
        </div>
        has {this.state.votes[this.state.votes.indexOf(Math.max(...this.state.votes))]} votes
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
