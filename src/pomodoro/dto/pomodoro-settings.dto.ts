import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator'

@InputType()
export class PomodoroSettingsDto {
	@Field()
	@IsNotEmpty()
	@IsNumber()
	@Min(15)
	@Max(60)
	workInterval: number

	@Field()
	@IsNotEmpty()
	@IsNumber()
	@Min(5)
	@Max(15)
	breakInterval: number

	@Field()
	@IsNotEmpty()
	@IsNumber()
	@Min(15)
	@Max(30)
	longBreakInterval: number

	@Field()
	@IsNotEmpty()
	@IsNumber()
	@Min(1)
	@Max(8)
	longBreakAfter: number

	@Field()
	@IsNotEmpty()
	@IsNumber()
	@Min(7)
	@Max(360)
	retentionPeriod: number
}
