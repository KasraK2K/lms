// Modules
import Controller from '#base/Controller'
import { IUserFindArgs, IUserGuarded } from './types/user.interface'
import service from './user.service'

class UserController extends Controller {
	health(body: IUserFindArgs) {
		return service.health(body)
	}

	findAll() {
		return service.findAll()
	}

	insert(args: IUserGuarded) {
		return service.insert(args)
	}
}

export default new UserController()
