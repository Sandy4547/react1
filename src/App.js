import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { Route, BrowserRouter, Routes, Outlet, Navigate, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Account from './pages/Account';
import About from './pages/About';
import Contact from './pages/Contact';
import Register from './pages/register';
import Login from './pages/Login';
import { AuthProvider, useAuth } from './AuthProvider';
import MyBlog from './pages/MyBlog';
import AddBlog from './pages/AddBlog';
import EditBlog from './pages/EditBlog';


const LayoutAdmin = () => {

  return (
    <ProtectedRoute>
     <div className="flex">
     <Sidebar />
     <div className="flex-1">
      <Header />
      <div className="m-6 p-10 bg-gray-50 min-h-screen rounded-lg">
       <Outlet /> {/* Outlet  คือส่วนที่จะแสดงคอมโพเน้นลูกในธีมของแอดมิน */}
      </div>
     </div>
    </div>
    </ProtectedRoute>

   );
 
 }

 const ProtectedRoute = ({ children }) => {

  const { user } = useAuth();
 
  const location = useLocation();
 
 
 
  if (!user) {
 
   return <Navigate to="/login" state={{ from: location }} replace />;
 
  }
 
  return children;
 
 };


function App() {
  return (
    <AuthProvider>
              <BrowserRouter>
              <Routes>
                <Route element={<LayoutAdmin />}>
                <Route path='/' element={<Dashboard />} />
                <Route path='/Account' element={<Account />} />
                <Route path='/users' element={<Users />} />
                <Route path='/About' element={<About />} />
                <Route path='/myblog' element={<MyBlog />} />
                <Route path='/new-post' element={<AddBlog/>} />
                <Route path='/edit-post/:id' element={<EditBlog/>} />
        </Route>
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter> 
    </AuthProvider>

  );
}

export default App;