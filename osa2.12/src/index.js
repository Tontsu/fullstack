import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

const Countries = (props) => {
  let countriesToShow =
    props.filter.empty ?
    props.countries :
    props.countries.filter(country => country.name.toLowerCase().match(props.filter.toLowerCase()))

  if(countriesToShow.length > 10) {
    return (
      <div>
        <p>too many matches, specify another filter</p>
      </div>
    )
  }
  else if(countriesToShow.length === 1) {
    return (
      <div>
        <h1>
          {countriesToShow[0].name}
        </h1>
        <p>capital: {countriesToShow[0].capital}</p>
        <p>population: {countriesToShow[0].population}</p>
        <img src={countriesToShow[0].flag} alt="flag" width="400" height="auto"/>
      </div>
    )
  }
  else {
    return (
      <div>
        <table>
          <tbody>
            {countriesToShow.map(country =>
              <tr key={country.name}>
                <td id={country.name} onClick={props.handler}>{country.name}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: ''
    }
  }

  componentWillMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ countries: response.data })
      })
  }

  handleFilter = (event) => {
    this.setState({ filter: event.target.value })
  }

  clickHandler = (event) => {
    this.setState({ filter: event.target.id })
  }

  render() {
    return (
      <div>
        find countries: <input value={this.state.filter} onChange={this.handleFilter}/>
        <Countries countries={this.state.countries} filter={this.state.filter} handler={this.clickHandler}/>
      </div>

    )
  }
}

export default App

ReactDOM.render(<App />, document.getElementById('root'));
