import React, { useState } from 'react';

interface TableColumn {
  header: string;
}

interface TableRow {
  name: string;
  position: string;
  office: string;
  age: number;
  startDate: string;
  salary: string;
}

interface TableData {
  columns: TableColumn[];
  rows: TableRow[];
}

const tableData: TableData = {
  columns: [
    { header: 'Name' },
    { header: 'Position' },
    { header: 'Office' },
    { header: 'Age' },
    { header: 'Start Date' },
    { header: 'Salary' },
  ],
  rows: [
    {
      name: 'Brielle Kuphal',
      position: 'Senior Javascript Developer',
      office: 'Edinburgh',
      age: 25,
      startDate: '2012/03/29',
      salary: '$433,060',
    },
    {
      name: 'Barney Murray',
      position: 'Senior Backend Developer',
      office: 'Amsterdam',
      age: 29,
      startDate: '2010/05/01',
      salary: '$424,785',
    },
    {
      name: 'Ressie Ruecker',
      position: 'Senior Frontend Developer',
      office: 'Jakarta',
      age: 27,
      startDate: '2013/07/01',
      salary: '$785,210',
    },
    {
      name: 'Teresa Mertz',
      position: 'Senior Designer',
      office: 'New Caledonia',
      age: 25,
      startDate: '2014/05/30',
      salary: '$532,126',
    },
    {
      name: 'Chelsey Hackett',
      position: 'Product Manager',
      office: 'New York',
      age: 26,
      startDate: '2011/09/30',
      salary: '$421,541',
    },
    {
      name: 'Tatyana Metz',
      position: 'Senior Product Manager',
      office: 'New York',
      age: 28,
      startDate: '2009/09/30',
      salary: '$852,541',
    },
    {
      name: 'Oleta Harvey',
      position: 'Junior Product Manager',
      office: 'California',
      age: 25,
      startDate: '2015/10/30',
      salary: '$654,444',
    },
    {
      name: 'Bette Haag',
      position: 'Junior Product Manager',
      office: 'Carolina',
      age: 29,
      startDate: '2017/12/31',
      salary: '$541,111',
    },
    {
      name: 'Meda Ebert',
      position: 'Junior Web Developer',
      office: 'Amsterdam',
      age: 27,
      startDate: '2015/10/31',
      salary: '$651,456',
    },
    {
      name: 'Elissa Stroman',
      position: 'Junior React Developer',
      office: 'Kuala Lumpur',
      age: 29,
      startDate: '2008/05/31',
      salary: '$566,123',
    },
  ],
};

const DataTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredRows = tableData.rows.filter(
    (row) =>
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.office.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
  const paginatedRows = filteredRows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when search term changes
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 py-4.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-6">
      <div className="flex justify-between border-b border-stroke px-8 pb-4 dark:border-strokedark">
        <div className="w-100">
          <input
            type="text"
            className="w-full rounded-md border border-stroke px-5 py-2.5 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="flex items-center font-medium">
          <select
            className="bg-transparent pl-2"
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
          <p className="pl-2 text-black dark:text-white">Entries Per Page</p>
        </div>
      </div>
      <div className='overflow-x-auto'>
      <table
        role="table"
        className="datatable-table w-full table-auto border-collapse overflow-hidden break-words px-4 md:table-fixed md:overflow-auto md:px-8"
      >
        <thead>
          <tr role="row" className="font-medium">
            {tableData.columns.map((column, index) => (
              <th
                key={index}
                colSpan={1}
                role="columnheader"
                title="Toggle SortBy"
                style={{ cursor: 'pointer' }}
                // className="p-2.5 xl:p-5"
                className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11"
              >
                <div className="flex items-center">
                  <span>{column.header}</span>
                  <div className="ml-2 inline-flex flex-col space-y-[2px]">
                    {/* <span className="inline-block">
                      <svg
                        className="fill-current"
                        width="10"
                        height="5"
                        viewBox="0 0 10 5"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M5 0L0 5H10L5 0Z" fill=""></path>
                      </svg>
                    </span>
                    <span className="inline-block">
                      <svg
                        className="fill-current"
                        width="10"
                        height="5"
                        viewBox="0 0 10 5"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M5 5L10 0L-4.37114e-07 8.74228e-07L5 5Z" fill=""></path>
                      </svg>
                    </span> */}
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody role="rowgroup">
          {paginatedRows.map((row, index) => (
            <tr key={index} role="row">
              <td role="cell" className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">{row.name}</td>
              <td role="cell" className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">{row.position}</td>
              <td role="cell" className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">{row.office}</td>
              <td role="cell" className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">{row.age}</td>
              <td role="cell" className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">{row.startDate}</td>
              <td role="cell" className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">{row.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className="flex justify-between border-t border-stroke px-8 pt-5 dark:border-strokedark">
        <p className="font-medium">
          Showing {currentPage} of {totalPages} pages
        </p>
        <div className="flex">
          <button
            className="flex cursor-pointer items-center justify-center rounded-md p-1 px-2 hover:bg-primary hover:text-white"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.1777 16.1156C12.009 16.1156 11.8402 16.0593 11.7277 15.9187L5.37148 9.44995C5.11836 9.19683 5.11836 8.80308 5.37148 8.54995L11.7277 2.0812C11.9809 1.82808 12.3746 1.82808 12.6277 2.0812C12.8809 2.33433 12.8809 2.72808 12.6277 2.9812L6.72148 8.99995L12.6559 15.0187C12.909 15.2718 12.909 15.6656 12.6559 15.9187C12.4871 16.0312 12.3465 16.1156 12.1777 16.1156Z"
                fill=""
              ></path>
            </svg>
          </button>
          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page}
              className={`${
                currentPage === page + 1
                  ? 'bg-primary text-white'
                  : 'text-black dark:text-white'
              } mx-1 flex cursor-pointer items-center justify-center rounded-md p-1 px-3 hover:bg-primary hover:text-white`}
              onClick={() => handlePageChange(page + 1)}
            >
              {page + 1}
            </button>
          ))}
          <button
            className="flex cursor-pointer items-center justify-center rounded-md p-1 px-2 hover:bg-primary hover:text-white"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.82148 16.1156C5.65273 16.1156 5.51211 16.0593 5.37148 15.9468C5.11836 15.6937 5.11836 15.3 5.37148 15.0468L11.2777 8.99995L5.37148 2.9812C5.11836 2.72808 5.11836 2.33433 5.37148 2.0812C5.62461 1.82808 6.01836 1.82808 6.27148 2.0812L12.6277 8.54995C12.8809 8.80308 12.8809 9.19683 12.6277 9.44995L6.27148 15.9187C6.15898 16.0312 5.99023 16.1156 5.82148 16.1156Z"
                fill=""
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default DataTable;
