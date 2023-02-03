import { IUser } from '../interfaces/user';
import { request } from '../libs/axios/axiosInstance';

export interface ITokenRes {
  success: boolean;
  data: {
    token: string;
  };
}
export interface IGetMeRes {
  success: boolean;
  data: {
    profile: IUser;
  };
}

class AuthApi {
  async login(user: Partial<IUser>): Promise<boolean | string> {
    try {
      const { data } = await request.post<ITokenRes>('/login', user);
      if (data.data.token) {
        localStorage.setItem('token', data.data.token);
      }
      return data.success;
    } catch (error) {
      return (error as any).response.data.message;
    }
  }

  async register(user: Partial<IUser>) {
    try {
      const { data } = await request.post<ITokenRes>('/register', user);
      if (data.data.token) {
        localStorage.setItem('token', data.data.token);
      }
      return data.success;
    } catch (error) {
      const errRes = (error as any).response.data.message;
      if (Array.isArray(errRes)) {
        return errRes.join(', ').substring(0, errRes.length - 2);
      }
      return (error as any).response.data.message;
    }
  }

  async getProfile() {
    const { data } = await request.get<IGetMeRes>('/profile');
    return data.data.profile;
  }
}

export const authApi = new AuthApi();
