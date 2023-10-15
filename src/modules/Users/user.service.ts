// Modules
import Service from '#base/Service'
import repository from './user.repository'
import { IUserFindArgs, IUserGuarded } from './types/user.interface'

class UserService extends Service {
	health(args: IUserFindArgs) {
		return repository.health(args)
	}

	findAll() {
		return repository.findAll()
	}

	insert(args: IUserGuarded) {
		return repository.insert(args)
	}
}

export default new UserService()
