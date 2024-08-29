import React from 'react';

interface TableColumn {
  header: string;
}

interface TableRow {
  [key: string]: React.ReactNode;
}

interface TableData {
  columns: TableColumn[];
  rows: TableRow[];
}

interface DataTableProps {
  searchTerm: string;
  searchInputRef: React.RefObject<HTMLInputElement>;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rowsPerPage: number;
  setRowsPerPage: (value: number) => void;
  currentPage: number;
  totalPages: number;
  handlePageChange: (pageNumber: number) => void;
  tableData: TableData;
}

const DataTable: React.FC<DataTableProps> = ({
  searchTerm,
  searchInputRef,
  handleSearch,
  rowsPerPage,
  setRowsPerPage,
  currentPage,
  totalPages,
  handlePageChange,
  tableData,
}) => {
  return (
    <section className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 py-4.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-6">
      <div className="flex justify-between border-b border-stroke pb-6 dark:border-strokedark">
        <div className="w-100">
          <input
            type="text"
            className="w-full rounded-md border border-stroke px-5 py-2.5 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            ref={searchInputRef}
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
      <div className="overflow-x-auto">
        <table
          role="table"
          className="datatable-table w-full table-auto border-collapse overflow-hidden break-words px-4 md:table-fixed md:overflow-auto md:px-8"
        >
          <thead>
            <tr role="row" className="bg-gray-2 dark:bg-meta-4">
              {tableData.columns.map((column, index) => (
                <th
                  key={index}
                  colSpan={1}
                  role="columnheader"
                  style={{ cursor: 'pointer' }}
                  className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11"
                >
                  <div className="flex items-center">
                    <span>{column.header}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody role="rowgroup">
            {tableData.rows.map((row, index) => (
              <tr key={index} role="row">
                {Object.keys(row).map((key, i) => (
                  <td
                    key={i}
                    role="cell"
                    className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11"
                  >
                    {row[key]}
                  </td>
                ))}
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