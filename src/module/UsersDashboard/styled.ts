import { TextInput } from '@gravity-ui/uikit';
import styled from 'styled-components';

export const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 12,
  padding: '24px',
});

export const SearchBlock = styled('div')({
  width: '100%',
  height: 'fit-content',
  display: 'flex',
  flexDirection: 'column',
  gap: '27px',
});

export const SearchWrapper = styled(TextInput)({
  display: 'flex',
  height: 'fit-content',
  minWidth: '500px',
  maxWidth: 'max-content',
});

export const SearchButtons = styled('div')({ display: 'flex', gap: '24px' });

export const SearchGroup = styled('div')({
  display: 'flex',
  width: '100%',
  height: 'fit-content',
  justifyContent: 'space-between',
});

export const ButtonsContent = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
});

export const TableBlock = styled('div')({
  marginTop: '24px',
});

export const ModalWrapper = styled('div')({
  minWidth: '300px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  padding: '24px',
});
