import React, { Component } from 'react';
import PropTypes from 'prop-types';

// usually wanna have input fields as state for that component. THIS IS A COMPONENT LEVEL STATE
export class AddTodo extends Component {

    state = {
        title: ''
    }

    onChange= (e) => this.setState({title: e.target.value}); //sets the value to whatever I type in
    onSubmit=(e) => {
        e.preventDefault();
        this.props.addTodo(this.state.title);
        this.setState({title: ''});
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} style = {{display: 'flex'}}>
                <input 
                type='text'
                name='title' 
                style = {{flex: '10', padding: '5px'}}
                placeholder='Add Todo ...'
                value= {this.state.title}
                onChange={this.onChange}
                />
                <input
                    type='submit'
                    value='Submit'
                    className='btn'
                    style={{flex: '1'}}
                />    
            </form>
        )
    }
}

//Proptypes
AddTodo.propTypes = {
    addTodo: PropTypes.object.isRequired,
}


export default AddTodo
