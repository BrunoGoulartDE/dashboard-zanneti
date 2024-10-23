import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import GymPage from "../pages/profile/GymPage";
import ProfilePage from "../pages/profile/gym/ProfilePage";
import SignIn from "../pages/public/SignIn";
import CreateAcademyPage from "../pages/create-academy/CreateAcademyPage";
import PlansPage from "../pages/profile/plans/Plans";
import AcademyPage from "../pages/classes/AcademyPage";
import ClassesPage from "../pages/classes/classes/ClassesPage";
import StudentsPage from "../pages/students/StudentsPage";
import ViewStudentPage from "../pages/students/view/ViewStudentPage";
import ViewClassPage from "../pages/classes/classes/classRom/ViewClassPage";
import StudentsManagementPage from "../pages/classes/classes/classRom/StudentsManagementPage";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <App />,
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/profile",
    element: <GymPage />,
  },
  {
    path: "/profile/gym",
    element: <ProfilePage />,
  },
  {
    path: "/profile/plans",
    element: <PlansPage />,
  },

  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/create-academy",
    element: <CreateAcademyPage />,
  },
  {
    path: "/academy",
    element: <AcademyPage />,
  },
  {
    path: "/academy/classes",
    element: <ClassesPage />,
  },
  {
    path: "/academy/classes/view/:id",
    element: <ViewClassPage />,
  },
  {
    path: "/academy/classes/:id/students-management",
    element: <StudentsManagementPage />,
  },
  {
    path: "/students",
    element: <StudentsPage />,
  },
  {
    path: "/students/view/:id",
    element: <ViewStudentPage />,
  },
]);

export default router;
