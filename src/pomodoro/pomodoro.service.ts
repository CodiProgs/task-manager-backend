import { Injectable } from '@nestjs/common'
import { StatusPomodoro, TypePomodoro } from '@prisma/client'
import { format } from 'date-fns'
import { PrismaService } from 'src/prisma.service'
import { CreatePomodoroDto } from './dto/create-pomodoro.dto'
import { PomodoroSettingsDto } from './dto/pomodoro-settings.dto'
import { UpdatePomodoroDto } from './dto/update-pomodoro.dto'
import { PomodoroStatisticsType } from './type/pomodoro-statistics.type'

interface StatisticData {
	totalSeconds: number
	count: number
}

@Injectable()
export class PomodoroService {
	constructor(private prisma: PrismaService) {}

	getTodaySessions(userId: string) {
		const today = new Date(
			Date.UTC(
				new Date().getFullYear(),
				new Date().getMonth(),
				new Date().getDate()
			)
		)

		return this.prisma.pomodoroSession.findMany({
			where: {
				userId,
				createdAt: {
					gte: today
				}
			},
			orderBy: {
				createdAt: 'desc'
			}
		})
	}

	async create(userId: string, dto: CreatePomodoroDto) {
		return this.prisma.pomodoroSession.create({
			data: {
				...dto,
				user: {
					connect: {
						id: userId
					}
				}
			}
		})
	}

	async update(id: string, dto: UpdatePomodoroDto) {
		return this.prisma.pomodoroSession.update({
			where: {
				id
			},
			data: {
				...dto
			}
		})
	}

	async delete(id: string) {
		return this.prisma.pomodoroSession.delete({
			where: {
				id
			}
		})
	}

	async createSettings(email: string) {
		return this.prisma.pomodoroSettings.create({
			data: {
				user: {
					connect: {
						email
					}
				}
			}
		})
	}

	async updateSettings(userId: string, dto: PomodoroSettingsDto) {
		return this.prisma.pomodoroSettings.update({
			where: {
				userId
			},
			data: {
				...dto
			}
		})
	}

	async statistics(
		userId: string,
		days: number = 7
	): Promise<PomodoroStatisticsType[]> {
		const today = new Date(
			Date.UTC(
				new Date().getFullYear(),
				new Date().getMonth(),
				new Date().getDate()
			)
		)
		const startDate = new Date(today)

		if (days >= 180) {
			const monthsToSubtract = Math.ceil(days / 30) - 1
			startDate.setMonth(today.getMonth() - monthsToSubtract, 1)
			startDate.setDate(1)
		} else {
			startDate.setDate(today.getDate() - days + 1)
		}

		const groupByFormat = days >= 180 ? 'MMM yyyy' : 'd MMM'

		const statistics = await this.prisma.pomodoroSession
			.groupBy({
				by: ['createdAt'],
				where: {
					userId,
					createdAt: {
						gte: startDate
					},
					type: TypePomodoro.WORK,
					status: StatusPomodoro.COMPLETED
				},
				_sum: {
					totalSeconds: true
				},
				_count: {
					id: true
				},
				orderBy: {
					createdAt: 'asc'
				}
			})
			.then(results =>
				results.map(result => ({
					...result,
					createdAt: format(result.createdAt, groupByFormat)
				}))
			)

		const templateStatistics = {}
		const tempDate = new Date(startDate)

		if (days >= 180) {
			const monthsToCover = Math.ceil(days / 30)
			for (let i = 0; i < monthsToCover; i++) {
				const formattedDate = format(tempDate, groupByFormat)
				templateStatistics[formattedDate] = { totalSeconds: 0, count: 0 }
				tempDate.setMonth(tempDate.getMonth() + 1)
			}
		} else {
			while (tempDate <= today) {
				const formattedDate = format(tempDate, groupByFormat)
				templateStatistics[formattedDate] = { totalSeconds: 0, count: 0 }
				tempDate.setDate(tempDate.getDate() + 1)
			}
		}

		statistics.forEach(stat => {
			const period = stat.createdAt
			if (templateStatistics[period]) {
				templateStatistics[period].totalSeconds += stat._sum.totalSeconds
				templateStatistics[period].count += stat._count.id
			}
		})

		const completeStatistics = Object.entries(
			templateStatistics as Record<string, StatisticData>
		).map(([date, data]) => ({
			date,
			minutes: Math.round(data.totalSeconds / 60),
			count: data.count
		}))

		return completeStatistics
	}

	async getCompletedToday(userId: string) {
		return this.prisma.pomodoroSession.count({
			where: {
				userId,
				updatedAt: {
					gte: new Date(new Date().setHours(0, 0, 0, 0))
				},
				type: TypePomodoro.WORK,
				status: StatusPomodoro.COMPLETED
			}
		})
	}
}
