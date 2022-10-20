import React, { useState } from 'react';
import data from '../MOCK_DATA.json';
import Pagination from '../parts/Pagination';

const DataPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordPerPage] = useState(10);

  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const currentRecord = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(data.length / recordPerPage);

  return (
    <div className='container mt-5'>
      <h2> Simple Pagination Example in React </h2>
      <table className="table">
        <thead>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>First Name</th>
            <th scope='col'>Last Name</th>
            <th scope='col'>City</th>
          </tr>
        </thead>
        <tbody>
          {currentRecord.map(item => (
            <tr key={item.id}>
              <td>{item.id} </td>
              <td>{item.first_name} </td>
              <td>{item.last_name} </td>
              <td>{item.city} </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}

export default DataPage
