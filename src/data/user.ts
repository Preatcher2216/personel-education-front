import { atom, reatomAsync } from '@reatom/framework';
import { $authHost } from '../api/config';

export const userAtom = atom({}, 'userAtom');
export const authAtom = atom(false, 'authAtom');
export const positionAtom = atom(false, 'positionAtom');

export const fetchList = reatomAsync(
  (ctx) => $authHost(`api/user/get-users`, ctx.controller),
  'fetchList'
);
