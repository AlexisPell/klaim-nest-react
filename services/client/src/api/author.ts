import axios, { AxiosRequestConfig, CancelTokenSource } from 'axios';
import { IAuthor } from '../interfaces/author';
import { request } from '../libs/axios/axiosInstance';

export interface IAuthorRes {
  success: boolean;
  data: {
    author: IAuthor;
  };
}
class AuthorApi {
  async getRandomAuthor(): Promise<IAuthor | string> {
    try {
      const { data } = await request.get<IAuthorRes>('/author');
      const {
        data: { author },
      } = data;
      return author;
    } catch (error) {
      return (error as any).response ? (error as any).response.data.message : error;
    }
  }
}

export const authorApi = new AuthorApi();
