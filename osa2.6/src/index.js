import React from 'react';
import ReactDOM from 'react-dom';
import personService from './services/persons'
import './index.css'


const Names = (props) => {
  const namesToShow =
    props.filter.empty ?
    props.persons :
    props.persons.filter(person => person.name.toLowerCase().match(props.filter.toLowerCase()))

  return (
    <div>
      <h2>Numerot</h2>
      <table>
        <tbody>
          {namesToShow.map(person =>
            <tr key={person.name}>
              <td>{person.name}</td>
              <td>{person.number}</td>
              <td><button value={person.id} onClick={props.deleteClick}>poista</button></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}


const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      error: null
    }
  }

  componentWillMount() {
    personService
      .getAll()
      .then(response => {
        this.setState({persons: response.data})
      })
  }

  addNumber = (event) => {
    event.preventDefault()
    let name = this.state.newName
    let found = this.state.persons.filter(function(person) { return person.name === name})
    const personObject = {
      name: name,
      number: this.state.newNumber

    }
    if (found.length === 0) {
      const persons = this.state.persons.concat(personObject)
      personService
        .create(personObject)
        .then(response => {
          this.componentWillMount()
          this.setState({
            persons: persons,
            newName: '',
            newNumber: '',
            error: `Lisättiin ${name}`
          })
          setTimeout(() => {
            this.setState({error: null})
          }, 5000)
        })
    }
    else {
      if(window.confirm(`${found[0].name} löytyi jo luettelosta, korvataanko vanha numero uudella?`)){
        personService
          .update(found[0].id, personObject)
          .then(response => {
            this.componentWillMount()
            this.setState({
              error: `päivitettiin ${name}`
            })
            setTimeout(() => {
              this.setState({error: null})
            }, 5000)
          })
          .catch(error => {
            this.setState({
              error: `henkilön ${name} tiedot on jo poistettu`
            })
            setTimeout(() => {
              this.setState({error: null})
            }, 5000)
              this.setState({ persons: this.state.persons.filter(person => person.id !== found[0].id)})
          })
      }
    }
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  handleFilter = (event) => {
    this.setState({ filter: event.target.value })
  }

  handleNumberDelete = (event) => {
    const id = Number(event.target.value)
    const found = this.state.persons.find(person => person.id === id)
    if (window.confirm(`Poistetaanko ${found.name}?`)) {
      event.preventDefault()
      personService
        .del(id)
        .then(response => {
          this.componentWillMount()
          this.setState({
            error: `poistettiin ${found.name}`
          })
          setTimeout(() => {
            this.setState({error: null})
          }, 5000)
        })
    }
  }

  render() {
    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <Notification message={this.state.error}/>
        <div>
          rajaa näytettäviä: <input value={this.state.filter} onChange={this.handleFilter}/>
        </div>
        <h2>Lisää uusi</h2>
        <form onSubmit={this.addNumber}>
          <div>
            nimi: <input value={this.state.newName} onChange={this.handleNameChange}/>
          </div>
          <div>
            numero: <input value={this.state.newNumber} onChange={this.handleNumberChange}/>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <Names filter={this.state.filter} persons={this.state.persons} deleteClick={this.handleNumberDelete}/>
      </div>
    )
  }
}

export default App

ReactDOM.render(<App />, document.getElementById('root'));
