import { Route, Routes } from 'react-router-dom';
import { Layout, Login, UsersDashboard } from './module';

export const EducationRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/personell' element={<Layout />}>
        <Route path='dashboard' element={<UsersDashboard />} />
      </Route>
    </Routes>
  );
};
