import React from 'react';
import logo from './logo.svg';

import axios from 'axios'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {todoFieldText: '', todos: {}}

    this.onChangeTodoFieldText = this.onChangeTodoFieldText.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    console.log("performing get request")
  }

  componentDidMount() {
    axios.get("/getItems").then((response) => {
      console.log("Get items status: " + response.status)

      if (response.status === 200) {
        console.log(response.data)

        this.setState({todos: response.data})

        Object.keys(this.state.todos).map((keys) => {
          console.log(this.state.todos[keys].todoItem)
        })
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
        // new key is in response.data
        alert(response.data)

        var newTodos = this.state.todos
        newTodos[response.data] = {todoItem: this.state.todoFieldText}

        // spread operator syntax to copy an object and add an item to it
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax

        // const newTodos = {
        //   ...this.state.todos,
        //   [response.data]: {todoItem: this.state.todoFieldText}
        // }

        this.setState({todos: newTodos, todoFieldText: ''})
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

          <ul>
            {
              Object.keys(this.state.todos).map((key) => {
                return <li key={key}>{this.state.todos[key].todoItem}</li>
              })
            }
          </ul>
      </div>
    )
  }
}


export default Dashboard;