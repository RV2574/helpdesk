import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import TicketList from "./pages/TicketList";
import TicketDetails from "./pages/TicketDetails";
import Registration from "./pages/Registration"; // Import Registration page
import CreateTicket from "./pages/CreateTicket"; // Import CreateTicket page
import Home from "./pages/Home"; // Import Home page

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Home />} /> {/* Add Home route */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} /> {/* Add Registration route */}

        {/* Protected Route for Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Protected Routes for Tickets */}
        <Route
          path="/tickets"
          element={
            <ProtectedRoute>
              <TicketList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tickets/:id"
          element={
            <ProtectedRoute>
              <TicketDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tickets/create"
          element={
            <ProtectedRoute>
              <CreateTicket />
            </ProtectedRoute>
          }
        /> {/* Add CreateTicket route */}
      </Routes>
    </Router>
  );
}

export default App;