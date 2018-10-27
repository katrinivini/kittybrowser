import React, { Component } from 'react';
import './FindKitty.css'

class FindKitty extends Component {
    constructor(props){
        super(props)
        this.state = {
            input: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    handleChange(e){
        this.setState({
            input: e.target.value
        })
    }

    handleSubmit() {
        this.props.searchKitty(this.state.input);
    }

    handleClick() {
        this.setState({ input: "" })
        this.props.searchRandomKitty()
    }


    render() {
        return (
            <div className='find-kitty'>
                <h4>Kitty ID:</h4>
                <div>
                    <input type='text' placeholder='Find Kitty' value={this.state.input} onChange={this.handleChange}/>
                    <button type='button' onClick={this.handleSubmit}>Find</button>
                    <button type='button' onClick={this.handleClick}>Random</button>
                </div>
            </div>
        )
    }
}

export default FindKitty;