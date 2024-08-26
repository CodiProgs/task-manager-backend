import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class PomodoroSettingsType {
	@Field() id: string

	@Field() workInterval: number

	@Field() breakInterval: number

	@Field() longBreakInterval: number

	@Field() longBreakAfter: number

	@Field() retentionPeriod: number
}
