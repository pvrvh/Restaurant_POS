import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Home, Auth, Orders, Table } from "./pages";
import  Header  from "./components/shared/Header";
import BottomNav from "./components/shared/BottomNav";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <Router>
      {isAuthenticated && <Header />}
      <Routes>
        <Route 
          path="/auth" 
          element={isAuthenticated ? <Navigate to="/" replace /> : <Auth />} 
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/table"
          element={
            <ProtectedRoute>
              <Table />
            </ProtectedRoute>
          }
        />
        <Route 
          path="*" 
          element={<Navigate to={isAuthenticated ? "/" : "/auth"} replace />} 
        />
      </Routes>
      {isAuthenticated && <BottomNav />}
    </Router>
  );
}
export default App;