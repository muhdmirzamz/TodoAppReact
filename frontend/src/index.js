import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import Dashboard from './dashboard'

// import App from './App';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import { createBrowserHistory } from 'history';
import axios from "axios"

import * as serviceWorker from './serviceWorker';

class Page extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/dashboard' component={Dashboard} />
        </Switch>
      </Router>
    )
  }
}

class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {text: ''}

    this.onChangeText = this.onChangeText.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    // axios.get("/signin").then( (response) => {
    //     console.log(response)
    //   } 
    // )

    alert('we are at home')



    // axios.post("/signin", {email: 'Fred', password: 'Flint'}).then((response) => {
    //   console.log(response)

    //   if (response.status === 200) {
    //       let history = createBrowserHistory();
    //       history.push("/dashboard")
    //   }
    // })
  }

  onChangeText(event) {
    this.setState({text: event.target.value})
  }

  onSubmit(event) {
    alert('Value submitted was: ' + this.state.text)

    event.preventDefault()
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label>Things to put</label>
          <input type='text' value={this.state.text} onChange={this.onChangeText} />
          <input type='submit' value='Submit' />
        </form>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
