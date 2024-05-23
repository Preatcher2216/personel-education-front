import { Text, Breadcrumbs } from '@gravity-ui/uikit';
import { CirclePlus, FloppyDisk } from '@gravity-ui/icons';

import { useNavigate } from 'react-router-dom';

import * as Styled from './styled';
import { useEffect, useState } from 'react';
import {
  createCompetence,
  createMatrix,
  createUser,
  getAllPersonel,
  getAllPositions,
  getAllRoles,
} from '../../api/userApi';

const options = [
  { value: 'false', content: 'Не обязательная' },
  { value: 'true', content: 'Обязательная' },
];

const rates = [
  {
    value: 1,
    content: 1,
  },
  {
    value: 2,
    content: 2,
  },
  {
    value: 3,
    content: 3,
  },
  {
    value: 4,
    content: 4,
  },
  {
    value: 5,
    content: 5,
  },
];

export const AddPerson = () => {
  const [personel, setPersonel] = useState([]);
  const [rawPersonel, setRawPersonel] = useState([]);
  const [position, setPosition] = useState([]);
  const [role, setRole] = useState([]);

  const [selectedPersonel, setSelectedPersonel] = useState(null);
  const [selectedPostion, setSelectedPostion] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  const [selectedTitle, setSelectedTitle] = useState(new Map());
  const [selectedDescription, setSelectedDescription] = useState(new Map());
  const [selectedMandatory, setSelectedMandatory] = useState(new Map());
  const [selectedRate, setSelectedRate] = useState(new Map());

  const [error, setError] = useState(null);

  const [competenceCount, setCompetenceCount] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllPersonel = async () => {
      const res = await getAllPersonel();

      setRawPersonel(res);

      const preparedPersonel = res.map((p) => ({
        value: p.id,
        content: `${p.firstName} ${p.lastName} ${p.surName}`,
      }));

      setPersonel(preparedPersonel);
    };

    fetchAllPersonel();
  }, []);

  useEffect(() => {
    const fetchAllPosition = async () => {
      const res = await getAllPositions();

      const preparedPosition = res.map((p) => ({
        value: p.id,
        content: p.title,
      }));

      setPosition(preparedPosition);
    };

    fetchAllPosition();
  }, []);

  useEffect(() => {
    const fetchAllRole = async () => {
      const res = await getAllRoles();

      const preparedRole = res.map((r) => ({
        value: r.id,
        content: r.title,
      }));

      setRole(preparedRole);
    };

    fetchAllRole();
  }, []);

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

  const competences = Array.from({ length: competenceCount }, (_, index) => (
    <>
      <Styled.SelectCompetenceWrapper>
        <Text variant='subheader-1'>Название компетенции</Text>
        <Styled.SearchInputWrapper
          id={`title=${index}`}
          size='m'
          placeholder='Название компетенции...'
          type='text'
          onUpdate={(val) =>
            setSelectedTitle((titles) => titles.set(index, val))
          }
        />
      </Styled.SelectCompetenceWrapper>
      <Styled.SelectCompetenceWrapper>
        <Text variant='subheader-1'>Описание компетенции</Text>
        <Styled.TextAreaWrapper
          id={`description=${index}`}
          size='m'
          placeholder='Описание компетенции...'
          minRows={2}
          onUpdate={(val) =>
            setSelectedDescription((descriptions) =>
              descriptions.set(index, val)
            )
          }
        />
      </Styled.SelectCompetenceWrapper>
      <Styled.SelectCompetenceWrapper>
        <Text variant='subheader-1'>Оценка компетенции</Text>
        <Styled.SelectWrapper
          id={`rate=${index} ${selectedRate}`}
          placeholder='Оценка компетенции'
          options={rates}
          onUpdate={(val) =>
            setSelectedRate((rates) => rates.set(index, val[0]))
          }
        />
      </Styled.SelectCompetenceWrapper>
      <Styled.SelectCompetenceWrapper>
        <Text variant='subheader-1'>Обязательность компетенции</Text>
        <Styled.RadioButtonWrapper
          name={`mandatory=${index}`}
          defaultValue={options[0].value}
          options={options}
          onUpdate={(val) => {
            setSelectedMandatory((mandatories) => mandatories.set(index, val));
          }}
        />
      </Styled.SelectCompetenceWrapper>

      <Styled.DividerWrapper />
    </>
  ));

  const prepareData = async () => {
    try {
      const matrix = await createMatrix(competences.length);

      const personelData = rawPersonel.find((p) => p.id === selectedPersonel);

      const rawUser = {
        ...personelData,
        avatar: '',
        personelId: personelData.id,
        positionId: selectedPostion,
        roleId: selectedRole,
        matrixId: matrix.id,
      };

      delete rawUser.id;
      delete rawUser.createdAt;
      delete rawUser.updatedAt;

      const user = await createUser(rawUser);

      const competencesData = competences.map((_, index) => {
        return {
          title: selectedTitle.get(index),
          description: selectedDescription.get(index),
          rate: selectedRate.get(index),
          rang: 0,
          matrixId: matrix.id,
          competenceTypeId: selectedMandatory.get(index) === 'true' ? 2 : 1,
        };
      });

      const [competencesPromises] = await Promise.all([
        competencesData.map((c) => createCompetence(c)),
      ]);

      const competencesResponce = await Promise.all(competencesPromises);

      navigate('/personell/dashboard');

      console.log('competencesData', competencesData);
    } catch (e) {
      setError(e);
    }
  };

  return (
    <Styled.Container>
      <Styled.SearchWrapper>
        <Breadcrumbs items={breadcrums} firstDisplayedItemsCount={1} />
        <Text variant='header-2'>Добавление сотрудника</Text>
        <Styled.SelectWrapper
          options={personel}
          filterable
          placeholder='Выберите сотрудника'
          onUpdate={(val) => setSelectedPersonel(val[0])}
        />
        <Styled.SelectWrapper
          options={position}
          filterable
          placeholder='Выберите должность'
          onUpdate={(val) => setSelectedPostion(val[0])}
        />
        <Styled.SelectWrapper
          options={role}
          filterable
          placeholder='Выберите роль'
          onUpdate={(val) => setSelectedRole(val[0])}
        />
      </Styled.SearchWrapper>
      <Styled.CompetenceWrapper>
        <Text variant='header-1'>Добавление компетенции</Text>

        {competences}

        <Styled.AddButton
          onClick={() => {
            setCompetenceCount((count) => count + 1);
          }}
        >
          <Styled.ButtonsContent>
            <CirclePlus />
            Добавить компетенцию
          </Styled.ButtonsContent>
        </Styled.AddButton>

        <Styled.SaveButton onClick={prepareData}>
          <Styled.ButtonsContent>
            <FloppyDisk />
            Сохранить
          </Styled.ButtonsContent>
        </Styled.SaveButton>
      </Styled.CompetenceWrapper>
    </Styled.Container>
  );
};
