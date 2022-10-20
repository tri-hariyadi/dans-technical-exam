import React, { useCallback, useEffect, useRef, useState } from 'react'
import ListItem from '../parts/ListItem';

const CrudPage = () => {
  const formValues = useRef({});
  const [data, setData] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    formValues.current.id = Math.floor(Math.random() * 1000);
    e.target.name.value = '';
    e.target.age.value = '';
    e.target.job.value = '';
    setData(v => ([...v, JSON.parse(JSON.stringify(formValues.current))]));
    setSubmitting(true);
  }

  const handleChange = (e) => {
    formValues.current[e.target.name] = e.target.value;
  }

  const deleteList = useCallback((uniqID) => {
    setData(v => {
      const array = JSON.parse(JSON.stringify(v))
      const idx = array.findIndex(({ id }) => id === uniqID);
      if (idx > -1) array.splice(idx, 1);
      return array;
    });
  }, []);

  useEffect(() => {
    if (submitting) {
      formValues.current = {};
      setSubmitting(false);
    }
  }, [submitting]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" name='name' onChange={handleChange}></input>
        </div>
        <br/>
        <div>
          <label>Age</label>
          <input type="text" name='age' onChange={handleChange}></input>
        </div>
        <br/>
        <div>
          <label>Job</label>
          <input type="text" name='job' onChange={handleChange}></input>
        </div>
        <button type="submit">Save</button>
      </form>
      <br />
      <br />
      <ListItem data={data} deleteList={deleteList} />
    </div>
  )
}

export default CrudPage
