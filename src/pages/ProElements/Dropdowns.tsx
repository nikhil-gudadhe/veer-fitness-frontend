import React, {useState, useEffect, useRef} from 'react'

const Dropdowns: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-4 py-4 dark:border-strokedark sm:px-6 xl:px-7.5">
        <h3 className="font-medium text-black dark:text-white">Dropdowns Style 3</h3>
      </div>
      <div className="p-4 sm:p-6 xl:p-10">
        <div ref={dropdownRef} className="relative mb-50 inline-block">
          <button
            className="inline-flex items-center gap-2.5 rounded-md bg-primary py-3 px-5.5 font-medium text-white hover:bg-opacity-90"
            onClick={toggleDropdown}
          >
            Dropdown Button
            <svg
              className={`fill-current duration-200 ease-linear ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`}
              width="12"
              height="7"
              viewBox="0 0 12 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.564864 0.879232C0.564864 0.808624 0.600168 0.720364 0.653125 0.667408C0.776689 0.543843 0.970861 0.543844 1.09443 0.649756L5.82517 5.09807C5.91343 5.18633 6.07229 5.18633 6.17821 5.09807L10.9089 0.649756C11.0325 0.526192 11.2267 0.543844 11.3502 0.667408C11.4738 0.790972 11.4562 0.985145 11.3326 1.10871L6.60185 5.55702C6.26647 5.85711 5.73691 5.85711 5.41917 5.55702L0.670776 1.10871C0.600168 1.0381 0.564864 0.967492 0.564864 0.879232Z"
                fill=""
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.4719 0.229332L6.00169 4.48868L10.5171 0.24288C10.9015 -0.133119 11.4504 -0.0312785 11.7497 0.267983C12.1344 0.652758 12.0332 1.2069 11.732 1.50812L11.7197 1.52041L6.97862 5.9781C6.43509 6.46442 5.57339 6.47872 5.03222 5.96853C5.03192 5.96825 5.03252 5.96881 5.03222 5.96853L0.271144 1.50833C0.123314 1.3605 -5.04223e-08 1.15353 -3.84322e-08 0.879226C-2.88721e-08 0.660517 0.0936127 0.428074 0.253705 0.267982C0.593641 -0.0719548 1.12269 -0.0699964 1.46204 0.220873L1.4719 0.229332ZM5.41917 5.55702C5.73691 5.85711 6.26647 5.85711 6.60185 5.55702L11.3326 1.10871C11.4562 0.985145 11.4738 0.790972 11.3502 0.667408C11.2267 0.543844 11.0325 0.526192 10.9089 0.649756L6.17821 5.09807C6.07229 5.18633 5.91343 5.18633 5.82517 5.09807L1.09443 0.649756C0.970861 0.543844 0.776689 0.543843 0.653125 0.667408C0.600168 0.720364 0.564864 0.808624 0.564864 0.879232C0.564864 0.967492 0.600168 1.0381 0.670776 1.10871L5.41917 5.55702Z"
                fill=""
              ></path>
            </svg>
          </button>
          {isDropdownOpen && (
            <div className="absolute left-0 top-full z-40 mt-2 w-full rounded-md bg-black py-3 shadow-card">
              <ul className="flex flex-col">
                <li>
                  <a
                    className="flex py-2 px-5 font-medium text-bodydark2 hover:text-white"
                    href="/ui/dropdowns"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    className="flex py-2 px-5 font-medium text-bodydark2 hover:text-white"
                    href="/ui/dropdowns"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    className="flex py-2 px-5 font-medium text-bodydark2 hover:text-white"
                    href="/ui/dropdowns"
                  >
                    Earnings
                  </a>
                </li>
                <li>
                  <a
                    className="flex py-2 px-5 font-medium text-bodydark2 hover:text-white"
                    href="/ui/dropdowns"
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>


    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
    <div className="border-b border-stroke px-4 py-4 dark:border-strokedark sm:px-6 xl:px-9">
      <h3 className="font-medium text-black dark:text-white">Style 1</h3>
    </div>
    <div className="p-4 sm:p-6 xl:p-9">
      <div className="flex items-center gap-7.5 xl:gap-17.5">
          <div className="animate-spin">
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="path-1-inside-1_1881_16176" fill="white">
                  <path d="M31.9333 49.0195C37.093 47.5301 41.636 44.4188 44.8896 40.1462C48.1432 35.8736 49.9345 30.6668 49.9982 25.2968C50.062 19.9268 48.3948 14.679 45.2435 10.3304C42.0922 5.98178 37.6244 2.76352 32.5014 1.15209C27.3785 -0.459331 21.8728 -0.378254 16.7996 1.38332C11.7263 3.1449 7.35519 6.49332 4.33332 10.9328C1.31145 15.3724 -0.200496 20.667 0.0213371 26.0328C0.24317 31.3986 2.18699 36.5503 5.565 40.7253L9.8072 37.2929C7.16653 34.0292 5.647 30.002 5.47359 25.8074C5.30018 21.6128 6.4821 17.4739 8.84437 14.0034C11.2066 10.5329 14.6237 7.91538 18.5895 6.53831C22.5554 5.16125 26.8593 5.09787 30.8641 6.35756C34.8688 7.61724 38.3614 10.133 40.8248 13.5325C43.2883 16.9319 44.5915 21.0342 44.5417 25.2321C44.4919 29.4299 43.0916 33.5002 40.5482 36.8402C38.0048 40.1801 34.4534 42.6123 30.4199 43.7766L31.9333 49.0195Z"></path>
                </mask>
                <path d="M31.9333 49.0195C37.093 47.5301 41.636 44.4188 44.8896 40.1462C48.1432 35.8736 49.9345 30.6668 49.9982 25.2968C50.062 19.9268 48.3948 14.679 45.2435 10.3304C42.0922 5.98178 37.6244 2.76352 32.5014 1.15209C27.3785 -0.459331 21.8728 -0.378254 16.7996 1.38332C11.7263 3.1449 7.35519 6.49332 4.33332 10.9328C1.31145 15.3724 -0.200496 20.667 0.0213371 26.0328C0.24317 31.3986 2.18699 36.5503 5.565 40.7253L9.8072 37.2929C7.16653 34.0292 5.647 30.002 5.47359 25.8074C5.30018 21.6128 6.4821 17.4739 8.84437 14.0034C11.2066 10.5329 14.6237 7.91538 18.5895 6.53831C22.5554 5.16125 26.8593 5.09787 30.8641 6.35756C34.8688 7.61724 38.3614 10.133 40.8248 13.5325C43.2883 16.9319 44.5915 21.0342 44.5417 25.2321C44.4919 29.4299 43.0916 33.5002 40.5482 36.8402C38.0048 40.1801 34.4534 42.6123 30.4199 43.7766L31.9333 49.0195Z" stroke="#3C50E0" stroke-width="14" mask="url(#path-1-inside-1_1881_16176)"></path>
            </svg>
          </div>
          <div className="size-12.5 flex items-center justify-center rounded-full border-[7px] border-stroke dark:border-strokedark">
            <div className="animate-spin">
                <svg width="49" height="50" viewBox="0 0 49 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <mask id="path-1-inside-1_1881_16179" fill="white">
                      <path d="M18.5503 49.3989C23.2997 50.4597 28.2554 50.1113 32.8097 48.3965C37.364 46.6816 41.3187 43.6748 44.1889 39.7449C47.0591 35.815 48.7199 31.1328 48.9676 26.2727C49.2153 21.4125 48.0392 16.5858 45.5834 12.3844C43.1277 8.18304 39.4991 4.78974 35.1428 2.62071C30.7865 0.451685 25.8918 -0.398759 21.0592 0.173693C16.2265 0.746144 11.666 2.7166 7.93703 5.84338C4.20803 8.97015 1.47267 13.1173 0.0664691 17.7761L5.29059 19.353C6.38986 15.711 8.52815 12.4691 11.4432 10.0248C14.3582 7.58057 17.9233 6.04021 21.7011 5.59272C25.4789 5.14522 29.3052 5.81003 32.7106 7.50561C36.116 9.20119 38.9526 11.8538 40.8723 15.1381C42.792 18.4224 43.7114 22.1956 43.5178 25.9949C43.3241 29.7942 42.0258 33.4543 39.7822 36.5264C37.5385 39.5986 34.4469 41.949 30.8868 43.2896C27.3266 44.6302 23.4525 44.9025 19.7398 44.0732L18.5503 49.3989Z"></path>
                  </mask>
                  <path d="M18.5503 49.3989C23.2997 50.4597 28.2554 50.1113 32.8097 48.3965C37.364 46.6816 41.3187 43.6748 44.1889 39.7449C47.0591 35.815 48.7199 31.1328 48.9676 26.2727C49.2153 21.4125 48.0392 16.5858 45.5834 12.3844C43.1277 8.18304 39.4991 4.78974 35.1428 2.62071C30.7865 0.451685 25.8918 -0.398759 21.0592 0.173693C16.2265 0.746144 11.666 2.7166 7.93703 5.84338C4.20803 8.97015 1.47267 13.1173 0.0664691 17.7761L5.29059 19.353C6.38986 15.711 8.52815 12.4691 11.4432 10.0248C14.3582 7.58057 17.9233 6.04021 21.7011 5.59272C25.4789 5.14522 29.3052 5.81003 32.7106 7.50561C36.116 9.20119 38.9526 11.8538 40.8723 15.1381C42.792 18.4224 43.7114 22.1956 43.5178 25.9949C43.3241 29.7942 42.0258 33.4543 39.7822 36.5264C37.5385 39.5986 34.4469 41.949 30.8868 43.2896C27.3266 44.6302 23.4525 44.9025 19.7398 44.0732L18.5503 49.3989Z" stroke="#3C50E0" stroke-width="14" mask="url(#path-1-inside-1_1881_16179)"></path>
                </svg>
            </div>
          </div>
      </div>
    </div>
    </div>
    </>
  );
}

export default Dropdowns
