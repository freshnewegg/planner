/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './FoodList.css';
import Map from '../../components/Map/map';
import tablecss from 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { connect } from 'react-redux';
import BasicTable from '../../components/Layout/basic-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Col, Panel } from 'react-bootstrap';
import Lightbox from 'react-image-lightbox';
import { setLightboxStatus } from '../../actions/lightbox';
import { pics_host } from '../../constants/index';

let images = [
  'https://yt3.ggpht.com/-KdgJnz1HIdQ/AAAAAAAAAAI/AAAAAAAAAAA/4vVN7slJqj4/s900-c-k-no-mo-rj-c0xffffff/photo.jpg',
];

class FoodList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoIndex: 0,
    };
  }
  static propTypes = {};

  componentWillReceiveProps(newProps) {
    if (newProps.lightboxOpen) {
      const newUrl = `${pics_host}?selected_activity=${newProps.selectedActivity.replace(
        / /g,
        '+',
      )}`;
      fetch(newUrl)
        .then(res => res.json())
        .then(res => {
          images = res.images;
          this.setState({
            photoIndex: (this.state.photoIndex + 1) % images.length,
          });
        });
    }
  }

  onClose() {
    this.props.setLightBoxStatus(false);
  }

  render() {
    // console.log(this.props);
    // console.log(this.props.restaurants);
    const places = [];
    if (this.props.restaurants) {
      for (let i = 0; i < this.props.restaurants.businesses.length; i++) {
        const place = this.props.restaurants.businesses[i];
        const types = place.categories.map(alias => alias.title);
        places.push({
          name: place.name,
          type: types.join(),
          rating: place.rating,
          price: place.price,
          address: place.location.address1,
          hours: place.is_closed ? 'Closed' : 'Open',
          website: place.url,
          id: 'ADD',
        });
      }
    }
    // id: place.id,

    const { photoIndex } = this.state;

    return (
      <div className={s.root}>
        <div className={s.container}>
          <Map />
          <h1>Choose Breakfast</h1>
          {this.props.lightboxOpen && (
            <Lightbox
              mainSrc={images[photoIndex]}
              nextSrc={images[(photoIndex + 1) % images.length]}
              prevSrc={images[(photoIndex + images.length - 1) % images.length]}
              onCloseRequest={() => this.onClose()}
              onMovePrevRequest={() =>
                this.setState({
                  photoIndex: (photoIndex + images.length - 1) % images.length,
                })
              }
              onMoveNextRequest={() =>
                this.setState({
                  photoIndex: (photoIndex + 1) % images.length,
                })
              }
            />
          )}
          <Col md={15}>
            <Panel header="A basic react-bootstrap-table">
              <BasicTable restaurants={places} />
            </Panel>
          </Col>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  location_lat: state.map.location ? state.map.location.lat : null,
  restaurants: state.restaurants,
  mapped_restaurants: state.mapped_restaurants,
  lightboxOpen: state.lightbox.lightboxOpen,
  selectedActivity: state.lightbox.selectedActivity,
});

const mapDispatchToProps = dispatch => ({
  setLightBoxStatus: status => {
    dispatch(setLightboxStatus(status));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(s, tablecss)(FoodList),
);
