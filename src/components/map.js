import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  constructor () {
    super ()
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
  }
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
  componentWillReceiveProps () {
    this.setState ({
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    })
  }
  render() {
    let selectedCity = this.props.selectedCity[0]
    return (
      <Map
        google={this.props.google}
        zoom={5}
        style={mapStyles}
        initialCenter={{
          lat: selectedCity.Latitude,
          lng: selectedCity.Longitude
        }}
        center={{
         lat: selectedCity.Latitude,
         lng: selectedCity.Longitude
        }}
      >
        <Marker
          onClick={this.onMarkerClick}
          name={`${selectedCity.Name},\n${selectedCity.howBig()}`}
          position={{lat: selectedCity.Latitude, lng: selectedCity.Longitude}}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCJoTvRx5ID8YuCXPE1UHC-p0ZKJVWO-Uk'
})(MapContainer);