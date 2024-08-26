import { Field, InputType } from '@nestjs/graphql'
import { Priority } from '@prisma/client'
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator'

@InputType()
export class UpdateTaskDto {
	@Field({ nullable: true })
	@IsOptional()
	@IsString()
	name?: string

	@Field(() => Priority, { nullable: true })
	@IsOptional()
	@IsEnum(Priority)
	priority?: Priority

	@Field({ nullable: true })
	@IsOptional()
	@IsBoolean()
	isCompleted?: boolean

	@Field({ nullable: true })
	@IsOptional()
	@IsString()
	createdAt?: string
}
