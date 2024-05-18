import { Divider, User } from '@gravity-ui/uikit';
import { Button } from '@gravity-ui/uikit';
import { PersonPlus } from '@gravity-ui/icons';
import { Printer } from '@gravity-ui/icons';
import { Briefcase } from '@gravity-ui/icons';

import { useNavigate } from 'react-router-dom';

import * as Styled from './styled';
import { downloadManagerReport } from '../../api/userApi';

export const NavigationMenu = () => {
  const navigate = useNavigate();

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
          name='Test User'
          avatar={{ text: 'Test', theme: 'normal' }}
        />
        <Divider />
      </Styled.UserWrapper>

      <Styled.ButtonsWrapper>
        <Button size='xl' onClick={downloadReport}>
          <Styled.ButtonsContent>
            <Printer />
            Сформировать отчет
          </Styled.ButtonsContent>
        </Button>
        <Button size='xl' onClick={() => navigate('/personell/add')}>
          <Styled.ButtonsContent>
            <PersonPlus />
            Добавить сотрудника
          </Styled.ButtonsContent>
        </Button>
        <Button size='xl'>
          <Styled.ButtonsContent>
            <Briefcase />
            Пересмотр позиции
          </Styled.ButtonsContent>
        </Button>
        <Button size='xl'>Выйти</Button>
      </Styled.ButtonsWrapper>
    </Styled.Container>
  );
};
