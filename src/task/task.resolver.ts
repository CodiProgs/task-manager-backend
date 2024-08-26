import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Auth, CurrentUser } from 'src/auth/decorators'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { TaskService } from './task.service'
import { TaskType } from './type/task.type'

@Auth()
@Resolver()
export class TaskResolver {
	constructor(private taskService: TaskService) {}

	@Query(() => [TaskType])
	async tasks(@CurrentUser('id') userId: string) {
		return this.taskService.getAll(userId)
	}

	@Mutation(() => TaskType)
	async createTask(
		@CurrentUser('id') userId: string,
		@Args('createTaskInput') dto: CreateTaskDto
	) {
		return this.taskService.create(dto, userId)
	}

	@Mutation(() => TaskType)
	async updateTask(
		@Args('id') id: string,
		@Args('updateTaskInput') dto: UpdateTaskDto
	) {
		return this.taskService.update(id, dto)
	}

	@Mutation(() => TaskType)
	async deleteTask(@Args('id') id: string) {
		return this.taskService.delete(id)
	}
}
