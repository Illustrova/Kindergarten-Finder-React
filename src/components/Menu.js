import React, { Component } from 'react';
import MenuItem from './Menuitem'

class Menu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeItem: null,
        };
        this.setActiveTab = this.setActiveTab.bind(this)
    }

    isActive = (code) => this.state.activeItem === code

    setActiveTab = (activeItemCode) => {
        this.setState({ activeItem: activeItemCode });
    }

    render() {
        const {map,infoWindow} = this.props;
        return(
        <div className="side-menu">
            <div className="searchbox">
                <input type="text" className="search" tabIndex="1" aria-label="Search" role="textbox" placeholder="Filter Locations..."
                value={this.props.query}
                onChange={(event) => this.props.updateQuery(event.target.value)}
                />
                <i className="fas fa-search"></i>
            </div>
            <ul className="places">
            {this.props.filteredLocations.map((place) => (
                <MenuItem
                    key={place.code}
                    map={map}
                    place={place}
                    isActive={this.isActive(place.code)}
                    onActiveTab={() => this.setActiveTab(place.code)}
                    />
                ))}
            </ul>
        </div>
        )
}

}

export default Menu;