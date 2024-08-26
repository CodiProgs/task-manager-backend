import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Auth, CurrentUser } from 'src/auth/decorators'
import { TimeBlockDto } from './dto/time-block.dto'
import { TimeBlockService } from './time-block.service'
import { TimeBlockType } from './type/time-block.type'

@Auth()
@Resolver()
export class TimeBlockResolver {
	constructor(private timeBlockService: TimeBlockService) {}

	@Query(() => [TimeBlockType])
	async timeBlocks(@CurrentUser('id') userId: string) {
		return this.timeBlockService.getAll(userId)
	}

	@Mutation(() => TimeBlockType)
	async createTimeBlock(
		@CurrentUser('id') userId: string,
		@Args('createTimeBlockInput') dto: TimeBlockDto
	) {
		return this.timeBlockService.create(dto, userId)
	}

	@Mutation(() => TimeBlockType)
	async updateTimeBlock(@Args('updateTimeBlockInput') dto: TimeBlockDto) {
		return this.timeBlockService.update(dto)
	}

	@Mutation(() => TimeBlockType)
	async deleteTimeBlock(@Args('id') id: string) {
		return this.timeBlockService.delete(id)
	}

	@Mutation(() => [TimeBlockType])
	async updateTimeBlockOrders(
		@Args('ids', { type: () => [String] }) ids: string[]
	) {
		return this.timeBlockService.updateOrders(ids)
	}
}
