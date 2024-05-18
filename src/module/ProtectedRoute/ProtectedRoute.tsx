import { useAtom } from '@reatom/npm-react';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { authAtom } from '../../data/user';

type ProtectedRouteType = {
  redirectPath?: string;
  children: React.ReactNode;
};

export const ProtectedRoute = ({
  redirectPath = '/',
  children,
}: ProtectedRouteType) => {
  const [auth] = useAtom(authAtom);

  if (!auth) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};
