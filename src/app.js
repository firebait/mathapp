import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Builder } from 'components';

const App = () => (
  <MuiThemeProvider>
    <Builder />
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
