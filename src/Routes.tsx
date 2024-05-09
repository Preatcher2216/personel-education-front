import { Route, Routes } from 'react-router-dom';
import { Login, UsersDashboard } from './module';

export const EducationRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/dashboard' element={<UsersDashboard />} />
    </Routes>
  );
};
