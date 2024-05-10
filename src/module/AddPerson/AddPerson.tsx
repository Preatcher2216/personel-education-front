import { Icon, Label, Text, User, Breadcrumbs } from '@gravity-ui/uikit';
import { Magnifier, CirclePlus, FloppyDisk } from '@gravity-ui/icons';

import { useNavigate } from 'react-router-dom';

import * as Styled from './styled';

const options = [
  { value: 'false', content: 'Не обязательная' },
  { value: 'true', content: 'Обязательная' },
];

export const AddPerson = () => {
  const navigate = useNavigate();

  const breadcrums = [
    {
      text: 'Главная',
      action: () => navigate('/personell/dashboard'),
    },
    {
      text: 'Добавление сотрудника',
      action: () => {},
    },
  ];
  return (
    <Styled.Container>
      <Styled.SearchWrapper>
        <Breadcrumbs items={breadcrums} firstDisplayedItemsCount={1} />
        <Text variant='header-2'>Добавление сотрудника</Text>
        <Styled.SearchInputWrapper
          size='l'
          placeholder='Поиск сотрудника...'
          type='search'
          startContent={
            <Label size='s' icon={<Icon size={16} data={Magnifier} />} />
          }
        />
        <User
          avatar={{ text: 'Вешкин Иван', theme: 'normal' }}
          name='Вешкин Иван'
          description='Старший преподаватель'
          size='l'
        />
      </Styled.SearchWrapper>
      <Styled.CompetenceWrapper>
        <Text variant='header-1'>Добавление компетенции</Text>
        <Styled.SelectCompetenceWrapper>
          <Text variant='subheader-1'>Тип компетенции</Text>
          <Styled.SelectWrapper placeholder='Тип компетенции' />
        </Styled.SelectCompetenceWrapper>
        <Styled.SelectCompetenceWrapper>
          <Text variant='subheader-1'>Название компетенции</Text>
          <Styled.SearchInputWrapper
            size='m'
            placeholder='Название компетенции...'
            type='text'
          />
        </Styled.SelectCompetenceWrapper>
        <Styled.SelectCompetenceWrapper>
          <Text variant='subheader-1'>Описание компетенции</Text>
          <Styled.TextAreaWrapper
            size='m'
            placeholder='Описание компетенции...'
            minRows={2}
          />
        </Styled.SelectCompetenceWrapper>
        <Styled.SelectCompetenceWrapper>
          <Text variant='subheader-1'>Оценка компетенции</Text>
          <Styled.SelectWrapper placeholder='Оценка компетенции' />
        </Styled.SelectCompetenceWrapper>
        <Styled.SelectCompetenceWrapper>
          <Text variant='subheader-1'>Обязательность компетенции</Text>
          <Styled.RadioButtonWrapper
            name='mandatory'
            defaultValue={options[0].value}
            options={options}
          />
        </Styled.SelectCompetenceWrapper>

        <Styled.DividerWrapper />

        <Styled.AddButton>
          <Styled.ButtonsContent>
            <CirclePlus />
            Добавить компетенцию
          </Styled.ButtonsContent>
        </Styled.AddButton>

        <Styled.SaveButton>
          <Styled.ButtonsContent>
            <FloppyDisk />
            Сохранить
          </Styled.ButtonsContent>
        </Styled.SaveButton>
      </Styled.CompetenceWrapper>
    </Styled.Container>
  );
};
