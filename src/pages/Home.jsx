import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Row, Col, Spinner } from 'reactstrap'
import CardItem from '../components/CardItem';
import SearchForm from '../parts/SearchForm';
import useFetch from '../utils/useFetch';

const Home = () => {
  const [query, setQuery] = useState(false);
  const [page, setPage] = useState(0);
  const { loading, error, list } = useFetch(query, page);
  const loader = useRef(null);

  const onSubmit = async (values) => {
    setQuery({
      desc: values.desc || '',
      location: values.location || '',
      option: values.option === 'fulltime' ? true : false
    })
    if (!values.desc && !values.location && !values.option) {
      setPage(1);
      setQuery(false);
    }
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

  return (
    <div className='w-100 container'>
      <h2 className='mb-4 mt-3'>Search Job</h2>
      <SearchForm onSubmit={onSubmit} />
      <div className='mt-4'>
        {list.map((data, i) => {
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
      {loading &&
        <div className='mb-5'>
          <Spinner color='secondary' size='sm' className='me-2' />
          <span className='mt-n1'>Loading...</span>
        </div>
      }
      {error && <p className='mb-5'>Error!</p>}
      <div ref={loader} />
    </div>
  )
}

export default Home
