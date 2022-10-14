import React, { useState } from 'react';
import { Form } from 'react-final-form';
import { Redirect, useLocation } from 'react-router-dom';
import { Row, Col, Spinner, Container, Card, CardGroup, CardBody } from 'reactstrap'
import { AuthConsumer } from '../Auth/AuthContext';
import TextField from '../components/TextField';

const LoginPage = () => {
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const { state }  = useLocation();
  
  let message = '';

  switch (state?.from.pathname) {
    case '/home':
      message = 'You must log in to view the jobs';
      break;
  
    default:
      break;
  }

  const onSubmit = (values, login) => {
    if (values.username === 'user' && values.password === '123') {
      login();
      setRedirectToReferrer(true);
    } else {
      message = 'Username or password is wrong';
    }
  }

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
                                    <h2>Login</h2>
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
                                        <button onClick={handleSubmit} className='btn btn-primary'>Login</button>
                                        :
                                        <div className='btn btn-primary'>
                                          <Spinner color='light' size='sm' className='me-2' />
                                          <span>Loading</span>
                                        </div>
                                      }
                                  </Col>
                                </Row>
                                <p className='mt-2'>{message}</p>
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
