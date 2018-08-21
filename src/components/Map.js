import React, {Component} from 'react';
import Menu from './Menu';
import escapeRegExp from 'escape-string-regexp';
// import sortBy from 'sort-by'
import places from '../espa.json';
import * as iw from './infowindow';
import * as FbAPI from '../FacebookAPI';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            map: {loading: true},
            infoWindow: {},
            query: '',
            fbdata: [],
            places: places,
        };
        this.initMap = this.initMap.bind(this);
        this.addMarker = this.addMarker.bind(this);
    }
    componentDidMount() {
        window.initMap = this.initMap;

        loadJS(
            'https://maps.googleapis.com/maps/api/js?key=AIzaSyAj8PNN-j_DmA5HBTEl_Hwj-seBJratpaA&callback=initMap',
        );
    }
    componentDidUpdate() {
        //add bounds
        const {places, map} = this.state;
        if (!map.loading) {
            let bounds = new window.google.maps.LatLngBounds();
            places.forEach(p => {
                if (p.marker) {
                    bounds.extend(p.marker.position);
                    map.fitBounds(bounds);
                }
            });
        }
    }

    initMap() {
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: 37.971816, lng: 23.725774},
            zoom: 14,
        });

        //Default content - spinner, displayed while loading data
        const infoWindow = new window.google.maps.InfoWindow({
            content:
                '<i class="fas fa-spinner fa-spin" style="color: darkgrey;"></i>',
        });

        this.setState({map, infoWindow});
        this.state.places.forEach(place => {
            this.addMarker(this.state.map, place);
        });
    }

    updateQuery = query => {
        this.setState({query: query});
        const {places} = this.state;
        //filter places/markers
        places.forEach(place => {
            if (
                place.marker.title.toLowerCase().indexOf(query.toLowerCase()) >=
                0
            ) {
                place.marker.setVisible(true);
            } else {
                place.marker.setVisible(false);
            }
        });

        this.setState({places: places});
    };

    addMarker = (map, place) => {
        let {places} = this.state;
        //add marker
        if (!map.loading) {
            const marker = new window.google.maps.Marker({
                position: {
                    lat: place.coordinates.lat,
                    lng: place.coordinates.long,
                },
                map,
                text: place.type,
                title: place.name,
                animation: window.google.maps.Animation.DROP,
            });
            this.openInfoWindow(map, marker, place);
            //animation marker bounce on mouseover
            marker.addListener('mouseover', function() {
                this.setAnimation(window.google.maps.Animation.BOUNCE);
                setTimeout(() => this.setAnimation(null), 400);
            });
            place.marker = marker;
            this.setState({places: places});
        }
    };

    openInfoWindow = (map, marker, place) => {
        //open infoWindow content on marker click
        marker.addListener('click', e => {
            this.state.map.panTo(marker.getPosition());
            let loadedData = this.state.fbdata.find(
                obj => obj.code === place.code,
            );
            let fbData;
            if (loadedData !== undefined) {
                this.state.infoWindow.setContent(
                    iw.createContent(marker, place, loadedData),
                );
                this.state.infoWindow.setOptions({maxWidth: 450});
            } else {
                FbAPI.getData(
                    '1451607965076725|jFLo4cg3vJDaEV8Xns-Jgcc0VfU',
                    place,
                ).then(fbData => {
                    let stateDataCopy = this.state.fbdata;
                    stateDataCopy.push(fbData);
                    this.setState({fbdata: stateDataCopy});
                    this.state.infoWindow.setContent(
                        iw.createContent(marker, place, fbData),
                    );
                    this.state.infoWindow.setOptions({maxWidth: 400});
                });
            }

            // this.state.infoWindow.setContent(Infowindow().toString())
            this.state.infoWindow.open(map, marker);
        });
    };

    render() {
        const {query} = this.state;
        //get the filter query to filter the listitems
        let filteredLocations;
        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i');
            filteredLocations = places.filter(place =>
                match.test(place.marker.title),
            );
        } else {
            filteredLocations = places;
        }
        const style = {
            width: '100vw',
            height: '100vh',
        };
        return (
            <React.Fragment>
                <nav>
                    <Menu
                        openInfoWindow={this.openInfoWindow}
                        updateQuery={this.updateQuery}
                        query={this.state.query}
                        map={this.state.map}
                        filteredLocations={filteredLocations}
                        place={this.state.places}
                        fbdata={this.state.fbdata}
                        infoWindow={this.state.infoWindow}
                        openCloseMenu={this.props.openCloseMenu}
                    />
                </nav>
                <main>
                    <div className="map-container">
                        <div className="container" role="main">
                            <div className="map-container">
                                <div
                                    id="map"
                                    style={style}
                                    role="application"
                                />
                            </div>
                        </div>
                    </div>
                </main>
            </React.Fragment>
        );
    }
}

function loadError() {
    alert('Could not load JavaScript file for Maps API');
}

function loadJS(url, onloadFunction) {
    var newScript = document.createElement('script');
    newScript.onerror = loadError;
    if (onloadFunction) {
        newScript.onload = onloadFunction;
    }
    document.head.appendChild(newScript);
    newScript.src = url;
}

export default Map;