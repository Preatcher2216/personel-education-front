//@ts-nocheck
import { Divider, User } from '@gravity-ui/uikit';
import { Button } from '@gravity-ui/uikit';
import { PersonPlus } from '@gravity-ui/icons';
import { Printer } from '@gravity-ui/icons';
import { Briefcase } from '@gravity-ui/icons';

import { useMatch, useNavigate, useSearchParams } from 'react-router-dom';

import * as Styled from './styled';
import { downloadManagerReport } from '../../api/userApi';
import { positionAtom, userAtom } from '../../data/user';
import { useAtom } from '@reatom/npm-react';

export const NavigationMenu = () => {
  const navigate = useNavigate();
  const [user] = useAtom(userAtom);
  const [setModal] = useAtom(positionAtom);

  const isManager = user.roleRang === 1;

  let [, setSearchParams] = useSearchParams();

  const competencesRoute = useMatch('personell/competencies');

  const downloadReport = async () => {
    await downloadManagerReport();
    const href = 'http://localhost:5000/Personel.xlsx';

    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', 'Personel.xlsx');
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  };

  return (
    <Styled.Container>
      <Styled.UserWrapper>
        <User
          size='xl'
          name={`${user.firstName} ${user.lastName} ${user.surName}`}
          avatar={{
            text: `${user.firstName} ${user.lastName} ${user.surName}`,
            theme: 'normal',
          }}
        />
        <Divider />
      </Styled.UserWrapper>

      <Styled.ButtonsWrapper>
        {isManager && (
          <Button size='xl' onClick={downloadReport}>
            <Styled.ButtonsContent>
              <Printer />
              Сформировать отчет
            </Styled.ButtonsContent>
          </Button>
        )}
        {isManager && (
          <Button size='xl' onClick={() => navigate('/personell/add')}>
            <Styled.ButtonsContent>
              <PersonPlus />
              Добавить сотрудника
            </Styled.ButtonsContent>
          </Button>
        )}

        {competencesRoute && (
          <Button
            size='xl'
            onClick={() => {
              setSearchParams((prev) => {
                prev.set('position', 'true');
                return prev;
              });
              setModal(true);
            }}
          >
            <Styled.ButtonsContent>
              <Briefcase />
              Пересмотр позиции
            </Styled.ButtonsContent>
          </Button>
        )}
        <Button size='xl'>Выйти</Button>
      </Styled.ButtonsWrapper>
    </Styled.Container>
  );
};
