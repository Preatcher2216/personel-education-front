import { Icon, Label, Text, User, Breadcrumbs } from '@gravity-ui/uikit';
import { Magnifier, CirclePlus, FloppyDisk } from '@gravity-ui/icons';

import { useNavigate } from 'react-router-dom';

import * as Styled from './styled';
import { useEffect, useState } from 'react';
import {
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
  const [position, setPosition] = useState([]);
  const [role, setRole] = useState([]);

  const [selectedPersonel, setSelectedPersonel] = useState(null);
  const [selectedPostion, setSelectedPostion] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  const [selectedTitle, setSelectedTitle] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState(null);
  const [selectedMandatory, setSelectedMandatory] = useState(null);
  const [selectedRate, setSelectedRate] = useState(null);
  const [test, setTest] = useState(new Map());

  const [competenceCount, setCompetenceCount] = useState(1);

  console.log('selectedTitle', selectedTitle);
  console.log('selectedDescription', selectedDescription);
  console.log('selectedMandatory', selectedMandatory);
  console.log('selectedRate', selectedRate);

  console.log('test', test);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllPersonel = async () => {
      const res = await getAllPersonel();

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
          onUpdate={(val) => setSelectedTitle(val)}
        />
      </Styled.SelectCompetenceWrapper>
      <Styled.SelectCompetenceWrapper>
        <Text variant='subheader-1'>Описание компетенции</Text>
        <Styled.TextAreaWrapper
          id={`description=${index}`}
          size='m'
          placeholder='Описание компетенции...'
          minRows={2}
          onUpdate={(val) => setSelectedDescription(val)}
        />
      </Styled.SelectCompetenceWrapper>
      <Styled.SelectCompetenceWrapper>
        <Text variant='subheader-1'>Оценка компетенции</Text>
        <Styled.SelectWrapper
          id={`rate=${index} ${selectedRate}`}
          placeholder='Оценка компетенции'
          options={rates}
          onUpdate={(val) => setSelectedRate(val[0])}
        />
      </Styled.SelectCompetenceWrapper>
      <Styled.SelectCompetenceWrapper>
        <Text variant='subheader-1'>Обязательность компетенции</Text>
        <Styled.RadioButtonWrapper
          aria-label={`mandatory=${index} ${selectedMandatory}`}
          name={`mandatory=${index}`}
          defaultValue={options[0].value}
          options={options}
          // onChange={(v) => console.log(v)}
          onUpdate={(val) => {
            // setTest((t) => [
            //   ...t,
            //   {
            //     [index]: {
            //       mandatory: val,
            //     },
            //   },
            // ]);
            setTest((test) => test.set(index, val));
            setSelectedMandatory(val);
          }}
        />
      </Styled.SelectCompetenceWrapper>

      <Styled.DividerWrapper />
    </>
  ));

  console.log(competences);
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
        {/* <Styled.SelectCompetenceWrapper>
          <Text variant='subheader-1'>Тип компетенции</Text>
          <Styled.SelectWrapper placeholder='Тип компетенции' />
        </Styled.SelectCompetenceWrapper> */}
        {/* <Styled.SelectCompetenceWrapper>
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

        <Styled.DividerWrapper /> */}

        {competences}

        <Styled.AddButton
          onClick={() => {
            // const title = document.getElementById(`title=0`);
            // const description = document.getElementById(`description=0`);
            // const rate = document.getElementById(`rate=0`);
            // const mandatory = document.getElementById(`mandatory=0`);
            // console.log(title.value);
            // console.log(description.value);
            // console.log(rate.value);
            // console.log(mandatory.value);

            setCompetenceCount((count) => count + 1);
          }}
        >
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
