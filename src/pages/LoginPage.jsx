import React, { useCallback, useEffect, useState } from 'react';
import { Form } from 'react-final-form';
import { Redirect, useLocation } from 'react-router-dom';
import { Row, Col, Spinner, Container, Card, CardGroup, CardBody } from 'reactstrap';
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script';
import { AuthConsumer } from '../Auth/AuthContext';
import TextField from '../components/TextField';

let interval;
let message = '';
const LoginPage = () => {
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const [disable, setDisable] = useState(false);
  const [timer, setTimer] = useState(60);
  const { state }  = useLocation();
  const clientId = '253456688828-p2hqlknlqd08vhei2r1t1o9gr7c8g67m.apps.googleusercontent.com';

  useEffect(() => {
    const initClient = () => {
          gapi.client.init({
          clientId: clientId,
          scope: ''
        });
      };
      gapi.load('client:auth2', initClient);
  });

  const decreaseTimer = useCallback(() => {
    interval = setInterval(() => {
      setTimer(v => v-1);
    }, 1000);
  }, [])

  useEffect(() => {
    if (disable) {
      decreaseTimer();
      setTimeout(() => {
        setDisable(false);
      }, 60000);
    }
  }, [decreaseTimer, disable])

  useEffect(() => {
    if (timer === 0) {
      clearInterval(interval);
      setTimer(60);
    }
  }, [timer])

  switch (state?.from.pathname) {
    case '/home':
      if (!disable) message = 'You must log in to view the jobs';
      break;
  
    default:
      break;
  }

  const onSubmit = (values, login) => {
    if (values.username === 'user' && values.password === '123') {
      login({name: values.username});
      setRedirectToReferrer(true);
    } else {
      message = 'Username or password is wrong';
      setDisable(true);
    }
  }

  const respOnSuccessGoogle = (response, login) => {
    login(response);
    setRedirectToReferrer(true);
    message='success'
  }

  const respOnErrorGoogle = (err) => {
    message = err;
  }
  console.log(message);

  if(redirectToReferrer){
    return <Redirect to='/home' />
  }

  return (
    <AuthConsumer>
      {({ login }) => {
        return (
          <div className='app flex-row align-items-center'>
            <Container style={{ height: '100vh' }}>
              <Row className='justify-content-center h-100 align-items-center'>
                <Col md='6'>
                  <CardGroup>
                    <Card className='p-4'>
                      <CardBody>
                        <span className='text-center'>
                        <Form
                          onSubmit={(values) => onSubmit(values, login)}
                          render={
                            ({ handleSubmit, submitting }) => (
                              <div>
                                <Row>
                                  <Col>
                                    <h2 className='mb-3'>Login</h2>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <TextField name='username' placeholder='Username' />
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <TextField type='password' name='password' placeholder='Password' />
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                      {!submitting ?
                                        disable ?
                                          <span className='btn btn-secondary disable'>Login</span>
                                          :
                                          <button onClick={handleSubmit} className='btn btn-primary'>Login</button>
                                        :
                                        <div className='btn btn-primary'>
                                          <Spinner color='light' size='sm' className='me-2' />
                                          <span>Loading</span>
                                        </div>
                                      }
                                  </Col>
                                </Row>
                                <Row className='my-3'>
                                  <Col>
                                    <span>--- OR ---</span>
                                  </Col>
                                </Row>
                                <Row className='mb-3'>
                                  <Col>
                                    <GoogleLogin
                                      clientId={clientId}
                                      buttonText="LOGIN WITH GOOGLE"
                                      onSuccess={(resp) => respOnSuccessGoogle(resp, login)}
                                      onFailure={respOnErrorGoogle}
                                      cookiePolicy={'single_host_origin'}
                                    />
                                  </Col>
                                </Row>
                                <span className='text-danger'>{message}</span>
                                {disable && <span className='ms-2 text-danger'>{timer}</span>}
                              </div>
                            )
                          }
                          />
                        </span>
                      </CardBody>
                    </Card>
                  </CardGroup>
                </Col>
              </Row>
            </Container>
          </div>
        )
      }}
    </AuthConsumer>
  )
}

export default LoginPage
