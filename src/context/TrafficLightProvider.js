// TrafficLightProvider.js

import React, { useReducer, useEffect } from 'react';
import TrafficLightContext from './TrafficLightContext';

const initialState = {
  currentLight: 'green',
  pedestrianRequest: false,
  emergencyOverride: false,
  countdown: 10,
  extraRedTime: false,  // New state to track if the extra 5 seconds are being applied
};

const trafficLightReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_LIGHT':
      return { ...state, currentLight: action.payload, countdown: action.countdown, extraRedTime: false };
    case 'REQUEST_CROSSING':
      return { ...state, pedestrianRequest: true };
    case 'RESET_CROSSING':
      return { ...state, pedestrianRequest: false };
    case 'EMERGENCY_OVERRIDE':
      return { ...state, emergencyOverride: true };
    case 'RESET_EMERGENCY':
      return { ...state, emergencyOverride: false };
    case 'DECREMENT_TIMER':
      return { ...state, countdown: state.countdown - 1 };
    case 'ADD_EXTRA_RED_TIME':
      return { ...state, extraRedTime: true, countdown: 5 };  // Add extra 5 seconds to the countdown
    default:
      return state;
  }
};

const TrafficLightProvider = ({ children }) => {
  const [state, dispatch] = useReducer(trafficLightReducer, initialState);

  useEffect(() => {
    let interval;
    if (!state.emergencyOverride) {
      interval = setInterval(() => {
        if (state.countdown > 0) {
          dispatch({ type: 'DECREMENT_TIMER' });
        } else {
          changeLight();
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [state.currentLight, state.countdown, state.emergencyOverride]);

  const changeLight = () => {
    if (state.pedestrianRequest && state.currentLight === 'green') {
      dispatch({ type: 'CHANGE_LIGHT', payload: 'yellow', countdown: 3 });
    } else if (state.pedestrianRequest && state.currentLight === 'yellow') {
      dispatch({ type: 'CHANGE_LIGHT', payload: 'red', countdown: 12 });  // Red for vehicles
    } else if (state.pedestrianRequest && state.currentLight === 'red' && state.countdown === 0 && !state.extraRedTime) {
      dispatch({ type: 'ADD_EXTRA_RED_TIME' });  // Add extra 5 seconds
    } else if (state.extraRedTime && state.countdown === 0) {
      dispatch({ type: 'RESET_CROSSING' });
      dispatch({ type: 'CHANGE_LIGHT', payload: 'green', countdown: 10 });  // Return to green after extra 5 seconds
    } else if (state.currentLight === 'green') {
      dispatch({ type: 'CHANGE_LIGHT', payload: 'yellow', countdown: 3 });
    } else if (state.currentLight === 'yellow') {
      dispatch({ type: 'CHANGE_LIGHT', payload: 'red', countdown: 7 });
    } else {
      dispatch({ type: 'CHANGE_LIGHT', payload: 'green', countdown: 10 });
    }
  };

  return (
    <TrafficLightContext.Provider value={{ state, dispatch }}>
      {children}
    </TrafficLightContext.Provider>
  );
};

export default TrafficLightProvider;
