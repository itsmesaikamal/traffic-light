import React, { useContext } from 'react';
import TrafficLightContext from '../context/TrafficLightContext';
import Light from './Light';
import './TrafficLight.css';

const TrafficLight = () => {
  const { state } = useContext(TrafficLightContext);

  return (
    <div className="traffic-light">
      <Light color="red" isOn={state.currentLight === 'red'} />
      <Light color="yellow" isOn={state.currentLight === 'yellow'} />
      <Light color="green" isOn={state.currentLight === 'green'} />
      <div className="countdown">Time left: {state.countdown}s</div>
    </div>
  );
};

export default TrafficLight;
