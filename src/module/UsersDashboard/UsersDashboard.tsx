import { Divider, Icon, Label, withTableActions } from '@gravity-ui/uikit';
import { Button } from '@gravity-ui/uikit';
import { Table } from '@gravity-ui/uikit';

import { Funnel } from '@gravity-ui/icons';
import { Magnifier } from '@gravity-ui/icons';
import { BarsDescendingAlignCenter } from '@gravity-ui/icons';

import * as Styled from './styled';

const ProgressNode = () => {
  return <div>test</div>;
};

const data = [
  {
    fio: 'Вешкин Иван Николаевич',
    grade: 'Старший преподаватель',
    progress: 80,
  },
  {
    fio: 'Вешкин Иван Николаевич',
    grade: 'Старший преподаватель',
    progress: 10,
  },
  ,
];

const columns = [
  { id: 'fio', name: 'ФИО', width: '362px' },
  { id: 'grade', name: 'Должность', width: '362px' },
  {
    id: 'progress',
    name: 'Освоение компетенций',
    width: '362px',
    align: 'center',
    // template: () => ProgressNode,
  },
];

const getRowActions = () => {
  return [
    {
      text: 'Отчет по сотруднику',
      handler: () => {},
    },
    {
      text: 'Редактировать сотрудника',
      handler: () => {},
    },
    {
      text: 'Удалить сотрудника',
      handler: () => {},
      theme: 'danger',
    },
  ];
};

const MyTable = withTableActions(Table);

export const UsersDashboard = () => {
  return (
    <Styled.Container>
      <Styled.SearchBlock>
        <Styled.SearchGroup>
          <Styled.SearchWrapper
            size='l'
            placeholder='Введите имя или фамилию...'
            type='search'
            startContent={
              <Label size='s' icon={<Icon size={16} data={Magnifier} />} />
            }
          />
          <Styled.SearchButtons>
            <Button size='l'>
              <Styled.ButtonsContent>
                <Funnel />
                Фильтры
              </Styled.ButtonsContent>
            </Button>
            <Button size='l'>
              <Styled.ButtonsContent>
                <BarsDescendingAlignCenter />
                Сортировка
              </Styled.ButtonsContent>
            </Button>
          </Styled.SearchButtons>
        </Styled.SearchGroup>

        <Divider style={{ width: '100%' }} />
      </Styled.SearchBlock>
      <Styled.TableBlock>
        <MyTable data={data} columns={columns} getRowActions={getRowActions} />
      </Styled.TableBlock>
    </Styled.Container>
  );
};
