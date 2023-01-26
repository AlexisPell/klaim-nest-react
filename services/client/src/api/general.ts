import { request } from '../libs/axios/axiosInstance';

class GeneralApi {
  async getInfo() {
    const { data } = await request.get<string>('/info');
    return data;
  }
}

export const generalApi = new GeneralApi();
