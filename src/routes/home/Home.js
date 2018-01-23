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
import s from './Home.css';
import Dayz from 'dayz';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import picker_style from 'react-datepicker/dist/react-datepicker.css';
import dayz_style from 'dayz/dist/dayz.css';
import Link from '../../components/Link';
import Lightbox from 'react-image-lightbox';
import PlacesWithStandaloneSearchBox from '../../components/Map/SearchBox';
import { connect } from 'react-redux';
import { setMapVariable } from '../../actions/map';
import {
  removeEvent,
  setTime,
  changeEventTime,
  fetchPhotos,
} from '../../actions/plan';
import { host } from '../../constants/';
import { setLightboxStatus, setSelectedActivity } from '../../actions/lightbox';
import { placesUrl, g_api_key, detailsUrl, photosUrl } from '../../constants';

const {
  SearchBox,
} = require('react-google-maps/lib/components/places/SearchBox');

let images = [
  'https://yt3.ggpht.com/-KdgJnz1HIdQ/AAAAAAAAAAI/AAAAAAAAAAA/4vVN7slJqj4/s900-c-k-no-mo-rj-c0xffffff/photo.jpg',
];

class Home extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      permalink: '',
      weather: '',
      photoIndex: 0,
    };
    this.handleDateSelect = this.handleDateSelect.bind(this);
    this.onCloseClick = this.onCloseClick.bind(this);
    this.generatePermaLink = this.generatePermaLink.bind(this);
    this.onEventResize = this.onEventResize.bind(this);
    this.onEventClick = this.onEventClick.bind(this);
  }

  onClose() {
    this.props.setLightBoxStatus(false);
  }

  handleDateSelect(date) {
    this.props.setSelectedTime(date);
  }

  onCloseClick(index) {
    alert(index);
    this.props.removeEvent(index);
  }

  onEventClick(ev, event) {
    console.log('CLICK');
    console.log(event.attributes.searchTerm);
    this.props.selectActivity(event.attributes.searchTerm);
    this.props.setLightBoxStatus(true);
  }

  generatePermaLink() {
    // will pass the plan to the server

    const url = 'http://localhost:3000/plan/';
    // console.log(this.props.mapped_restaurants);
    // console.log(this.props.events);

    console.log(
      this.props.location
        ? this.props.location[0].formatted_address
        : 'New York, NY, USA',
    );

    if (this.props.events.length == 0) {
      alert('no events to save');
    } else if (this.props.events.length > 0) {
      if (this.props.location && this.props.selected_time) {
        fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            city: this.props.location
              ? this.props.location[0].formatted_address
              : 'New York, NY, USA',
            date: this.props.selected_time.toISOString(),
            activities: this.props.events,
          }),
        })
          .then(res => res.json())
          .then(ans => this.setState({ permalink: host.concat(ans.link) }));
      }
    }
  }

  componentDidMount() {
    // TODO: set the current day to the day of the saved event
    if (this.props.events.length == 0 && this.props.saved_events != '') {
      const specifiedEvents = JSON.parse(this.props.saved_events)[0].activities;
      const startTime = moment(specifiedEvents[0].date);
      this.setState({ startDate: startTime });
    }

    // WEATHER
    // let location = this.props.location[0].formatted_address
    //   ? this.props.location[0].formatted_address
    //   : 'New York, NY, USA';
    // console.log("LOCATION");
    // console.log(location);
    // let fixedLocation = (location).replace(/ /g,"+");
    // let weather_url = 'http://api.openweathermap.org/data/2.5/forecast?q=' + fixedLocation +'&mode=json&APPID=84894b2f931242514ad4b3e74f9436d9';
    //
    // fetch(weather_url)
    //   .then((res) =>
    //   res.json())
    //   .then(json => {
    //     console.log(json);
    //   })
  }

  onEventResize(ev, event) {
    // const start = event.start().format('hh:mma');
    // const end = event.end().format('hh:mma');
    // console.log(event);
    // event.set({ content: `${event.attributes.id}` });

    // update the events start time and endtime
    this.props.changeEventTime(event.attributes.id, event.start(), event.end());
  }

  componentWillReceiveProps(newProps) {
    console.log('SECLECTED1');
    console.log(newProps);
    if (newProps.lightboxOpen && newProps.selectedActivity) {
      console.log('SECLECTED');
      console.log(newProps.selectedActivity);
      fetchPhotos(newProps.selectedActivity).then(res => {
        images = res;
        this.setState({
          photoIndex: (this.state.photoIndex + 1) % images.length,
        });
      });
    }
  }

  render() {
    // if there's some stuff in saved_events, it came from server so display it o.w display localcache stuff
    console.log(this.props);
    let specifiedEvents = this.props.events;
    // console.log(JSON.parse(this.props.saved_events));
    // let specifiedEvents = this.props.saved_events ? JSON.parse(this.props.saved_events).activities : this.props.events;
    const newEvents = [];

    if (this.props.events.length == 0 && this.props.saved_events != '') {
      specifiedEvents = JSON.parse(this.props.saved_events)[0].activities;
    }

    for (let i = 0; i < specifiedEvents.length; i++) {
      const event = specifiedEvents[i];
      newEvents.push({
        content: event.content,
        resizable: event.resizable,
        id: i,
        searchTerm: event.searchTerm,
        event_id: event.id,
        range: moment.range(moment(event.range.start), moment(event.range.end)),
      });
    }

    const events = new Dayz.EventsCollection(newEvents);

    console.log(this.props.location);
    this.props.location[0].geometry.location.lat;
    const lat =
      this.props.location &&
      typeof this.props.location[0].geometry.location.lat === 'function'
        ? this.props.location[0].geometry.location.lat()
        : this.props.location[0].geometry.location.lat;
    const lng =
      this.props.location &&
      typeof this.props.location[0].geometry.location.lng === 'function'
        ? this.props.location[0].geometry.location.lng()
        : this.props.location[0].geometry.location.lng;

    const { photoIndex } = this.state;

    return (
      <div className={s.root}>
        <div className={s.container}>
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
          <div className={s.action_bar_wrapper}>
            <h1>Your Current Plan</h1>
            <p>
              Search Location: <PlacesWithStandaloneSearchBox />
            </p>
          </div>
          <div className={s.action_bar_wrapper}>
            <button type="button" onClick={() => this.generatePermaLink()}>
              Generate Sharable Link
            </button>
            <div>Sharable Link: {this.state.permalink}</div>
            <div className={s.action_bar_wrapper}>
              <div className={s.date_text}>Select Date:</div>
              <DatePicker
                selected={this.props.selected_time}
                onChange={this.handleDateSelect}
              />
            </div>
          </div>
          <div className={s.action_bar_wrapper}>
            <h3>Food:</h3>
            <a href={`/food/breakfast?latitude=${lat}&longitude=${lng}`}>
              <button type="button">Add Breakfast</button>
            </a>
            <a href={`/food/brunch?latitude=${lat}&longitude=${lng}`}>
              <button type="button">Add Brunch</button>
            </a>
            <a href={`/food/lunch?latitude=${lat}&longitude=${lng}`}>
              <button type="button">Add Lunch</button>
            </a>
            <a href={`/food/dinner?latitude=${lat}&longitude=${lng}`}>
              <button type="button">Add Dinner</button>
            </a>
            <a href={`/food/dessert?latitude=${lat}&longitude=${lng}`}>
              <button type="button">Add Dessert</button>
            </a>
            <a href={`/food/romantic?latitude=${lat}&longitude=${lng}`}>
              <button type="button">Add Good Date Restaurants</button>
            </a>
          </div>
          <div className={s.action_bar_wrapper}>
            <h3>Stuff to do:</h3>
            <a href={`/food/nightlife?latitude=${lat}&longitude=${lng}`}>
              <button type="button">Add Nightlife</button>
            </a>
            <a href={`/food/bars?latitude=${lat}&longitude=${lng}`}>
              <button type="button">Add Bars</button>
            </a>
          </div>
        </div>

        <div className={s.timeline}>
          <Dayz
            display="day"
            date={this.props.selected_time}
            events={events}
            onCloseClick={this.onCloseClick}
            onEventResize={this.onEventResize}
            onEventClick={this.onEventClick}
          />
        </div>
      </div>
    );
  }
  // onEventClick={() => this.props.setLightBoxStatus(true)}
}

const mapStateToProps = state => ({
  location: state.map.location,
  events: state.plan.events,
  mapped_restaurants: state.mapped_restaurants,
  saved_events: state.saved_events,
  selected_time: moment(state.plan.time),
  lightboxOpen: state.lightbox.lightboxOpen,
  selectedActivity: state.lightbox.selectedActivity,
});

const mapDispatchToProps = dispatch => ({
  onMapChange: id => {
    dispatch(setMapVariable(id));
  },
  removeEvent: event => {
    dispatch(removeEvent(event));
  },
  setSelectedTime: time => {
    dispatch(setTime(time));
  },
  changeEventTime: (id, start, end) => {
    dispatch(changeEventTime(id, start, end));
  },
  setLightBoxStatus: status => {
    dispatch(setLightboxStatus(status));
  },
  selectActivity: activity => {
    dispatch(setSelectedActivity(activity));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(dayz_style, picker_style, s)(Home),
);
