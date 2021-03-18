import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    if (!email || !name) {
      throw new Error("You must provide name and email!");
    }

    const userAlreadyExists = this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error("This email is already in use!");
    }

    const newUser = this.usersRepository.create({ name, email });

    return newUser;
  }
}

export { CreateUserUseCase };
