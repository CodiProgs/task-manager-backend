import { Field, InputType } from '@nestjs/graphql'
import { StatusPomodoro, TypePomodoro } from '@prisma/client'
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator'

@InputType()
export class CreatePomodoroDto {
	@Field()
	@IsNotEmpty()
	@IsNumber()
	remainingSeconds: number

	@Field({ nullable: true })
	@IsNotEmpty()
	@IsNumber()
	totalSeconds: number

	@Field(() => TypePomodoro)
	@IsNotEmpty()
	@IsEnum(TypePomodoro)
	type: TypePomodoro

	@Field(() => StatusPomodoro)
	@IsNotEmpty()
	@IsEnum(StatusPomodoro)
	status: StatusPomodoro
}
