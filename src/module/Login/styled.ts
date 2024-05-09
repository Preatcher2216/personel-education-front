import { TextInput } from '@gravity-ui/uikit';
import styled from 'styled-components';

export const Wrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '24px',
});

export const Center = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
});

export const InputWrapper = styled(TextInput)({
  minWidth: '340px',
  maxWidth: 'max-content',
});
