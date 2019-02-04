/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import HomePage from 'containers/HomePage';
import LoginPage from 'containers/LoginPage';
import NotFoundPage from 'containers/NotFoundPage';
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { compose } from 'redux';
import { ThemeProvider } from 'styled-components';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { getUser } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectUser } from './selectors';
import theme from './theme';

export class App extends React.PureComponent {
  componentDidMount() {
    this.props.onComponentDidMount();
  }

  renderLoggedIn() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </div>
    );
  }

  renderLoggedOut() {
    return <LoginPage />;
  }

  renderBody() {
    if (this.props.user) return this.renderLoggedIn();
    return this.renderLoggedOut();
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <MuiThemeProvider theme={theme}>
          <Helmet
            titleTemplate="%s - React.js Boilerplate"
            defaultTitle="React.js Boilerplate"
          >
            <meta
              name="description"
              content="A React.js Boilerplate application"
            />
          </Helmet>
          {this.renderBody()}
        </MuiThemeProvider>
      </ThemeProvider>
    );
  }
}

App.propTypes = {
  onComponentDidMount: PropTypes.func,
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

export function mapDispatchToProps(dispatch) {
  return {
    onComponentDidMount: () => dispatch(getUser()),
  };
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'App', reducer });
const withSaga = injectSaga({ key: 'App', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
)(App);
