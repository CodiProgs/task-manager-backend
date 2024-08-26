import { Field, InputType } from '@nestjs/graphql'
import { StatusPomodoro, TypePomodoro } from '@prisma/client'
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator'

@InputType()
export class UpdatePomodoroDto {
	@Field()
	@IsNotEmpty()
	@IsNumber()
	remainingSeconds: number

	@Field(() => TypePomodoro)
	@IsOptional()
	@IsEnum(TypePomodoro)
	type?: TypePomodoro

	@Field(() => StatusPomodoro)
	@IsOptional()
	@IsEnum(StatusPomodoro)
	status?: StatusPomodoro
}
