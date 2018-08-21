import React, { Component } from 'react';

class MenuItem extends Component {
    render(){
        const {place} = this.props;

        return(
            <li className="item"
                tabIndex="2"
                role="button"
                className={this.props.isActive ? 'item active': 'item'}
                onClick={(e) => {
                    this.props.onActiveTab();
                    new window.google.maps.event.trigger( place.marker, 'click' );
                }}>
                <i className="fas fa-hotel"></i>
                <div className="item-title">{place.shortName}</div>
                <b className="caret"></b>
            </li>
        )
    }
}

export default MenuItem;