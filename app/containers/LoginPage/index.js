import React from 'react';
import styled from 'styled-components';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import saga from './saga';
import reducer from './reducer';
import { login } from './actions';

const LoginWrapper = styled.div`
  width: auto;
  display: block;
  margin-left: ${props => props.theme.spacing.unit * 3}px;
  margin-right: ${props => props.theme.spacing.unit * 3}px;
  ${props =>
    props.theme.breakpoints.up(400 + props.theme.spacing.unit * 3 * 2)} {
    width: 400px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const StyledPaper = styled(Paper)`
  margin-top: ${props => props.theme.spacing.unit * 8}px;
  padding: ${props => props.theme.spacing.unit * 3}px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  width: 100%;
  margintop: ${props => props.theme.spacing.unit}px;
`;

const LoginButton = styled(Button)`
  margin-top: ${props => props.theme.spacing.unit * 3}px;
`;

export class LoginPage extends React.PureComponent {
  render() {
    return (
      <LoginWrapper>
        <CssBaseline />
        <StyledPaper>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Form onSubmit={this.props.onSubmitForm}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <LoginButton
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
            >
              Sign in
            </LoginButton>
          </Form>
        </StyledPaper>
      </LoginWrapper>
    );
  }
}

LoginPage.propTypes = {
  onSubmitForm: PropTypes.func,
  // loading: PropTypes.bool,
  // error: PropTypes.oneOf([PropTypes.bool, PropTypes.object]),
};

export function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();

      dispatch(login(evt.target.email.value, evt.target.password.value));
    },
  };
}

const mapStateToProps = state => ({
  loading: state.loading,
  error: state.error,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'LoginPage', reducer });
const withSaga = injectSaga({ key: 'LoginPage', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
)(LoginPage);
