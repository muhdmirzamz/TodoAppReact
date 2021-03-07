import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import Dashboard from './dashboard'
import Register from './register'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
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
          <Route path='/register' component={Register} />
        </Switch>
      </Router>
    )
  }
}

class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '', 
      password: ''
    }

    this.onChangeEmailText = this.onChangeEmailText.bind(this)
    this.onChangePasswordText = this.onChangePasswordText.bind(this)

    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    axios.get("/check").catch((error) => {
      if (error) {
          alert(error.response.data)
      }
    })
  }

  onChangeEmailText(event) {
    this.setState({email: event.target.value})
  }

  onChangePasswordText(event) {
    this.setState({password: event.target.value})
  }

  onSubmit(event) {
    // axios.get("/test").then((response) => {
    //   console.log(response)
    // })

    axios.post("/signin", {email: this.state.email, password: this.state.password}).then((response) => {
      if (response.status === 200) {
        console.log(response)

        alert('Sign in successfully')

        // https://stackoverflow.com/a/53916596
        this.props.history.push('/dashboard')
      }
    }).catch((error) => {
      if (error) {
          console.log(error)
          console.log(error.message)
          console.log(error.response)
          
      }
  })

    event.preventDefault()
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label>Email: </label>
          <input type='text' value={this.state.email} onChange={this.onChangeEmailText} />

          <label>Password: </label>
          <input type='password' value={this.state.password} onChange={this.onChangePasswordText} />

          <input type='submit' value='Sign in' />
        </form>
        <Link to="/register">Register</Link>
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
