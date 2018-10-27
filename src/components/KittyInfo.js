import React, { Component } from 'react';
class KittyInfo extends Component {
    render() {
        const {error, info} = this.props;
        if (error) return <div className='error'>{error}</div>
        return (
            <div className='kitty-info'>
                {info.map((obj) => {
                    const { title, description } = obj
                    return (
                        <div key={title}>
                            <h3>{title}</h3>
                            {description}
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default KittyInfo;