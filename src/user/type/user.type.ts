import { Field, ObjectType } from '@nestjs/graphql'
import { PomodoroSettingsType } from 'src/pomodoro/type/pomodoro-settings.type'
import { PomodoroType } from 'src/pomodoro/type/pomodoro.type'
import { TaskType } from 'src/task/type/task.type'
import { TimeBlockType } from 'src/time-block/type/time-block.type'

@ObjectType()
export class UserType {
	@Field() id: string

	@Field() email: string

	@Field({ nullable: true }) name?: string

	@Field(() => [TaskType]) tasks?: TaskType[]

	@Field(() => [TimeBlockType]) timeBlocks?: TimeBlockType[]

	@Field(() => [PomodoroType])
	pomodoros?: PomodoroType[]

	@Field(() => PomodoroSettingsType) pomodoroSettings?: PomodoroSettingsType
}
