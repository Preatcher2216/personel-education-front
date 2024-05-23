import {
  Breadcrumbs,
  Modal,
  Table,
  withTableActions,
  Text,
  Select,
  Button,
} from '@gravity-ui/uikit';
import { Progress } from '@gravity-ui/uikit';
import { useNavigate, useSearchParams } from 'react-router-dom';

import * as Styled from './styled';
import { useEffect, useState } from 'react';
import {
  createComment,
  createCompetence,
  deleteCompetence,
  getAllPositions,
  getComment,
  getCompetences,
  getUser,
  updateCompetence,
  updateUser,
} from '../../api/userApi';
import { useAtom } from '@reatom/npm-react';
import { positionAtom } from '../../data/user';

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

const MyTable = withTableActions(Table);

export const Competencies = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [modal, setModal] = useAtom(positionAtom);

  const [user, setUser] = useState({});
  const [rawCompetences, setRawCompetences] = useState([]);
  const [competencesTable, setCompetencesTable] = useState([]);
  const [competencesComment, setCompetencesComment] = useState([]);
  const [position, setPosition] = useState([]);
  const [completeCompetence, setCompleteCompetence] = useState(0);
  const [selectCompetence, setSelectCompetence] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);

  const [competenceRate, setCompetenceRate] = useState(null);
  const [competenceDescription, setCompetenceDescription] = useState(null);
  const [competenceComment, setCompetenceComment] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newCompetenceTitle, setNewCompetenceTitle] = useState('');
  const [newCompetenceDescription, setNewCompetenceDescription] = useState('');
  const [newCompetenceRate, setNewCompetenceRate] = useState(null);
  const [newCompetenceMandatory, setNewCompetenceMandatory] = useState(null);

  const [selectedPosition, setSelectedPosition] = useState(null);

  const breadcrums = [
    {
      text: 'Главная',
      action: () => navigate('/personell/dashboard'),
    },
    {
      text: `${user.firstName} ${user.lastName} ${user.surName}`,
      action: () => {},
    },
  ];

  const getRowActions = () => {
    return [
      {
        text: 'Добавить компетенцию',
        handler: (item) => {
          setIsAddModalOpen(true);
        },
      },
      {
        text: 'Удалить компетенцию',
        handler: async (item) => {
          const res = await deleteCompetence(item.id);

          const fetchCompetences = async () => {
            const res = await getCompetences(Number(user.matrixId));

            const prearedCompetenceData = res.map((com) => ({
              id: com.id,
              competence: com.title,
              status: com.rate >= 4 ? 'пройдена' : 'требует прохождения',
              date: new Date(com.updatedAt).toLocaleDateString(),
            }));

            const completeCompetenceCount = res.reduce((acc, cur) => {
              if (cur.rate >= 4) {
                acc++;
              }

              return acc;
            }, 0);

            const competencePersent =
              (completeCompetenceCount / res.length) * 100;

            setRawCompetences(res);
            setCompleteCompetence(competencePersent);
            setCompetencesTable(prearedCompetenceData);
          };

          fetchCompetences();
        },
        theme: 'danger',
      },
    ];
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUser(Number(searchParams.get('id')));

      setUser(res.user);
    };

    fetchUser();
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
    const fetchComments = async () => {
      const res = await getComment(selectCompetence.id);

      setCompetencesComment(res);
    };
    if (selectCompetence?.id) {
      fetchComments();
    }
  }, [selectCompetence]);

  useEffect(() => {
    const fetchCompetences = async () => {
      const res = await getCompetences(Number(user.matrixId));

      const prearedCompetenceData = res.map((com) => ({
        id: com.id,
        matrixId: user.matrixId,
        competence: com.title,
        status: com.rate >= 4 ? 'пройдена' : 'требует прохождения',
        date: new Date(com.updatedAt).toLocaleDateString(),
      }));

      const completeCompetenceCount = res.reduce((acc, cur) => {
        if (cur.rate >= 4) {
          acc++;
        }

        return acc;
      }, 0);

      const competencePersent = (completeCompetenceCount / res.length) * 100;

      setRawCompetences(res);
      setCompleteCompetence(competencePersent);
      setCompetencesTable(prearedCompetenceData);
    };

    if (user.matrixId) {
      fetchCompetences();
    }
  }, [user]);

  return (
    <Styled.Container>
      <Styled.CompetenciesHeader>
        <Breadcrumbs items={breadcrums} firstDisplayedItemsCount={1} />
        <Progress
          text='Закрытие компетенций'
          theme='success'
          value={completeCompetence}
        />
      </Styled.CompetenciesHeader>
      <Styled.CompetenciesDiagram>
        <MyTable
          data={competencesTable}
          columns={columns}
          getRowActions={getRowActions}
          onRowClick={(item) => {
            const selCompetence = rawCompetences.find((c) => c.id === item.id);

            setSelectCompetence(selCompetence);
            setCompetenceRate(
              rates.find((r) => r?.value === selCompetence?.rate)?.value
            );
            setCompetenceDescription(selCompetence?.description);
            setIsModalOpen(true);
          }}
        />

        <Modal
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setIsEditMode(false);
            setCompetenceComment('');
          }}
        >
          <Styled.ModalWrapper>
            <Text variant='subheader-2'>{selectCompetence?.title}</Text>

            <Text variant='subheader-1'>Оценка</Text>

            <Select
              disabled={!isEditMode}
              value={[competenceRate]}
              onUpdate={(val) => setCompetenceRate(val[0])}
              options={rates}
            />

            <Text variant='subheader-1'>Описание</Text>

            <Styled.TextAreaWrapper
              disabled={!isEditMode}
              size='m'
              value={competenceDescription}
              onUpdate={(val) => setCompetenceDescription(val)}
              minRows={2}
            />

            <Text variant='subheader-1'>Комментарии</Text>

            {isEditMode && (
              <Styled.TextAreaWrapper
                id='edit'
                disabled={!isEditMode}
                size='m'
                value={competenceComment}
                placeholder='Добавить комментарий'
                onUpdate={(val) => setCompetenceComment(val)}
                minRows={2}
              />
            )}

            {!isEditMode && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                {competencesComment.length ? (
                  competencesComment.map((comment) => (
                    <Styled.TextAreaWrapper
                      disabled
                      size='m'
                      value={comment?.comment || ''}
                      minRows={2}
                    />
                  ))
                ) : (
                  <Styled.TextAreaWrapper
                    disabled
                    size='m'
                    value={'Комментариев пока нет :('}
                    minRows={2}
                  />
                )}
              </div>
            )}
            {isEditMode ? (
              <Button
                onClick={async () => {
                  const competenceRes = await updateCompetence({
                    id: selectCompetence.id,
                    description: competenceDescription,
                    rate: competenceRate,
                  });
                  if (competenceComment) {
                    const commentRes = await createComment({
                      comment: competenceComment,
                      competenceId: selectCompetence.id,
                      change_date: Date.now(),
                    });
                  }

                  const fetchCompetences = async () => {
                    const res = await getCompetences(Number(user.matrixId));

                    const prearedCompetenceData = res.map((com) => ({
                      id: com.id,
                      competence: com.title,
                      status:
                        com.rate >= 4 ? 'пройдена' : 'требует прохождения',
                      date: new Date(com.updatedAt).toLocaleDateString(),
                    }));

                    const completeCompetenceCount = res.reduce((acc, cur) => {
                      if (cur.rate >= 4) {
                        acc++;
                      }

                      return acc;
                    }, 0);

                    const competencePersent =
                      (completeCompetenceCount / res.length) * 100;

                    setRawCompetences(res);
                    setCompleteCompetence(competencePersent);
                    setCompetencesTable(prearedCompetenceData);
                  };

                  fetchCompetences();

                  setIsModalOpen(false);
                  setIsEditMode(false);
                  setCompetenceComment('');
                }}
              >
                Сохранить оценку
              </Button>
            ) : (
              <Button onClick={() => setIsEditMode(true)}>
                Изменить оценку
              </Button>
            )}
          </Styled.ModalWrapper>
        </Modal>

        {isAddModalOpen && (
          <Modal
            open={isAddModalOpen}
            onClose={() => {
              setNewCompetenceTitle('');
              setNewCompetenceDescription('');
              setNewCompetenceRate(null);
              setNewCompetenceMandatory(null);

              setIsAddModalOpen(false);
            }}
          >
            <Styled.ModalWrapper>
              <Text variant='subheader-2'>Добавить компетецию</Text>
              <Styled.SelectCompetenceWrapper>
                <Styled.SearchInputWrapper
                  size='m'
                  placeholder='Название компетенции...'
                  type='text'
                  onUpdate={(val) => setNewCompetenceTitle(val)}
                />
              </Styled.SelectCompetenceWrapper>
              <Styled.SelectCompetenceWrapper>
                <Text variant='subheader-1'>Описание компетенции</Text>
                <Styled.TextAreaWrapper
                  size='m'
                  placeholder='Описание компетенции...'
                  minRows={2}
                  onUpdate={(val) => setNewCompetenceDescription(val)}
                />
              </Styled.SelectCompetenceWrapper>
              <Styled.SelectCompetenceWrapper>
                <Text variant='subheader-1'>Оценка компетенции</Text>
                <Styled.SelectWrapper
                  placeholder='Оценка компетенции'
                  options={rates}
                  onUpdate={(val) => setNewCompetenceRate(val[0])}
                />
              </Styled.SelectCompetenceWrapper>
              <Styled.SelectCompetenceWrapper>
                <Text variant='subheader-1'>Обязательность компетенции</Text>
                <Styled.RadioButtonWrapper
                  defaultValue={options[0].value}
                  options={options}
                  onUpdate={(val) => {
                    setNewCompetenceMandatory(val);
                  }}
                />
              </Styled.SelectCompetenceWrapper>

              <Button
                onClick={async () => {
                  const res = await createCompetence({
                    title: newCompetenceTitle,
                    description: newCompetenceDescription,
                    rate: newCompetenceRate,
                    rang: 0,
                    matrixId: user.matrixId,
                    competenceTypeId: newCompetenceMandatory === 'true' ? 2 : 1,
                  });

                  const fetchCompetences = async () => {
                    const res = await getCompetences(Number(user.matrixId));

                    const prearedCompetenceData = res.map((com) => ({
                      id: com.id,
                      competence: com.title,
                      status:
                        com.rate >= 4 ? 'пройдена' : 'требует прохождения',
                      date: new Date(com.updatedAt).toLocaleDateString(),
                    }));

                    const completeCompetenceCount = res.reduce((acc, cur) => {
                      if (cur.rate >= 4) {
                        acc++;
                      }

                      return acc;
                    }, 0);

                    const competencePersent =
                      (completeCompetenceCount / res.length) * 100;

                    setRawCompetences(res);
                    setCompleteCompetence(competencePersent);
                    setCompetencesTable(prearedCompetenceData);
                  };

                  fetchCompetences();

                  setNewCompetenceTitle('');
                  setNewCompetenceDescription('');
                  setNewCompetenceRate(null);
                  setNewCompetenceMandatory(null);

                  setIsAddModalOpen(false);
                }}
              >
                Добавить
              </Button>
            </Styled.ModalWrapper>
          </Modal>
        )}
        {modal && (
          <Modal open={modal} onClose={() => setModal(false)}>
            <Styled.ModalWrapper>
              <Text variant='subheader-2'>Пересмотр позиции</Text>

              <Styled.SelectWrapper
                placeholder='Выберите позицию для пересмотра'
                options={position}
                onUpdate={(val) => setSelectedPosition(val[0])}
                errorMessage={
                  'Вы не можете пересмотреть позицию пока не закрыты 90% компетенций.'
                }
                validationState={
                  completeCompetence <= 90 ? 'invalid' : undefined
                }
              />

              <Button
                onClick={async () => {
                  if (completeCompetence >= 90) {
                    const update = await updateUser(user.id, selectedPosition);

                    const fetchCompetences = async () => {
                      const res = await getCompetences(Number(user.matrixId));

                      const prearedCompetenceData = res.map((com) => ({
                        id: com.id,
                        competence: com.title,
                        status:
                          com.rate >= 4 ? 'пройдена' : 'требует прохождения',
                        date: new Date(com.updatedAt).toLocaleDateString(),
                      }));

                      const completeCompetenceCount = res.reduce((acc, cur) => {
                        if (cur.rate >= 4) {
                          acc++;
                        }

                        return acc;
                      }, 0);

                      const competencePersent =
                        (completeCompetenceCount / res.length) * 100;

                      setRawCompetences(res);
                      setCompleteCompetence(competencePersent);
                      setCompetencesTable(prearedCompetenceData);
                    };

                    fetchCompetences();
                  }

                  setSelectedPosition(null);
                  setModal(false);
                }}
              >
                Пересмотреть позицию
              </Button>
            </Styled.ModalWrapper>
          </Modal>
        )}
      </Styled.CompetenciesDiagram>
    </Styled.Container>
  );
};
