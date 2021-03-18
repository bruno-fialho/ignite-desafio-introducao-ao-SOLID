import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const userAlreadyExists = this.usersRepository.findById(user_id);

    if (!userAlreadyExists) {
      throw new Error("User does not exists!");
    }

    const userIsAdmin = userAlreadyExists.admin;

    if (!userIsAdmin) {
      throw new Error("You need to be admin to list all users.");
    }

    const categories = this.usersRepository.list();

    return categories;
  }
}

export { ListAllUsersUseCase };
