import React, { Component } from 'react';

class FindKitty extends Component {
    constructor(props){
        super(props)
        this.state = {
            input: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e){
        this.setState({
            input: e.target.value
        })
    }

    handleSubmit(e, random) {
        // if (random) this.props.fetchRandom();
        this.props.fetch(this.state.input);
    }

    render() {
        return (
            <div className='find-kitty'>
                <h3>Kitty ID:</h3>
                <input type='text' placeholder='Find Kitty' value={this.state.input} onChange={this.handleChange}/>
                <button type='submit' onClick={this.handleSubmit}>Find Kitty</button>
                {/* <button type='submit' onClick={(e) => { this.handleSubmit.call(this, e, true) }}>Find Random Kitty</button> */}
            </div>
        )
    }
}

export default FindKitty;