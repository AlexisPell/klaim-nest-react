import { IQuote } from '../interfaces/quote';
import { request } from '../libs/axios/axiosInstance';

export interface IQuoteRes {
  success: boolean;
  data: {
    quote: IQuote;
  };
}
class QuoteApi {
  async getRandomQuoteByAuthorId(authorId: number): Promise<IQuote | string> {
    try {
      const { data } = await request.get<IQuoteRes>('/quote', { params: { authorId } });
      const {
        data: { quote },
      } = data;
      return quote;
    } catch (error) {
      return (error as any).response.data.message;
    }
  }
}

export const quoteApi = new QuoteApi();
