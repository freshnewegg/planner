import React from 'react';

const { compose, withProps, lifecycle } = require('recompose');
const { withScriptjs } = require('react-google-maps');
const {
  StandaloneSearchBox,
} = require('react-google-maps/lib/components/places/StandaloneSearchBox');

import s from './Map.css';
import { setMapVariable } from '../../actions/map';
import { connect } from 'react-redux';

const PlacesWithStandaloneSearchBox = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyB7Xvojsa3NI5BrS3wwNjfpU4mAG5Ewmqk&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        places: [],
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();

          this.setState({
            places,
          });

          // set the changed map location
          console.log('CHANGE');
          console.log(places);
          this.props.onMapChange(places);
        },
      });
    },
  }),
  withScriptjs,
)(props => (
  <div className={s.searchbox}>
    <StandaloneSearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        defaultValue="New York"
        placeholder="New York, Boston, San Fran..."
        style={{
          boxSizing: `border-box`,
          border: `1px solid`,
          width: `240px`,
          height: `32px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
      />
    </StandaloneSearchBox>
  </div>
));

const mapStateToProps = state => ({
  location: state.location,
});

const mapDispatchToProps = dispatch => ({
  onMapChange: id => {
    dispatch(setMapVariable(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(
  PlacesWithStandaloneSearchBox,
);
