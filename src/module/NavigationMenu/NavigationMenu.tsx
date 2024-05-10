import { Divider, User } from '@gravity-ui/uikit';
import { Button } from '@gravity-ui/uikit';
import { PersonPlus } from '@gravity-ui/icons';
import { Printer } from '@gravity-ui/icons';

import * as Styled from './styled';

export const NavigationMenu = () => {
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
        <Button size='xl'>
          <Styled.ButtonsContent>
            <Printer />
            Сформировать отчет
          </Styled.ButtonsContent>
        </Button>
        <Button size='xl'>
          <Styled.ButtonsContent>
            <PersonPlus />
            Добавить сотрудника
          </Styled.ButtonsContent>
        </Button>
        <Button size='xl'>Выйти</Button>
      </Styled.ButtonsWrapper>
    </Styled.Container>
  );
};
