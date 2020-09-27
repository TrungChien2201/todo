import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Homepage from './Views/Homepage';
import '../src/style.scss'
function App() {
  return (
  
     <Homepage />
   
  );
}

export default App;
