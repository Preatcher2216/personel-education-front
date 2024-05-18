import { jwtDecode } from 'jwt-decode';
import { $host, $authHost } from './config';

export type User = {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  surName: string;
  avatar: any;
  createdAt: string;
  updatedAt: string;
  personelId: number;
  positionId: number;
  roleId: number;
  matrixId: number;
};

export type Competence = {
  id: number;
  title: string;
  description: string;
  rate: number;
  rang: number;
  createdAt: string;
  updatedAt: string;
  matrixId: number;
  competenceTypeId: number;
};

export type Position = {
  id: number;
  title: string;
  rang: number;
  createdAt: string;
  updatedAt: string;
};

export type Personel = {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  surName: string;
  avatar: any;
  createdAt: string;
  updatedAt: string;
};

export const loginUser = async (email: string, password: string) => {
  const res = await $host.post('api/user/login', { email, password });

  localStorage.setItem('token', res.data.token);

  return jwtDecode(res.data.token);
};

export const check = async () => {
  const res = await $authHost.get('api/user/auth');

  localStorage.setItem('token', res.data.token);

  return jwtDecode(res.data.token);
};

export const getUsers = async () => {
  const res = await $authHost.get<User>('api/user/get-users');

  return res.data;
};

export const getPosition = async (id: number) => {
  const res = await $authHost.get<Position>(
    `api/position/get-position?id=${id}`
  );

  return res.data;
};

export const getMatrix = async (id: number) => {
  const res = await $authHost.get<User>(`api/matrix/get-matrix?id=${id}`);

  return res.data;
};

export const getCompetences = async (matrixId: number) => {
  const res = await $authHost.get<Competence[]>(
    `api/competence/get-competence?matrixId=${matrixId}`
  );

  return res.data;
};

export const getUserTableData = async (users: User[]) => {
  const usersPositions = users.map((user) => user.positionId);
  const usersMatrixs = users.map((user) => user.matrixId);

  const [positionsPromise, competencesPromise] = await Promise.all([
    usersPositions.map((p) => getPosition(p)),
    usersMatrixs.map((m) => getCompetences(m)),
  ]);

  const positions = await Promise.all(positionsPromise);
  const competences = await Promise.all(competencesPromise);

  const prepareCompetence = competences.reduce((acc, cur) => {
    let completeCount = 0;

    cur.forEach((competence) => {
      if (competence.rate >= 4) {
        completeCount++;
      }
    });

    const prepare = {
      id: cur[0].matrixId,
      completePersent: (completeCount / cur.length) * 100,
    };

    acc.push(prepare);

    return acc;
  }, []);

  const positionsMap = new Map(positions.map((p) => [p.id, p]));
  const competenceMap = new Map(prepareCompetence.map((c) => [c.id, c]));

  const preparedUsers = users.map((u) => {
    return {
      id: u.id,
      fio: `${u.firstName} ${u.lastName} ${u.surName}`,
      grade: positionsMap.get(u.positionId),
      progress: competenceMap.get(u.matrixId),
    };
  });

  return preparedUsers;
};

export const getAllPositions = async () => {
  const res = await $authHost.get<Position[]>(`api/position/get-positions`);

  return res.data;
};

export const getAllRoles = async () => {
  const res = await $authHost.get<Position[]>(`api/role/get-roles`);

  return res.data;
};

export const getAllPersonel = async () => {
  const res = await $authHost.get<Personel[]>(`api/personel/get-personels`);

  return res.data;
};

export const downloadManagerReport = async () => {
  await $authHost.post('api/user/managerReport');
};
