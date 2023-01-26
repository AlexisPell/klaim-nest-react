import { User, UserAttributes } from './user.model';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const userExists = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (userExists) throw new BadRequestException('Cannot create user');

    const { dataValues: user } = await this.userRepository.create(dto);

    return user as User;
  }

  async getUserByEmail(email: string): Promise<UserAttributes | null> {
    try {
      const { dataValues: user } = await this.userRepository.findOne({
        where: { email },
      });
      return user;
    } catch (error) {
      return null;
    }
  }
}
