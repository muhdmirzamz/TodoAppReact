import React from 'react'

import axios from 'axios'
import { format } from 'date-fns'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      listFieldText: '', 
      todoFieldText: '', 
      lists: {}, 
      todos: {}, 
      selectedListId: ''
    }

    this.onChangeListFieldText = this.onChangeListFieldText.bind(this)
    this.onChangeTodoFieldText = this.onChangeTodoFieldText.bind(this)
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
        // returns as an object that is made up of a list of key (key is the list id) + value (value is the list name - being an object)
        console.log(`lists: ${response.data}`)

        let todoListIds = Object.keys(response.data)         

        // just make sure we have something in the array
        if (todoListIds.length > 0) {

          // set the list id to start off at the first element
          var id = todoListIds[0]
          console.log("Current list id: " + id)

          this.setState({lists: response.data, selectedListId: id})



          axios.get(`/getTodos`, {
            params: {
              listId: id
            }
          }).then(response => {
            if (response.status === 200) {
              console.log(response.data)
      
              // returns as an object that is made up of a list of key + value (value being an object)
              console.log(`todos: ${JSON.stringify(response.data)}`)
      
              this.setState({todos: response.data})

            } else {
              alert("Oops something went wrong!")
            }
          })
        }
      } else {
        console.log("response is not 200")
      }
    })
  }

  onChangeListFieldText(event) {
    this.setState({listFieldText: event.target.value})
  }

  onChangeTodoFieldText(event) {
    this.setState({todoFieldText: event.target.value})
  }

  onClickListItem(event) {

    // get the selected index
    var selectedIndex = document.getElementById("lists").selectedIndex;

    
    // get the key at the selected index
    // our list has the key inside but it does not have a "property" attached to it 
    // it's just {kjvskjvnvla: listName: 'test'}

    // var keyAtSelectedIndex = Object.keys(this.state.lists)[selectedIndex]

    // get the listName from the list object (you are accessing an object's key)
    
    // var listName = this.state.lists[keyAtSelectedIndex].listName


    // selected index == selected key's index
    var listId = Object.keys(this.state.lists)[selectedIndex]

    this.setState({selectedListId: listId})


    axios.get(`/getTodos`, {
      params: {
        listId: listId
      }
    }).then(response => {
      if (response.status === 200) {
        console.log(response.data)

        // returns as an object that is made up of a list of key + value (value being an object)
        console.log(`todos: ${JSON.stringify(response.data)}`)

        this.setState({todos: response.data})
        // this.setState({todos: response.data})



        // var newLists = {...this.state.lists}
        // newLists[response.data] = {listName: this.state.listFieldText}

        // spread operator syntax to copy an object and add an item to it
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax

        // const newTodos = {
        //   ...this.state.todos,
        //   [response.data]: {todoItem: this.state.todoFieldText}
        // }

        // this.setState({lists: newLists, listFieldText: ''})
      } else {
        alert("Oops something went wrong!")
      }
    })

  }

  onListSubmit(event) {
    axios.post("/addList", {listName: this.state.listFieldText}).then((response) => {
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


  onTodoSubmit(event) {
    var timestamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss.sss')

    axios.post("/addTodo", {todoItem: this.state.todoFieldText, listId: this.state.selectedListId, timestamp: timestamp}).then((response) => {
      console.log("Add items status: " + response.status)

      if (response.status === 200) {
        // new key is in response.data
        alert(response.data)

        var newTodos = {...this.state.todos}
        newTodos[response.data] = {timestamp: timestamp, todoItem: this.state.todoFieldText}


        this.setState({todos: newTodos, todoFieldText: ''})

        // spread operator syntax to copy an object and add an item to it
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax

        // const newTodos = {
        //   ...this.state.todos,
        //   [response.data]: {todoItem: this.state.todoFieldText}
        // }

        // this.setState({lists: newLists, listFieldText: ''})
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
        {/* Add list */}
          <form onSubmit={this.onListSubmit}>
            <label>Add list: </label>
            <input type='text' value={this.state.listFieldText} onChange={this.onChangeListFieldText} />

            <input type='submit' value='Submit' />
          </form>


          {/* display list */}
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

          {/* Choose list */}
          <label htmlFor="lists">Choose a list:</label>

          <select name="lists" id="lists" onChange={this.onClickListItem}>
            {
              Object.keys(this.state.lists).map((key) => {
                return <option key={key} value={this.state.lists[key].listName}> {this.state.lists[key].listName} </option>
              })
            }
          </select>



          {/* Add todo */}
          <form onSubmit={this.onTodoSubmit}>
            <label>Add todo: </label>
            <input type='text' value={this.state.todoFieldText} onChange={this.onChangeTodoFieldText} />

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

          <ul>
            {
              Object.keys(this.state.todos).map((key) => {
                // using a sub component to avoid re-render
                // https://stackoverflow.com/a/29810951
                return <ListItem key={key} itemKey={key} deleteFunction={this.onDelete} value={this.state.todos[key].todoItem} />
              })
            }
          </ul>

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