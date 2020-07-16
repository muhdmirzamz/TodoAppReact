import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';

import axios from "axios"
import * as serviceWorker from './serviceWorker';

class Pages extends React.Component {
  constructor(props) {
    super(props)

    this.state = {arr: []}
  }

  componentDidMount() {
    // axios.get("/randArr").then( (response) => {
    //     console.log(response)

    //     this.setState({arr: response.data})
    //   } 
    // )


    axios.post("/user", {firstName: 'Fred', lastName: 'Flint'}).then((response) => {
      console.log(response)
    })
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.arr.map((item) => (
            <li>
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(
  <Pages />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
