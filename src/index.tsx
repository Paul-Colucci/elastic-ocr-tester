import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ElasticOcrTester from './components/elasticOcrTester/ElasticOcrTester';
import registerServiceWorker from './registerServiceWorker';
import './styles/index.css';
import 'bootstrap-css-only';

ReactDOM.render(
  <ElasticOcrTester />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
