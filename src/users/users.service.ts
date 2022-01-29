import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from '../auth/dto/Register.dto';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create(user: RegisterDto) {
    return this.userRepository.save(user);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOneById(id: number) {
    return this.userRepository.findOne(id);
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOne({ email });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
