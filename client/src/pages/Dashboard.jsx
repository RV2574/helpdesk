import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomerDashboard from "./CustomerDashboard";
import AdminDashboard from "./AdminDashboard";
import AgentDashboard from "./AgentDashboard";

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState({ username: "", role: "" }); // Stores user info
  const [loading, setLoading] = useState(true); // Manage loading state
  const [error, setError] = useState(""); // Manage errors

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true); // Start loading
      try {
        const token = localStorage.getItem("token"); // Retrieve token from localStorage
        if (!token) {
          throw new Error("No authentication token found. Please log in.");
        }

        const response = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` }, // Attach Authorization header
        });

        const userData = response.data;

        // Store username in localStorage for use in CustomerDashboard
        localStorage.setItem("username", userData.username);

        setUserInfo(userData); // Save user info (username and role)
        setError(""); // Clear any previous errors
      } catch (err) {
        console.error("Error fetching user info:", err.response?.data || err.message);
        setError(err.response?.data?.message || "Unable to fetch user information.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUserInfo();
  }, []);

  const renderDashboard = () => {
    switch (userInfo.role) {
      case "Customer":
        return <CustomerDashboard />; // Render Customer Dashboard
      case "Admin":
        return <AdminDashboard />; // Render Admin Dashboard
      case "Agent":
        return <AgentDashboard />; // Render Agent Dashboard
      default:
        return (
          <p className="text-red-500 font-bold mt-4">
            Unauthorized: Role "{userInfo.role || 'Unknown'}" not recognized!
          </p>
        ); // Handle unrecognized roles
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Display Loading Indicator */}
      {loading ? (
        <p className="text-xl font-semibold text-blue-600">Loading user information...</p>
      ) : error ? (
        // Display Error Message
        <p className="text-xl font-semibold text-red-600">{error}</p>
      ) : (
        // Display User Info and Role-Specific Dashboard
        <>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome, {userInfo.username || "Guest"}!
          </h1>
          <p className="text-xl mb-8">Role: {userInfo.role}</p>
          <div className="w-full">{renderDashboard()}</div>
        </>
      )}
    </div>
  );
};

export default Dashboard;