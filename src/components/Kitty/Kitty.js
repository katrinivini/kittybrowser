import React, { Component } from 'react';
import './Kitty.css'

class Kitty extends Component {
    isEmpty(obj) {
        return !obj || Object.keys(obj).length === 0
    }

    render() {
        const {error, data, isLoading} = this.props.result;
        if (error) return <div className='error'>{error}</div>
        if (isLoading) return <div className='loading-kitty'>Loading...</div>
        return (
            !this.isEmpty(data) && 
            <div className='card'>
                <div className='meta'>
                    {data.meta.map((obj) => {
                        const { title, description } = obj
                        return (
                            <div key={title}>
                                <h4>{title}</h4>
                                {description}
                            </div>
                        )
                    })}
                </div>
                <img 
                    className='avatar'
                    alt="Kitty"
                    src={data.media.imageURL}
                />
            </div>
        )
    }
}

export default Kitty;