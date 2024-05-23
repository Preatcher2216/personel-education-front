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

export type Matrix = {
  id: number;
  competenceCount: string;
  createdAt: string;
  updatedAt: string;
};

export type Comment = {
  id: number;
  comment: string;
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

export const getUser = async (id: number) => {
  const res = await $authHost.get<User>(`api/user/get-user?id=${id}`);

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

export const getComment = async (id: number) => {
  const res = await $authHost.get<Comment>(
    `api/comment/get-comment?competenceId=${id}`
  );

  return res.data;
};

export const getCompetences = async (matrixId: number) => {
  const res = await $authHost.get<Competence[]>(
    `api/competence/get-competence?matrixId=${matrixId}`
  );

  return res.data;
};

export const getCompetenceById = async (id: number) => {
  const res = await $authHost.get<Competence>(
    `api/competence/get-competence-id?id=${id}`
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

export const createUser = async (user) => {
  const res = await $authHost.post(`api/user/create-user`, {
    ...user,
  });

  return res.data;
};

export const createMatrix = async (competenceCount: number) => {
  const res = await $authHost.post<Matrix>(`api/matrix/create-matrix`, {
    competenceCount,
  });

  return res.data;
};

export const createCompetence = async (competence) => {
  const res = await $authHost.post(`api/competence/create-competence`, {
    ...competence,
  });

  return res.data;
};

export const createComment = async (comment) => {
  const res = await $authHost.post<Comment>(`api/comment/create-comment`, {
    ...comment,
  });

  return res.data;
};

export const updateCompetence = async (competence) => {
  const res = await $authHost.post(`api/competence/update-competence`, {
    ...competence,
  });

  return res.data;
};

export const deleteCompetence = async (id: number) => {
  const res = await $authHost.delete(
    `api/competence/delete-competence?id=${id}`
  );

  return res.data;
};

export const deleteUser = async (id: number) => {
  const res = await $authHost.delete(`api/user/delete-user?id=${id}`);

  return res.data;
};

export const updateUser = async (id: number, positionId: number) => {
  const res = await $authHost.post(`api/user/update-user`, { id, positionId });

  return res.data;
};
