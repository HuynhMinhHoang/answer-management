import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";
import User from "./components/User/User";
import Admin from "./components/Admin/Admin";
import HomePage from "./components/Home/HomePage";
import ManageUser from "./components/Admin/Content/ManageUser";
import DashBoard from "./components/Admin/Content/DashBoard";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ListQuizz from "./components/User/ListQuizz";
import DetailQuizz from "./components/User/DetailQuizz";
import ManageQuizz from "./components/Admin/Content/Quizz/ManageQuizz";
import ManageQuestion from "./components/Admin/Content/Question/ManageQuestion";
import AssignQuizz from "./components/Admin/Content/Quizz/Assign/AssignQuizz";
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateProfile from "./components/User/Profile/UpdateProfile";
import HistoryQuizz from "./components/User/HistoryQuizz";

const Layout = () => {
  const NotFound = () => {
    return <h1>404</h1>;
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* user */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route
            path="users"
            element={
              <PrivateRoute>
                <ListQuizz />
              </PrivateRoute>
            }
          />
          <Route
            path="/quizz/:id"
            element={
              <PrivateRoute>
                <DetailQuizz />
              </PrivateRoute>
            }
          />

          <Route
            path="/history-quizz"
            element={
              <PrivateRoute>
                <HistoryQuizz />
              </PrivateRoute>
            }
          />
        </Route>

        {/* admin */}
        <Route
          path="/admins"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        >
          <Route index element={<DashBoard />} />
          <Route path="manage-users" element={<ManageUser />} />
          <Route path="manage-quizz" element={<ManageQuizz />} />
          <Route path="manage-question" element={<ManageQuestion />} />
          <Route path="manage-assign-quizz" element={<AssignQuizz />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Suspense>
  );
};

export default Layout;
