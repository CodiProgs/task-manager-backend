import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class PomodoroStatisticsType {
	@Field() date: string
	@Field() minutes: number
	@Field() count: number
}
