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
          <Route path='/dashboard' component={Dashboard} />
        </Switch>
      </Router>
    )
  }
}

class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '', 
      password: ''
    }

    this.onChangeUsernameText = this.onChangeUsernameText.bind(this)
    this.onChangePasswordText = this.onChangePasswordText.bind(this)

    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    // axios.get("/signin").then( (response) => {
    //     console.log(response)
    //   } 
    // )

    alert('we are at home')
  }

  onChangeUsernameText(event) {
    this.setState({username: event.target.value})
  }

  onChangePasswordText(event) {
    this.setState({password: event.target.value})
  }

  onSubmit(event) {
    axios.post("/signin", {email: 'Fred', password: 'Flint'}).then((response) => {
      console.log(response)

      if (response.status === 200) {
        alert('Sign in successfully')

        this.props.history.push('/dashboard')
      }
    })

    event.preventDefault()
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label>Username: </label>
          <input type='text' value={this.state.username} onChange={this.onChangeUsernameText} />

          <label>Password: </label>
          <input type='password' value={this.state.password} onChange={this.onChangePasswordText} />

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
