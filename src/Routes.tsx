import { Route, Routes } from 'react-router-dom';
import {
  Competencies,
  Layout,
  Login,
  UsersDashboard,
  AddPerson,
} from './module';

export const EducationRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/personell' element={<Layout />}>
        <Route path='dashboard' element={<UsersDashboard />} />
        <Route path='competencies' element={<Competencies />} />
        <Route path='add' element={<AddPerson />} />
      </Route>
    </Routes>
  );
};
