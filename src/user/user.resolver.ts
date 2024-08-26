import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Auth, CurrentUser } from 'src/auth/decorators'
import { UserDto } from './dto/user.dto'
import { StatisticsType } from './type/statistics.type'
import { UserType } from './type/user.type'
import { UserService } from './user.service'

@Resolver()
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Auth()
	@Query(() => UserType)
	async profile(@CurrentUser('id') id: string) {
		return this.userService.getProfile(id)
	}

	@Auth()
	@Query(() => StatisticsType)
	async statistics(@CurrentUser('id') id: string): Promise<StatisticsType> {
		return this.userService.getStatistics(id)
	}

	@Auth()
	@Mutation(() => UserType)
	async updateProfile(
		@CurrentUser('id') id: string,
		@Args('updateUserInput') dto: UserDto
	) {
		return this.userService.update(id, dto)
	}
}
