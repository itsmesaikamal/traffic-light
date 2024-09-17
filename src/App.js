import React from 'react';
import TrafficLight from './components/TrafficLight';
import PedestrianButton from './components/PedestrianButton';
import TrafficLightProvider from './context/TrafficLightProvider';
import './App.css';

const App = () => {
  return (
    <TrafficLightProvider>
      <div className="app">
        <h1>Traffic Light Simulator with Pedestrian Crossing</h1>
        <div className="traffic-light-container">
          <TrafficLight />
          <PedestrianButton />
        </div>
      </div>
    </TrafficLightProvider>
  );
};

export default App;
