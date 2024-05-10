import { Outlet } from 'react-router-dom';
import { NavigationMenu } from '../NavigationMenu';
import * as Styled from './styled';

export const Layout = () => {
  return (
    <Styled.Wrapper>
      <NavigationMenu />
      <Outlet />
    </Styled.Wrapper>
  );
};
