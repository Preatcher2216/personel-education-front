import { Breadcrumbs, Table, withTableActions } from '@gravity-ui/uikit';
import { Progress } from '@gravity-ui/uikit';
import { useNavigate } from 'react-router-dom';

import * as Styled from './styled';

const data = [
  {
    id: 1,
    competence: 'играть на гитаре',
    status: 'закрыта',
    date: '01.02.2003',
  },
  {
    id: 2,
    competence: 'писать код',
    status: 'в процессе',
    date: '01.02.2003',
  },
  ,
];

const columns = [
  {
    id: 'competence',
    name: 'Компетенция',
    width: '362px',
    className: 'competenciesTable',
  },
  {
    id: 'status',
    name: 'Статус',
    width: '362px',
    className: 'competenciesTable',
  },
  {
    id: 'date',
    name: 'Дата изменения',
    width: '362px',
    align: 'center',
    className: 'competenciesTable',
    // template: () => ProgressNode,
  },
];

const getRowActions = () => {
  return [
    {
      text: 'Добавить оценку',
      handler: (item) => {
        console.log('item', item);
      },
    },
    {
      text: 'Удалить компетенцию',
      handler: () => {},
      theme: 'danger',
    },
  ];
};

const MyTable = withTableActions(Table);

export const Competencies = () => {
  const navigate = useNavigate();

  const breadcrums = [
    {
      text: 'Главная',
      action: () => navigate('/personell/dashboard'),
    },
    {
      text: 'ФИО',
      action: () => {},
    },
  ];

  return (
    <Styled.Container>
      <Styled.CompetenciesHeader>
        <Breadcrumbs items={breadcrums} firstDisplayedItemsCount={1} />
        <Progress text='Закрытие компетенций' theme='success' value={20} />
      </Styled.CompetenciesHeader>
      <Styled.CompetenciesDiagram>
        <MyTable
          data={data}
          columns={columns}
          getRowActions={getRowActions}
          onRowClick={(item) => {
            console.log(item);
          }}
        />
      </Styled.CompetenciesDiagram>
    </Styled.Container>
  );
};
