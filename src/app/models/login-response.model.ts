export interface Role {
    roleId: number;
    name: string;
    description: string;
    addDate: string;
    modDate: string;
  }
  
  export interface User {
    userId: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    role: Role;
  }
  
  export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    refreshExpiresIn: number;
    user: User;
  }