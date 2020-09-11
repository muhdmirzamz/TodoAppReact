import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

class Register extends React.Component {
    constructor(props) {
        super(props)

        this.state = {username: '', password: ''}

        this.onChangeUsernameText = this.onChangeUsernameText.bind(this)
        this.onChangePasswordText = this.onChangePasswordText.bind(this)

        this.onSubmit = this.onSubmit.bind(this)
    }

    onChangeUsernameText(event) {
        this.setState({username: event.target.value})
    }

    onChangePasswordText(event) {
        this.setState({password: event.target.value})
    }

    onSubmit(event) {
        axios.post("/register", {email: this.state.username, password: this.state.password}).then((response) => {
            if (response.status === 200) {
                console.log(response)

                alert('Registered successfully')
            } else {
                alert('Oops something went wrong!')
            }
        })

        event.preventDefault()
    }

    render() {
        return(
            <form onSubmit={this.onSubmit}>
                <label>Username: </label>
                <input type='text' value={this.state.username} onChange={this.onChangeUsernameText} />

                <label>Password: </label>
                <input type='password' value={this.state.password} onChange={this.onChangePasswordText} />

                <input type='submit' value='Submit' />
            </form>
        )
    }
}

export default Register;