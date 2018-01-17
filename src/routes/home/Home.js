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

const {
  SearchBox,
} = require('react-google-maps/lib/components/places/SearchBox');

class Home extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
    };
    this.handleDateSelect = this.handleDateSelect.bind(this);
  }

  handleDateSelect(date) {
    this.setState({
      startDate: date,
    });
  }

  render() {
    const newEvents = [];
    for (let i = 0; i < this.props.events.length; i++) {
      const event = this.props.events[i];
      newEvents.push({
        content: event.content,
        resizable: event.resizable,
        range: moment.range(moment(event.range.start), moment(event.range.end)),
      });
    }

    const events = new Dayz.EventsCollection(newEvents);
    // if (this.props.location) {

    console.log('LOCATION');
    console.log(this.props.location);
    const lat = this.props.location
      ? this.props.location[0].geometry.location.lat()
      : '41';
    const lng = this.props.location
      ? this.props.location[0].geometry.location.lng()
      : '-71';

    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.action_bar_wrapper}>
            <h1>Your Current Plan</h1>
            <h1>
              Search Near: <PlacesWithStandaloneSearchBox />
            </h1>
          </div>
          <div className={s.action_bar_wrapper}>
            <div>Permalink: www.fake.com</div>
            <div className={s.action_bar_wrapper}>
              <div className={s.date_text}>Date:</div>
              <DatePicker
                selected={this.state.startDate}
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
          <Dayz display="day" date={this.state.startDate} events={events} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  location: state.map.location,
  events: state.plan.events,
});

const mapDispatchToProps = dispatch => ({
  onMapChange: id => {
    dispatch(setMapVariable(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(dayz_style, picker_style, s)(Home),
);
