import styled from 'styled-components';

export const Container = styled('div')({
  display: 'flex',
  flexGrow: 0,
  backgroundColor: 'rgb(143, 82, 204, 15%)',
  height: ' 108%',
  padding: '24px',
  flexDirection: 'column',
});

export const UserWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '12px',
});

export const ButtonsWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '24px',
  gap: '24px',
});

export const ButtonsContent = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
});
