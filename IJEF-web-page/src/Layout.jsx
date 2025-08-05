import { Outlet, Link } from "react-router-dom";
import { useState } from "react";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-blue-700">
              <span className="flex items-center font-serif">
                <img
                  src="https://static.vecteezy.com/system/resources/thumbnails/000/585/723/small/07-01.jpg"
                  alt="IJEF"
                  width={80}
                  height={80}
                />
                IJEF
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex space-x-6">
              <Link to="/" className="text-gray-600 hover:text-blue-600">
                Home
              </Link>
              <Link to="/assess" className="text-gray-600 hover:text-blue-600">
                Assessment
              </Link>
              <Link to="/summary" className="text-gray-600 hover:text-blue-600">
                Summary
              </Link>
            </div>

            {/* Auth Buttons (Desktop) */}
            <div className="hidden lg:flex space-x-4">
              <Link
                to="/signin"
                className="px-4 py-2 text-sm text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Sign Up
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-gray-600 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="flex flex-col p-4 space-y-4">
              <Link to="/" className="text-gray-600 hover:text-blue-600">
                Home
              </Link>
              <Link to="/assess" className="text-gray-600 hover:text-blue-600">
                Assessment
              </Link>
              <Link to="/summary" className="text-gray-600 hover:text-blue-600">
                Summary
              </Link>
              <hr />
              <Link
                to="/signin"
                className="px-4 py-2 text-sm text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
