import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) { }

  execute({ user_id }: IRequest): User[] {
    const users = this.usersRepository.list();
    if (!user_id) {
      return users;
    }

    const userAlreadyExists = this.usersRepository.findById(user_id);
    if (!userAlreadyExists) {
      throw new Error("User not exists!");
    }
    const adm = userAlreadyExists.admin;
    if (!adm) {
      throw new Error("User not admin!");

    }

    const user = users.filter((user) => user.id === user_id);
    return user;
  }
}

export { ListAllUsersUseCase };

