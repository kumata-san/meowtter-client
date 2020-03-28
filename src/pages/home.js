import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Meow from '../components/meow/Meow';
import Profile from '../components/profile/Profile';
import MeowSkeleton from '../util/MeowSkeleton';

import { connect } from 'react-redux';
import { getMeows } from '../redux/actions/dataActions';

class home extends Component {
  componentDidMount() {
    this.props.getMeows();
  }
  render() {
    const { meows, loading } = this.props.data;
    let recentMeowsMarkup = !loading ? (
      meows.map((meow) => <Meow key={meow.meowId} meow={meow} />)
    ) : (
      <MeowSkeleton />
    );
    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {recentMeowsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getMeows: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getMeows }
)(home);
