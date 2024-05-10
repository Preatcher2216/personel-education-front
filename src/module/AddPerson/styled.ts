import styled from 'styled-components';

import {
  TextInput,
  Select,
  Button,
  Divider,
  TextArea,
  RadioButton,
} from '@gravity-ui/uikit';

export const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 12,
  padding: '24px',
});

export const SearchInputWrapper = styled(TextInput)({
  minWidth: '500px',
  maxWidth: 'max-content',
});

export const SelectWrapper = styled(Select)({
  minWidth: '500px',
  maxWidth: 'max-content',
});

export const AddButton = styled(Button)({
  minWidth: '200px',
  maxWidth: 'max-content',
});

export const SaveButton = styled(Button)({
  minWidth: '200px',
  maxWidth: 'max-content',
  marginBottom: '24px',
});

export const DividerWrapper = styled(Divider)({
  minWidth: '500px',
  maxWidth: 'max-content',
});

export const TextAreaWrapper = styled(TextArea)({
  minWidth: '500px',
  maxWidth: 'max-content',
});

export const RadioButtonWrapper = styled(RadioButton)({
  minWidth: '500px',
  maxWidth: 'max-content',
});

export const SearchWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});

export const CompetenceWrapper = styled('div')({
  marginTop: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});

export const SelectCompetenceWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

export const ButtonsContent = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
});
