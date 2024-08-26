import { Field, InputType } from '@nestjs/graphql'
import { Priority } from '@prisma/client'
import {
	IsBoolean,
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString
} from 'class-validator'

@InputType()
export class CreateTaskDto {
	@Field()
	@IsNotEmpty()
	@IsString()
	name: string

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
