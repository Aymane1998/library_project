export interface AuthData {
  username: string;
  password: string;
}

export interface AuthToken {
  refresh: string;
  access: string;
}
