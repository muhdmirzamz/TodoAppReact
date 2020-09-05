import React from 'react';
import logo from './logo.svg';

import axios from 'axios'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {todoFieldText: ''}

    this.onChangeTodoFieldText = this.onChangeTodoFieldText.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    console.log("performing get request")
  }

  componentDidMount() {
    axios.get("/getItems").then((response) => {
      console.log("Get items status: " + response.status)

      if (response.status === 200) {
        console.log(response)
      } else {
        console.log("response is not 200")
      }
    })
  }

  onChangeTodoFieldText(event) {
    this.setState({todoFieldText: event.target.value})
  }

  onSubmit(event) {
    axios.post("/addItem", {item: this.state.todoFieldText}).then((response) => {
      console.log("Add items status: " + response.status)

      if (response.status === 200) {
        alert("Successfully added item")
      } else {
        alert("Oops something went wrong!")
      }
    })

    event.preventDefault()
  }

  render() {
    return(
      <div>
          <form onSubmit={this.onSubmit}>
            <label>Add todo item: </label>
            <input type='text' value={this.state.todoFieldText} onChange={this.onChangeTodoFieldText} />

            <input type='submit' value='Submit' />
          </form>
      </div>
    )
  }
}


export default Dashboard;