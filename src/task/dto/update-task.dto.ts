import { Field, InputType } from '@nestjs/graphql'
import { Priority } from '@prisma/client'
import {
	IsBoolean,
	IsEnum,
	IsNumber,
	IsOptional,
	IsString
} from 'class-validator'

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
	@IsNumber()
	estimatedTime?: number

	@Field({ nullable: true })
	@IsOptional()
	@IsNumber()
	spentTime?: number

	@Field({ nullable: true })
	@IsOptional()
	@IsBoolean()
	isCompleted?: boolean

	@Field({ nullable: true })
	@IsOptional()
	@IsString()
	createdAt?: string
}
