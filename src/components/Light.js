import React from 'react';
import './TrafficLight.css';

const Light = ({ color, isOn }) => {
  return (
    <div className={`light ${color} ${isOn ? 'on' : ''}`}></div>
  );
};

export default Light;
