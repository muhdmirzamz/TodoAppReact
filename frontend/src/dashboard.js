import React from 'react'

import axios from 'axios'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {listFieldText: '', todoFieldText: '', lists: {}, todos: {}, listId: ''}

    this.onChangelistFieldText = this.onChangelistFieldText.bind(this)
    this.onClickListItem = this.onClickListItem.bind(this)

    this.onListSubmit = this.onListSubmit.bind(this)
    this.onTodoSubmit = this.onTodoSubmit.bind(this)
    
    this.onDelete = this.onDelete.bind(this)

    this.onSignout = this.onSignout.bind(this)
  }

  componentDidMount() {
    axios.get("/getLists").then((response) => {
      console.log("Get items status: " + response.status)

      if (response.status === 200) {
        console.log(response.data)

        // set the list id to start off at the first element
        var id = Object.keys(response.data)[0]

        this.setState({lists: response.data, listId: id})
        // this.setState({todos: response.data})
      } else {
        console.log("response is not 200")
      }
    })
  }

  onChangelistFieldText(event) {
    this.setState({listFieldText: event.target.value})
  }

  onClickListItem(event) {
    var selectedIndex = document.getElementById("lists").selectedIndex;

    
    // our list has the key inside but it does not have a "property" attached to it 
    // it's just {kjvskjvnvla: listName: 'test'}
    var keyAtSelectedIndex = Object.keys(this.state.lists)[selectedIndex]
    var listName = this.state.lists[keyAtSelectedIndex].listName

    // a way to get item at selected index in Javascript Objects
    // Object.keys by iself produces an array of keys
    var key = Object.keys(this.state.lists)[selectedIndex]

    alert(key + " " + listName)
  }

  onTodoSubmit(event) {
    axios.post("/addTodo", {item: this.state.listFieldText}).then((response) => {
      console.log("Add items status: " + response.status)

      if (response.status === 200) {
        // new key is in response.data
        alert(response.data)

        var newLists = {...this.state.lists}
        newLists[response.data] = {listName: this.state.listFieldText}

        // spread operator syntax to copy an object and add an item to it
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax

        // const newTodos = {
        //   ...this.state.todos,
        //   [response.data]: {todoItem: this.state.todoFieldText}
        // }

        this.setState({lists: newLists, listFieldText: ''})
      } else {
        alert("Oops something went wrong!")
      }
    })
  }

  onListSubmit(event) {
    axios.post("/addList", {item: this.state.listFieldText}).then((response) => {
      console.log("Add items status: " + response.status)

      if (response.status === 200) {
        // new key is in response.data
        alert(response.data)

        var newLists = {...this.state.lists}
        newLists[response.data] = {listName: this.state.listFieldText}

        // spread operator syntax to copy an object and add an item to it
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax

        // const newTodos = {
        //   ...this.state.todos,
        //   [response.data]: {todoItem: this.state.todoFieldText}
        // }

        this.setState({lists: newLists, listFieldText: ''})
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

  onSignout(event) {
    axios.get("/signout").then((response) => {
      if (response.status === 200) {
        console.log(response.data)

        alert('Sign out successfully')

        this.props.history.push('/')
      }
    })
  }

  render() {
    return(
      <div>
          <form onSubmit={this.onListSubmit}>
            <label>Add list: </label>
            <input type='text' value={this.state.listFieldText} onChange={this.onChangelistFieldText} />

            <input type='submit' value='Submit' />
          </form>

          Lists:
          <ul>
            {
              Object.keys(this.state.lists).map((key) => {
                // using a sub component to avoid re-render
                // https://stackoverflow.com/a/29810951
                return <ListItem key={key} itemKey={key} deleteFunction={this.onDelete} value={this.state.lists[key].listName} />
              })
            }
          </ul>

          <label htmlFor="lists">Choose a list:</label>

          <select name="lists" id="lists" onChange={this.onClickListItem}>
            {
              Object.keys(this.state.lists).map((key) => {
                return <option key={key} value={this.state.lists[key].listName}> {this.state.lists[key].listName} </option>
              })
            }
          </select>


          <form onSubmit={this.onTodoSubmit}>
            <label>Add todo: </label>
            <input type='text' value={this.state.listFieldText} onChange={this.onChangelistFieldText} />

            <input type='submit' value='Submit' />
          </form>



          {/* <ul>
            {
              Object.keys(this.state.lists).map((key) => {
                // using a sub component to avoid re-render
                // https://stackoverflow.com/a/29810951
                return <ListItem key={key} itemKey={key} deleteFunction={this.onDelete} value={this.state.lists[key].listName} />
              })
            }
          </ul> */}

          <input type='button' onClick={this.onSignout} value='Sign out' />
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