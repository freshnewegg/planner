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
import PlacesWithStandaloneSearchBox from '../../components/Map/SearchBox';
import { connect } from 'react-redux';
import { setMapVariable } from '../../actions/map';
import { removeEvent, setTime } from '../../actions/plan';
import { host } from '../../constants/';

const {
  SearchBox,
} = require('react-google-maps/lib/components/places/SearchBox');

class Home extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      permalink: '',
    };
    this.handleDateSelect = this.handleDateSelect.bind(this);
    this.onCloseClick = this.onCloseClick.bind(this);
    this.generatePermaLink = this.generatePermaLink.bind(this);
  }

  handleDateSelect(date) {
    this.props.setSelectedTime(date);
  }

  onCloseClick(index) {
    this.props.removeEvent(index);
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

    if (this.props.events.length > 0) {
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
        event_id: event.id,
        range: moment.range(moment(event.range.start), moment(event.range.end)),
      });
    }

    const events = new Dayz.EventsCollection(newEvents);
    // if (this.props.location) {

    const lat =
      this.props.location && this.props.location[0].geometry.location.lat
        ? this.props.location[0].geometry.location.lat
        : '41';
    const lng =
      this.props.location && this.props.location[0].geometry.location.lng
        ? this.props.location[0].geometry.location.lng
        : '-71';

    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.action_bar_wrapper}>
            <h1>Your Current Plan</h1>
            <h1>
              Set Search Location: <PlacesWithStandaloneSearchBox />
            </h1>
          </div>
          <div className={s.action_bar_wrapper}>
            <button type="button" onClick={() => this.generatePermaLink()}>
              Generate Permalink
            </button>
            <div>Permalink: {this.state.permalink}</div>
            <div className={s.action_bar_wrapper}>
              <div className={s.date_text}>Date:</div>
              <DatePicker
                selected={this.props.selected_time}
                onChange={this.handleDateSelect}
              />
            </div>
            <div>Weather</div>
          </div>
          <div className={s.action_bar_wrapper}>
            <a href={`/food/breakfast?latitude=${lat}&longitude=${lng}`}>
              <button type="button">Add Breakfast</button>
            </a>
          </div>
        </div>

        <div className={s.timeline}>
          <Dayz
            display="day"
            date={this.props.selected_time}
            events={events}
            onCloseClick={this.onCloseClick}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  location: state.map.location,
  events: state.plan.events,
  mapped_restaurants: state.mapped_restaurants,
  saved_events: state.saved_events,
  selected_time: moment(state.plan.time),
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
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(dayz_style, picker_style, s)(Home),
);
