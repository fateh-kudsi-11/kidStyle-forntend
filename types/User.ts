export default interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  token: string;
}

export interface UserReq {
  username: string;
  password: string;
}

export interface UserRegisterReq {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface UserUpdateDetailsReq {
  email: string;
  firstName: string;
  lastName: string;
}

export interface UserUpdatePasswordReq {
  new_password: string;
  old_password: string;
}

export interface ErrorMes {
  data: {
    detail: string;
  };
}
