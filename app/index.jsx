import React from 'react';
import { render } from 'react-dom';
import './styles.css';

import Table from './components/Table';

render(
  <div className="greeting">
    <Table />
  </div>,
  document.querySelector('.app')
);
