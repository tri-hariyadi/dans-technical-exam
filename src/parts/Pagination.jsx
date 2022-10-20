import React from 'react'

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
	const pageNumbers = [...Array(nPages + 1).keys()].slice(1);
	const [numbPage, setNumbPage] = React.useState([]);

	const nextPage = () => {
		if(currentPage !== nPages) {
			setCurrentPage(currentPage + 1);
			const idx = numbPage.indexOf(currentPage + 1);
			const idx2 = pageNumbers.indexOf(currentPage + 1);
			if (idx === 4) {
				if (idx2 !== (pageNumbers.length - 1)) {
					setNumbPage(pageNumbers.slice(idx2 - (idx2 < (pageNumbers.length - 2) ? 2 : 3), idx2 + 3))
				}
			}
		}
	}

	const prevPage = () => {
		if(currentPage !== 1) {
			setCurrentPage(currentPage - 1);
			const idx = numbPage.indexOf(currentPage - 1);
			const idx2 = pageNumbers.indexOf(currentPage - 1);
			if (idx === 0) {
				if (idx2 === 1) setNumbPage(pageNumbers.slice(idx2 - 1, idx2 + 4))
				else if (idx2 >= 2) setNumbPage(pageNumbers.slice(idx2 - 2, idx2 + 3))
			}
		}
	}

	React.useEffect(() => {
		setNumbPage(pageNumbers.slice(0, 5));
	}, []);

	return (
		<nav>
			<ul className='pagination justify-content-center'>
				<li className="page-item">
					<button className="page-link" onClick={prevPage}>
						Previous
					</button>
				</li>
				{numbPage.map(pgNumber => (
					<li key={pgNumber} 
						className={`page-item ${currentPage === pgNumber ? 'active' : ''} `} >
						<button onClick={() => {
							if (currentPage !== pgNumber) {
								setCurrentPage(pgNumber);
								const idx = numbPage.indexOf(pgNumber);
								const idx2 = pageNumbers.indexOf(pgNumber);
								if (idx >= 3 && pageNumbers.indexOf(numbPage[numbPage.length-1]) !== (pageNumbers.length - 1)) {
									setNumbPage(pageNumbers.slice(idx2 - (idx2 < (pageNumbers.length - 2) ? 2 : 3), idx2 + 3))
								} else if (idx2 === 1) {
									setNumbPage(pageNumbers.slice(idx2 - 1, idx2 + 4))
								} else if (idx2 > 0 && idx2 < (pageNumbers.length - 2)) {
									setNumbPage(pageNumbers.slice(idx2 - 2, idx2 + 3))
								}
							}
						}} className='page-link'>
							{pgNumber}
						</button>
					</li>
				))}
				<li className="page-item">
					<button className="page-link" onClick={nextPage}>
						Next
					</button>
				</li>
			</ul>
		</nav>
	)
}

export default Pagination