import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "./entities/user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async create(user: User): Promise<User> {
    const created = await this.usersRepository.save(user);

    return this.findOneById(created.id);
  }

  async update(user: User): Promise<User> {
    const updated = await this.usersRepository.save(user);

    return this.findOneById(updated.id);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({id});

    // remove hashedPassword
    delete user.hashedPassword;

    return user;
  }

  findOneByUserName(username: string): Promise<User> {
    return this.usersRepository.findOneBy({username});
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
