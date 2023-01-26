import { Request } from '@nestjs/common';
import { User } from 'src/user/user.model';

export type MyRequest = Request & {
  headers: Request['headers'] & {
    authorization?: string;
  };
  user?: User;
};
