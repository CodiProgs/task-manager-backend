import { Injectable } from '@nestjs/common'
import { hash } from 'argon2'
import { AuthDto } from 'src/auth/dto/auth.dto'
import { PomodoroService } from 'src/pomodoro/pomodoro.service'
import { PrismaService } from 'src/prisma.service'
import { TaskService } from 'src/task/task.service'
import { UserDto } from './dto/user.dto'
import { StatisticsType } from './type/statistics.type'

@Injectable()
export class UserService {
	constructor(
		private readonly prisma: PrismaService,
		private pomodoroService: PomodoroService,
		private taskService: TaskService
	) {}

	async getById(id: string) {
		return this.prisma.user.findUnique({ where: { id } })
	}

	async getByEmail(email: string) {
		return this.prisma.user.findUnique({ where: { email } })
	}

	async getProfile(id: string) {
		return this.prisma.user.findUnique({
			where: { id },
			include: { pomodoroSettings: true }
		})
	}

	async getStatistics(id: string): Promise<StatisticsType> {
		const user = await this.prisma.user.findUnique({
			where: { id }
		})

		const completedTasksToday = await this.taskService.getCompletedToday(id)

		const completedPomodoroWorkToday =
			await this.pomodoroService.getCompletedToday(id)

		return {
			user,
			statistics: [
				{ label: 'Completed tasks today', value: completedTasksToday },
				{
					label: 'Completed pomodoro work today',
					value: completedPomodoroWorkToday
				}
			]
		}
	}

	async create(dto: AuthDto) {
		const data = {
			email: dto.email,
			password: await hash(dto.password)
		}

		const user = await this.prisma.user.create({ data })
		await this.pomodoroService.createSettings(dto.email)

		return user
	}

	async update(id: string, data: UserDto) {
		return this.prisma.user.update({ where: { id }, data })
	}

	async delete(id: string) {
		return this.prisma.user.delete({ where: { id } })
	}
}
