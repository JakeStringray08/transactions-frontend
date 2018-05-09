import React from 'react';
import ReactDOM from 'react-dom';
import { polyfill } from 'es6-promise';
import 'isomorphic-fetch';
import './index.css';
import App from './App';

polyfill();

ReactDOM.render(<App />, document.getElementById('root'));