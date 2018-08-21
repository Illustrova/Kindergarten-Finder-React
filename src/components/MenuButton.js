import React, { Component } from 'react';

class MenuButton extends Component {
    render() {
        return(
            <button type="button" className="navbar-toggler tooltip" aria-label="Open" onClick={this.props.openCloseMenu}>
                <span className="navbar-toggler-bar bar1"></span>
                <span className="navbar-toggler-bar bar2"></span>
                <span className="navbar-toggler-bar bar3"></span>
                <span className="tooltiptext position">Expand Side Panel</span>
              </button>
        )
	}
}

export default MenuButton;