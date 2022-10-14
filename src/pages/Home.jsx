import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Row, Col, Spinner } from 'reactstrap'
import CardItem from '../components/CardItem';
import SearchForm from '../parts/SearchForm'
import httpService from '../utils/httpService';
import useFetch from '../utils/useFetch';

const Home = () => {
  const [page, setPage] = useState(1);
  const [dataFiltered, setDataFiltered] = useState(null);
  const { loading, error, list } = useFetch(page);
  const loader = useRef(null);

  const onSubmit = async (values) => {
    const res = await httpService.get(`?description=${values.desc || ''}&location=${values.location || ''}&full_time=${values.option === 'fulltime' ? true : false}`);
    setDataFiltered(res.data);
  };

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);
  console.log(dataFiltered);

  return (
    <div className='w-100 container'>
      <h2 className='mb-4 mt-3'>Search Job</h2>
      <SearchForm onSubmit={onSubmit} />
      <div className='mt-4'>
        {dataFiltered
          ? dataFiltered.map((data, i) => {
            if (data) return (
              <Row className='mb-5'>
                <Col md='6'>
                  <CardItem key={i} data={data}/>
                </Col>
                <Col md='6'>
                  {i + 1 < dataFiltered.length
                    ? <CardItem key={i} data={list[i + 1]}/>
                    : null
                  }
                </Col>
              </Row>
            );
            return null;
          })
          : list.map((data, i) => {
            if (data) return (
              <Row className='mb-5'>
                <Col md='6'>
                  <CardItem key={i} data={data}/>
                </Col>
                <Col md='6'>
                  {i + 1 < list.length && list[i + 1]
                    ? <CardItem key={i} data={list[i + 1]}/>
                    : null
                  }
                </Col>
              </Row>
            );
            return null;
          })
        }
      </div>
      {loading && !dataFiltered &&
        <div>
          <Spinner color='secondary' size='sm' className='me-2' />
          <span className='mt-n1'>Loading...</span>
        </div>
      }
      {error && !dataFiltered && <p>Error!</p>}
      <div ref={loader} />
      <br />
      <br />
    </div>
  )
}

export default Home
