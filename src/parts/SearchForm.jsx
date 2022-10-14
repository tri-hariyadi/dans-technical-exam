import React from 'react';
import { Form } from 'react-final-form';
import { Row, Col, Spinner } from 'reactstrap';
import RadioField from '../components/RadioField';
import TextField from '../components/TextField';

const SearchForm = ({ onSubmit }) => {
  return (
    <Form
      onSubmit={(values) => onSubmit(values)}
      render={
        ({ handleSubmit, submitting, values }) => (
          <div className='w-100'>
            <Row>
              <Col md='3'>
                <TextField name='desc' placeholder='Search' />
              </Col>
              <Col md='3'>
                <TextField name='location' placeholder='Nama Kota' />
              </Col>
              <Col  md='3'>
                <RadioField
                  name='option'
                  options={[{ value: 'fulltime', label: 'Full Time' }, { value: 'parttime', label: 'Part Time' }]}
                />
              </Col>
              <Col md='3'>
                {!submitting ?
                  <button onClick={handleSubmit} className='btn btn-primary'>Search</button>
                  :
                  <div className='btn btn-primary'>
                    <Spinner color='light' size='sm' className='me-2' />
                    <span>Loading</span>
                  </div>
                }
              </Col>
            </Row>
          </div>
        )
      }
    />
  )
}

export default SearchForm
