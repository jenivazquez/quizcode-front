interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  surname1: string;
  surname2: string;
}
export type UserCreate = Pick<User, 'email' | 'password' | 'name' | 'surname1' | 'surname2'>;
export type UserUpdate = Pick<User, 'name' | 'surname1' | 'surname2'> & Partial<Pick<User, 'password'>>;
export type UserDetail = Pick<User, 'id' | 'email' | 'name' | 'surname1' | 'surname2'>;
