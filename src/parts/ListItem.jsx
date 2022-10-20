import React from 'react'

const ListItem = ({ data, deleteList }) => {
  console.log(data);
  return (
    <div>
      {data && data.length > 0 &&
        <ol>
          {data.map((value, idx) => (
            <li key={`list-${idx}`} className='d-flex align-items-center'>
              <div>
                <span className='d-block'>Nama: {value.name}</span>
                <span className='d-block'>Age: {value.age}</span>
                <span className='d-block'>Job: {value.job}</span>
              </div>
              <div className='ms-3'>
                <button type='button' onClick={() => deleteList(value.id)}>Hapus</button>
              </div>
            </li>
          ))}
        </ol>
      }
      {(!data || !data.length) &&
        <p>Empty</p>
      }
    </div>
  )
}

export default React.memo(ListItem, (prevProps, nextProps) => {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
})
