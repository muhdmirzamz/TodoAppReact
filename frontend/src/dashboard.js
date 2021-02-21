import React from 'react';

import axios from 'axios'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {todoFieldText: '', todos: {}}

    this.onChangeTodoFieldText = this.onChangeTodoFieldText.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onDelete = this.onDelete.bind(this)

    console.log("performing get request")
  }

  componentDidMount() {
    axios.get("/getItems").then((response) => {
      console.log("Get items status: " + response.status)

      if (response.status === 200) {
        console.log(response.data)

        this.setState({todos: response.data})
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

  onDelete(key) {
    alert("Deleted: " + key)

    var obj = this.state.todos
    delete obj[key] // delete a key from an object
    this.setState({todos: obj})


    // needs to specify an extra 'params' key
    // read the whole issue/thread
    // https://github.com/axios/axios/issues/736
    // https://github.com/axios/axios/issues/736#issuecomment-307209067
    axios.delete("/deleteItem", {params: {item: key}}).then((response) => {
      console.log("Add items status: " + response.status)

      if (response.status === 200) {
        console.log(response.data)
      }
    })
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
                // using a sub component to avoid re-render
                // https://stackoverflow.com/a/29810951
                return <ListItem key={key} itemKey={key} deleteFunction={this.onDelete} value={this.state.todos[key].todoItem} />
              })
            }
          </ul>
      </div>
    )
  }
}

class ListItem extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {

    // https://stackoverflow.com/questions/39226757/react-passing-parameter-with-arrow-function-in-child-component
    // you are not passing down the argument through the prop itself
    // you are passing down the function and the argument as the prop
    return (
      <div>
        <li>{this.props.value}</li>
        <button onClick={() => this.props.deleteFunction(this.props.itemKey)}>Delete</button>
      </div>
    )
  }
}


export default Dashboard;