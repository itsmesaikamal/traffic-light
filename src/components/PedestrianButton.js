// PedestrianButton.js

import React, { useContext } from 'react';
import TrafficLightContext from '../context/TrafficLightContext';
import './PedestrianButton.css';

const PedestrianButton = () => {
  const { dispatch, state } = useContext(TrafficLightContext);

  const handleRequest = () => {
    if (!state.pedestrianRequest && state.currentLight !== 'red') {  // Only allow requests when light is not red
      dispatch({ type: 'REQUEST_CROSSING' });
    }
  };

  return (
    <button className={`pedestrian-button ${state.pedestrianRequest ? 'requested' : ''}`} onClick={handleRequest}>
      {state.pedestrianRequest ? 'Waiting for light to turn red...' : 'Request Pedestrian Crossing'}
    </button>
  );
};

export default PedestrianButton;
