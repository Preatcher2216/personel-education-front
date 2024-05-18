import { Route, Routes } from 'react-router-dom';
import {
  Competencies,
  Layout,
  Login,
  UsersDashboard,
  AddPerson,
} from './module';
import { ProtectedRoute } from './module/ProtectedRoute';
import { useAtom } from '@reatom/npm-react';
import { authAtom } from './data/user';
import { useEffect } from 'react';
import { check } from './api';

export const EducationRoutes = () => {
  const [, setAuth] = useAtom(authAtom);

  useEffect(() => {
    check().then(() => {
      setAuth(true);
    });
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route
        path='/personell'
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path='dashboard' element={<UsersDashboard />} />
        <Route path='competencies' element={<Competencies />} />
        <Route path='add' element={<AddPerson />} />
      </Route>
    </Routes>
  );
};
