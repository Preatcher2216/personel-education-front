import { RadioButton, Select, TextArea, TextInput } from '@gravity-ui/uikit';
import styled from 'styled-components';

export const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 12,
  padding: '24px',
});

export const CompetenciesHeader = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});

export const CompetenciesDiagram = styled('div')({
  marginTop: '24px',
});

export const TextAreaWrapper = styled(TextArea)({
  minWidth: '500px',
  maxWidth: 'max-content',
});

export const ModalWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
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

export const SelectCompetenceWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

export const RadioButtonWrapper = styled(RadioButton)({
  minWidth: '500px',
  maxWidth: 'max-content',
});
