import { Route, Routes } from "react-router-dom";
import Leaderboard from "./components/pages/studentPortal/Leaderboard";
import StudentLogin from "./components/pages/studentPortal/StudentLogin";
import StudentRegistration from "./components/pages/studentPortal/StudentRegistration";
import CoursePlayer from "./components/pages/studentPortal/CoursePlayer";
import AdminLogin from "./components/pages/admin/AdminLogin";
import Assignments from "./components/pages/admin/Assignments";
import Dashboard from "./components/pages/admin/Dashboard";
import Videos from "./components/pages/admin/Videos";
import AdminQuizz from "./components/pages/admin/Quizz";
import useAuthCheck from "./hooks/useAuthCheck";
import PublicRoute from "./components/protectedRoute/PublicRoute";
import AdminRoute from "./components/protectedRoute/AdminRoute";
import StudentRoute from "./components/protectedRoute/StudentRoute";
import Quizz from "./components/pages/studentPortal/Quizz";
import MyAssignment from "./components/pages/studentPortal/MyAssignment";
import AddVideo from "./components/pages/admin/AddVideo";
import EditVideo from "./components/pages/admin/EditVideo";
import AddAssignment from "./components/pages/admin/AddAssignment";
import EditAssignment from "./components/pages/admin/EditAssignment";
import AssignmentMarks from "./components/pages/admin/AssignmentMarks";
import AddQuizz from "./components/pages/admin/AddQuizz";
import EditQuizz from "./components/pages/admin/EditQuizz";


function App() {
  const authChecked = useAuthCheck();
  return authChecked ? (
    <Routes>
      {/* public routes */}
      <Route path="/registration" element={<PublicRoute> <StudentRegistration /> </PublicRoute>} />
      <Route path="/" element={<PublicRoute><StudentLogin /></PublicRoute>} />
      <Route path="/admin" element={<PublicRoute><AdminLogin /></PublicRoute>} />

      {/* protected student routes */}
      <Route path="/courseplayer/:videoId" element={<StudentRoute><CoursePlayer /></StudentRoute>} />
      <Route path="/courseplayer/:videoId/quizz" element={<StudentRoute><Quizz /></StudentRoute>} />
      <Route path="/courseplayer/:videoId/assignment" element={<StudentRoute><MyAssignment /></StudentRoute>} />
      <Route path="/leaderboard" element={<StudentRoute><Leaderboard /></StudentRoute>} />

      {/* protected admin routes */}
      <Route path="/admin/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
      <Route path="/admin/videos" element={<AdminRoute><Videos /></AdminRoute>} />
      <Route path="/admin/videos/add" element={<AdminRoute><AddVideo /></AdminRoute>} />
      <Route path="/admin/videos/:videoId/edit" element={<AdminRoute><EditVideo /></AdminRoute>} />
      <Route path="/admin/quizzes" element={<AdminRoute><AdminQuizz /></AdminRoute>} />
      <Route path="/admin/quizzes/add" element={<AdminRoute><AddQuizz /></AdminRoute>} />
      <Route path="/admin/quizzes/:quizzId/edit" element={<AdminRoute><EditQuizz /></AdminRoute>} />
      <Route path="/admin/assignments" element={<AdminRoute><Assignments /></AdminRoute>} />
      <Route path="/admin/assignments/add" element={<AdminRoute><AddAssignment /></AdminRoute>} />
      <Route path="/admin/assignments/:assignmentId/edit" element={<AdminRoute><EditAssignment /></AdminRoute>} />
      <Route path="/admin/assignmentmarks" element={<AdminRoute><AssignmentMarks /></AdminRoute>} />
    </Routes>
  )
    :
    <div className="text-violet-600">Checking Authentication...</div>
}

export default App;
