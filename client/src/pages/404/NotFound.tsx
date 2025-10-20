import React from 'react';
import { Button } from 'react-daisyui';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
        <div className="w-full lg:w-1/2">
          <p className="text-sm md:text-4xl font-medium text-blue-500 dark:text-blue-400">
            404 lỗi
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            Không tìm thấy trang
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Xin lỗi nhưng trang bạn tìm chúng tôi không tìm thấy
          </p>

          <div className="flex items-center mt-6 gap-x-3">
            <Link to="/" className="">
              <Button color="primary" className="text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 rtl:rotate-180"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                  />
                </svg>
                Quay lại
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative w-full mt-8 lg:w-1/2 lg:mt-0">
          <img
            className="w-full lg:h-[32rem] h-80 md:h-96 rounded-lg object-cover"
            src="https://i.redd.it/6bal3fauy1hb1.jpg"
            alt="Not Found"
          />
        </div>
      </div>
    </section>
  );
};

export default NotFound;
