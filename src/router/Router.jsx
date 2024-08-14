import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NoHeaderLayout from "../layout/NoHeaderLayout";
import Layout from "../layout/Layout";
import Home from "../page/Home";
import About from "../page/About";
import Login from "../page/Login";
import BoardTitle from "../page/BoardTitle";
import CommentTitle from "../commenttitle/Commenttitle";
import UserDataUserAuth from "../userdata/UserDataUserAuth";
import RedirectIfAuthenticated from "../page/RedirectiAuthenticated";
import Authenticated from "../page/Authenticated";
import VerifyEmail from "../forgetpassword/VerifyEmail";
import Otp from "../forgetpassword/Otp";
import ResetPassword from "../forgetpassword/ResetPasswordForm";
import History from "../page/History";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Authenticated>
        <Layout />
      </Authenticated>
    ),
    children: [
      { path: "", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "boardtitle", element: <BoardTitle /> },
      { path: "userdata/:userId", element: <UserDataUserAuth /> },

      {
        path: "*",
        element: (
          <div className="flex justify-center">
            <h1 className={`text-white pt-56 text-9xl animate-pulse`}>
              404 PATH NOT FOUND
            </h1>
          </div>
        ),
      },
    ],
  },
  {
    path: "boardtitle/commenttitle/:titleId",
    element: (
      <Authenticated>
        <NoHeaderLayout />
      </Authenticated>
    ),
    children: [{ path: "", element: <CommentTitle /> }],
  },
  {
    path: "userdata/history/:userId",
    element: (
      <Authenticated>
        <NoHeaderLayout />
      </Authenticated>
    ),
    children: [{ path: "", element: <History /> }],
  },
  {
    path: "/login",
    element: (
      <RedirectIfAuthenticated>
        <Login />
      </RedirectIfAuthenticated>
    ),
  },
  {
    path: "/verifyemail",
    element: <VerifyEmail />,
  },
  {
    path: "/otp",
    element: <Otp />,
  },
  {
    path: "/resetpassword",
    element: <ResetPassword />,
  },
]);

export default function Routh() {
  return <RouterProvider router={router} />;
}
