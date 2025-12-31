import { Routes, Route } from 'react-router';
import Nav from './components/nav';
import HomePage from './pages/home';
import Projects from './pages/projects/projects';
import AddProject from './pages/projects/create_project';
import EditProject from './pages/projects/edit_project';
import Users from './pages/users/users';
import AddUser from './pages/users/create_user';
import EditUser from './pages/users/edit_user';
import toast from 'react-hot-toast';

const App = () => {
  return (
    <div data-theme="synthwave">
      <Routes>
        <Route path='/'  element={<HomePage />} />    
        <Route path='/projects' element={<Projects />} />   
        <Route path='/projects/:projectid' element={<EditProject />} />        
        <Route path='/projects/add' element={<AddProject />} />        
        <Route path='/users' element={<Users />} />   
        <Route path='/users/:userid' element={<EditUser />} />        
        <Route path='/users/add' element={<AddUser />} />            
      </Routes>
    </div>
  )
};

export default App;