import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
// import ActionCreator from '../actions';

class Chat extends Component {
  constructor(props, context) {
    super(props, context);
    console.log("CHAT 시작");
  }

  render() {
    return (
      <View>
        <Text>chat message</Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    count: state.count
  };
}

function mapDispatchToProps(dispatch) {
  return {
    countUp: (num) => {
      dispatch(ActionCreator.countUp(num));
    },
    countDown: (num) => {
      dispatch(ActionCreator.countDown(num));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);