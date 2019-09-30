import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './components/layout/Header'
import './App.css';
import Todos from './components/Todos' ;
import AddTodo from './components/AddTodo' ;
import About from './components/pages/About'
//mport uuid from 'uuid' ; -- not needed since i used an api
import axios from 'axios';


class App extends Component {
  state = {
    todos: [    ]
  }

componentDidMount() {
  axios.get('https://jsonplaceholder.typicode.com/todos?_limit=9')
    .then(res => this.setState({todos: res.data}))
}

//Toggle complete
  markComplete =(id) => {
    this.setState({todos: this.state.todos.map(todo =>{
      if(todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
      }
    )});
  }

  //Delete todo
  delTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res =>
    this.setState({todos: [...this.state.todos.filter(todo => todo.id !== id)]}));
  }


  //AddTodo. the spread operator used to make a copy of it. 
   addTodo=(title) =>{
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title: title,
      completed: false
    })
      .then(res => this.setState({ todos: [...this.state.todos, res.data] }));
    }

  render () {
    return (
      <Router>
      <div className="App">
        <div className='container'>
          <Header />
          <Route exact path='/' render = {props =>(  //exact is needed in order not to have the index page showing in the about page.
            <React.Fragment>
              <AddTodo addTodo={this.addTodo}/>
              <Todos todos={this.state.todos} markComplete = {this.markComplete} 
              delTodo={this.delTodo}
          />
            </React.Fragment>
          ) }  />
          <Route path='/about' component={About} />

      </div>
     </div>
     </Router>
   );
  }
}  

export default App;
