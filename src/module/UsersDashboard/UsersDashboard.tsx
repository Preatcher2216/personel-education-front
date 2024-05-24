// @ts-nocheck

import {
  Divider,
  Icon,
  Label,
  withTableActions,
  withTableSorting,
  Button,
  Table,
  Modal,
  Text,
  Select,
} from '@gravity-ui/uikit';

import { Funnel, Magnifier } from '@gravity-ui/icons';

import * as Styled from './styled';
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import {
  deleteUser,
  getAllPositions,
  getUserTableData,
  getUsers,
} from '../../api/userApi';

const columns = [
  {
    id: 'fio',
    name: 'ФИО',
    width: '362px',
    className: 'userTable',
    sortable: true,
    meta: {
      defaultSortOrder: 'desc',
      sort: (a, b) => {
        return a.fio < b.fio;
      },
    },
  },
  {
    id: 'grade',
    name: 'Должность',
    width: '362px',
    className: 'userTable',
    sortable: true,
    meta: {
      defaultSortOrder: 'desc',
      sort: (a, b) => {
        return (
          Number(a.progress.slice(0, -1)) - Number(b.progress.slice(0, -1))
        );
      },
    },
  },
  {
    id: 'progress',
    name: 'Освоение компетенций',
    width: '362px',
    align: 'center',
    className: 'userTable',
    sortable: true,
    meta: {
      defaultSortOrder: 'desc',
      sort: (a, b) => {
        return a.fio < b.fio;
      },
    },
  },
];

const competenseSelectData = [
  { value: 25, content: 'Освоено больше 25%' },
  { value: 50, content: 'Освоено больше 50%' },
  { value: 75, content: 'Освоено больше 75%' },
];

const MyTable = withTableSorting(withTableActions(Table));

export const UsersDashboard = () => {
  const [users, setUsers] = useState([]);
  const [positions, setPositions] = useState([]);
  const [query, setQuery] = useState('');
  const [isFilterEnabled, setIsFilterEnabled] = useState(false);

  const [selectedPosition, setSelectedPosition] = useState(null);
  const [selectedComplete, setSelectedComplete] = useState(null);

  const navigate = useNavigate();

  const getRowActions = () => {
    return [
      {
        text: 'Удалить сотрудника',
        handler: async (item) => {
          const res1 = await deleteUser(item.id);

          const res = await getUsers();

          const tableData = await getUserTableData(res.users);

          setUsers(tableData);
        },
        theme: 'danger',
      },
    ];
  };

  const rows = users.map((u) => ({
    id: u.id,
    fio: u.fio,
    grade: u.grade.title,
    progress: Number(u.progress.completePersent).toFixed() + '%',
    gradeNumber: u.grade.rang,
  }));

  const positionsMap = new Map(positions.map((p) => [p.value, p]));

  const searchUsers = useMemo(() => {
    return rows.filter((u) => {
      const lowQuery = query.toLowerCase();
      const lowFio = u?.fio?.toLowerCase();

      return lowFio.includes(lowQuery);
    });
  }, [rows, query]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getUsers();

      const tableData = await getUserTableData(res.users);

      setUsers(tableData);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchPositions = async () => {
      const positions = await getAllPositions();

      const preparedPositions = positions.map((p) => ({
        value: p.rang,
        content: p.title,
      }));

      setPositions(preparedPositions);
    };

    fetchPositions();
  }, []);

  const filteredUser = useMemo(() => {
    if (selectedComplete && typeof selectedPosition === 'number') {
      const filterdCompetenceAndPosition = rows
        .filter((u) => u.gradeNumber === selectedPosition)
        .filter((u) => {
          return Number(u.progress.slice(0, -1)) >= selectedComplete;
        });

      return filterdCompetenceAndPosition || [];
    }

    if (typeof selectedPosition === 'number') {
      const filterdPosition = rows.filter(
        (u) => u.gradeNumber === selectedPosition
      );

      return filterdPosition || [];
    }

    if (selectedComplete) {
      const filterdCompetence = rows.filter((u) => {
        return Number(u.progress.slice(0, -1)) >= selectedComplete;
      });

      return filterdCompetence || [];
    }

    return rows;
  }, [rows, selectedPosition, selectedComplete]);

  const isFilterEnable =
    selectedComplete || typeof selectedPosition === 'number';

  return (
    <Styled.Container>
      <Styled.SearchBlock>
        <Styled.SearchGroup>
          <Styled.SearchWrapper
            size='l'
            placeholder='Введите имя или фамилию...'
            type='search'
            onChange={(e) => setQuery(e.target.value)}
            startContent={
              <Label size='s' icon={<Icon size={16} data={Magnifier} />} />
            }
          />
          <Styled.SearchButtons>
            <Button size='l' onClick={() => setIsFilterEnabled(true)}>
              <Styled.ButtonsContent>
                <Funnel />
                Фильтры
              </Styled.ButtonsContent>
            </Button>
          </Styled.SearchButtons>
        </Styled.SearchGroup>

        <Divider style={{ width: '100%' }} />
      </Styled.SearchBlock>
      <Styled.TableBlock>
        <MyTable
          data={isFilterEnable ? filteredUser : query ? searchUsers : rows}
          columns={columns}
          getRowActions={getRowActions}
          onRowClick={(data) => {
            navigate(`/personell/competencies?id=${data.id}`);
          }}
        />
      </Styled.TableBlock>

      <Modal open={isFilterEnabled} onClose={() => setIsFilterEnabled(false)}>
        <Styled.ModalWrapper>
          <Text variant='subheader-3'>Фильтры</Text>
          <Select
            hasClear
            value={[positionsMap.get(selectedPosition)?.content]}
            options={positions}
            onUpdate={(val) => setSelectedPosition(val[0])}
            placeholder='Должность сотрудника...'
          />
          <Select
            hasClear
            value={
              selectedComplete ? [`Освоено больше ${selectedComplete}%`] : []
            }
            options={competenseSelectData}
            onUpdate={(val) => setSelectedComplete(val[0])}
            placeholder='Освоение компетенций...'
          />
        </Styled.ModalWrapper>
      </Modal>
    </Styled.Container>
  );
};
