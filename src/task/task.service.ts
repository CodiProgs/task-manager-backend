import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'

@Injectable()
export class TaskService {
	constructor(private prisma: PrismaService) {}

	async getAll(userId: string) {
		return this.prisma.task.findMany({
			where: { userId },
			orderBy: { createdAt: 'asc' }
		})
	}

	async create(dto: CreateTaskDto, userId: string) {
		return this.prisma.task.create({
			data: {
				...dto,
				user: {
					connect: { id: userId }
				}
			}
		})
	}

	async update(id: string, dto: UpdateTaskDto) {
		return this.prisma.task.update({
			where: { id },
			data: dto
		})
	}

	async delete(id: string) {
		return this.prisma.task.delete({
			where: { id }
		})
	}

	async getCompletedToday(userId: string) {
		return this.prisma.task.count({
			where: {
				userId,
				updatedAt: {
					gte: new Date(new Date().setHours(0, 0, 0, 0))
				},
				isCompleted: true
			}
		})
	}
}
