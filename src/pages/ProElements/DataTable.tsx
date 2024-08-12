import React from 'react';

const DataTable: React.FC = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <div className="data-table-common data-table-two rounded-sm border border-stroke bg-white py-4 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex justify-between border-b border-stroke px-8 pb-4 dark:border-strokedark">
            <div className="w-100">
              <input
                type="text"
                className="w-full rounded-md border border-stroke px-5 py-2.5 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary"
                placeholder="Search..."
                defaultValue=""
              />
            </div>
            <div className="flex items-center font-medium">
              <select className="bg-transparent pl-2">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
              <p className="pl-2 text-black dark:text-white">Entries Per Page</p>
            </div>
          </div>
          <table
            role="table"
            className="datatable-table w-full table-auto border-collapse overflow-hidden break-words px-4 md:table-fixed md:overflow-auto md:px-8"
          >
            <thead>
              <tr role="row">
                <th
                  colSpan={1}
                  role="columnheader"
                  title="Toggle SortBy"
                  style={{ cursor: 'pointer' }}
                >
                  <div className="flex items-center">
                    <span>Name</span>
                    <div className="ml-2 inline-flex flex-col space-y-[2px]">
                      <span className="inline-block">
                        <svg
                          className="fill-current"
                          width="10"
                          height="5"
                          viewBox="0 0 10 5"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M5 0L0 5H10L5 0Z" fill="" />
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
                          <path d="M5 5L10 0L0 0L5 5Z" fill="" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </th>
                <th
                  colSpan={1}
                  role="columnheader"
                  title="Toggle SortBy"
                  style={{ cursor: 'pointer' }}
                >
                  <div className="flex items-center">
                    <span>Position</span>
                    <div className="ml-2 inline-flex flex-col space-y-[2px]">
                      <span className="inline-block">
                        <svg
                          className="fill-current"
                          width="10"
                          height="5"
                          viewBox="0 0 10 5"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M5 0L0 5H10L5 0Z" fill="" />
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
                          <path d="M5 5L10 0L0 0L5 5Z" fill="" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </th>
                <th
                  colSpan={1}
                  role="columnheader"
                  title="Toggle SortBy"
                  style={{ cursor: 'pointer' }}
                >
                  <div className="flex items-center">
                    <span>Office</span>
                    <div className="ml-2 inline-flex flex-col space-y-[2px]">
                      <span className="inline-block">
                        <svg
                          className="fill-current"
                          width="10"
                          height="5"
                          viewBox="0 0 10 5"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M5 0L0 5H10L5 0Z" fill="" />
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
                          <path d="M5 5L10 0L0 0L5 5Z" fill="" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </th>
                <th
                  colSpan={1}
                  role="columnheader"
                  title="Toggle SortBy"
                  style={{ cursor: 'pointer' }}
                >
                  <div className="flex items-center">
                    <span>Age</span>
                    <div className="ml-2 inline-flex flex-col space-y-[2px]">
                      <span className="inline-block">
                        <svg
                          className="fill-current"
                          width="10"
                          height="5"
                          viewBox="0 0 10 5"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M5 0L0 5H10L5 0Z" fill="" />
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
                          <path d="M5 5L10 0L0 0L5 5Z" fill="" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </th>
                <th
                  colSpan={1}
                  role="columnheader"
                  title="Toggle SortBy"
                  style={{ cursor: 'pointer' }}
                >
                  <div className="flex items-center">
                    <span>Start Date</span>
                    <div className="ml-2 inline-flex flex-col space-y-[2px]">
                      <span className="inline-block">
                        <svg
                          className="fill-current"
                          width="10"
                          height="5"
                          viewBox="0 0 10 5"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M5 0L0 5H10L5 0Z" fill="" />
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
                          <path d="M5 5L10 0L0 0L5 5Z" fill="" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </th>
                <th
                  colSpan={1}
                  role="columnheader"
                  title="Toggle SortBy"
                  style={{ cursor: 'pointer' }}
                >
                  <div className="flex items-center">
                    <span>Salary</span>
                    <div className="ml-2 inline-flex flex-col space-y-[2px]">
                      <span className="inline-block">
                        <svg
                          className="fill-current"
                          width="10"
                          height="5"
                          viewBox="0 0 10 5"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M5 0L0 5H10L5 0Z" fill="" />
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
                          <path d="M5 5L10 0L0 0L5 5Z" fill="" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody role="rowgroup">
              <tr role="row">
                <td role="cell">Sid Swaniawski</td>
                <td role="cell">Senior React Developer</td>
                <td role="cell">Las Vegas</td>
                <td role="cell">29</td>
                <td role="cell">2009/09/01</td>
                <td role="cell">$852,456</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
          <div className="flex justify-between border-t border-stroke px-8 pt-5 dark:border-strokedark">
            <p className="font-medium">Showing 2 of 3 pages</p>
            <div className="flex">
              <button className="flex cursor-pointer items-center justify-center rounded-md p-1 px-2 hover:bg-primary hover:text-white">
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
                  />
                </svg>
              </button>
              <button className="false mx-1 flex cursor-pointer items-center justify-center rounded-md p-1 px-3 hover:bg-primary hover:text-white">
                1
              </button>
              <button className="bg-primary text-white mx-1 flex cursor-pointer items-center justify-center rounded-md p-1 px-3 hover:bg-primary hover:text-white">
                2
              </button>
              <button className="false mx-1 flex cursor-pointer items-center justify-center rounded-md p-1 px-3 hover:bg-primary hover:text-white">
                3
              </button>
              <button className="flex cursor-pointer items-center justify-center rounded-md p-1 px-2 hover:bg-primary hover:text-white">
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
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
}

export default DataTable;
