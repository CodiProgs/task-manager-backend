import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Auth, CurrentUser } from 'src/auth/decorators'
import { CreatePomodoroDto } from './dto/create-pomodoro.dto'
import { PomodoroSettingsDto } from './dto/pomodoro-settings.dto'
import { UpdatePomodoroDto } from './dto/update-pomodoro.dto'
import { PomodoroService } from './pomodoro.service'
import { PomodoroSettingsType } from './type/pomodoro-settings.type'
import { PomodoroStatisticsType } from './type/pomodoro-statistics.type'
import { PomodoroType } from './type/pomodoro.type'

@Auth()
@Resolver()
export class PomodoroResolver {
	constructor(private pomodoroService: PomodoroService) {}

	@Query(() => [PomodoroType])
	async getTodaySessions(@CurrentUser('id') userId: string) {
		return this.pomodoroService.getTodaySessions(userId)
	}

	@Query(() => [PomodoroStatisticsType])
	async getPomodoroStatistics(
		@CurrentUser('id') userId: string,
		@Args('days', { nullable: true }) days?: number
	): Promise<PomodoroStatisticsType[]> {
		return this.pomodoroService.statistics(userId, days)
	}

	@Mutation(() => PomodoroType)
	async createPomodoro(
		@CurrentUser('id') userId: string,
		@Args('createPomodoroInput') dto: CreatePomodoroDto
	) {
		return this.pomodoroService.create(userId, dto)
	}

	@Mutation(() => PomodoroType)
	async updatePomodoro(
		@Args('id') id: string,
		@Args('updatePomodoroInput') dto: UpdatePomodoroDto
	) {
		return this.pomodoroService.update(id, dto)
	}

	@Mutation(() => PomodoroType)
	async deletePomodoro(@Args('id') id: string) {
		return this.pomodoroService.delete(id)
	}

	@Mutation(() => PomodoroSettingsType)
	async updatePomodoroSettings(
		@CurrentUser('id') userId: string,
		@Args('updatePomodoroSettingsInput') dto: PomodoroSettingsDto
	) {
		return this.pomodoroService.updateSettings(userId, dto)
	}
}
