import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role"); // Fetch user role from localStorage

  // Check if user is logged in (presence of token)
  const isLoggedIn = localStorage.getItem("token");

  const handleAccessDenied = () => {
    // Redirect to login if not logged in
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Login and Register Buttons at the Top (Aligned Right) */}
      <div className="flex justify-end w-full max-w-4xl mt-6 px-4">
        <button
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 mr-2"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <button
          className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center mt-12">
        <h1 className="text-4xl font-bold text-blue-600 mb-6">Welcome to Helpdesk</h1>
        <p className="text-lg text-gray-700 mb-12 text-center">
          Access features tailored for your role. Select an action below.
        </p>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl">
          {/* Dashboard */}
          {isLoggedIn ? (
            <div
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300"
              onClick={() => navigate("/dashboard")}
            >
              <h2 className="text-2xl font-bold text-blue-500 mb-4">Dashboard</h2>
              <p className="text-gray-600">View a summary of activity and insights.</p>
            </div>
          ) : (
            <div
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300 cursor-not-allowed"
              onClick={handleAccessDenied}
            >
              <h2 className="text-2xl font-bold text-gray-500 mb-4">Dashboard</h2>
              <p className="text-gray-600">Please log in to access the dashboard.</p>
            </div>
          )}

          {/* Tickets */}
          {isLoggedIn ? (
            <div
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300"
              onClick={() => navigate("/tickets")}
            >
              <h2 className="text-2xl font-bold text-green-500 mb-4">Tickets</h2>
              <p className="text-gray-600">Manage or view all your tickets.</p>
            </div>
          ) : (
            <div
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300 cursor-not-allowed"
              onClick={handleAccessDenied}
            >
              <h2 className="text-2xl font-bold text-gray-500 mb-4">Tickets</h2>
              <p className="text-gray-600">Please log in to access tickets.</p>
            </div>
          )}

          {/* Role-Specific Features */}
          {role === "Customer" && isLoggedIn && (
            <>
              <div
                className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300"
                onClick={() => navigate("/tickets/create")}
              >
                <h2 className="text-2xl font-bold text-yellow-500 mb-4">Create Ticket</h2>
                <p className="text-gray-600">Submit a new support request.</p>
              </div>
              <div
                className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300"
                onClick={() => navigate("/tickets")}
              >
                <h2 className="text-2xl font-bold text-purple-500 mb-4">My Tickets</h2>
                <p className="text-gray-600">View tickets you've submitted.</p>
              </div>
            </>
          )}
          {role === "Agent" && isLoggedIn && (
            <div
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300"
              onClick={() => navigate("/tickets")}
            >
              <h2 className="text-2xl font-bold text-red-500 mb-4">Manage Tickets</h2>
              <p className="text-gray-600">Review and respond to customer tickets.</p>
            </div>
          )}
          {role === "Admin" && isLoggedIn && (
            <>
              <div
                className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300"
                onClick={() => navigate("/dashboard")}
              >
                <h2 className="text-2xl font-bold text-gray-500 mb-4">Admin Dashboard</h2>
                <p className="text-gray-600">Access administrative settings and insights.</p>
              </div>
              <div
                className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300"
                onClick={() => navigate("/tickets")}
              >
                <h2 className="text-2xl font-bold text-indigo-500 mb-4">View All Tickets</h2>
                <p className="text-gray-600">Monitor tickets across all users.</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;