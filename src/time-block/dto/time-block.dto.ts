import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

@InputType()
export class TimeBlockDto {
	@Field({ nullable: true })
	@IsOptional()
	@IsString()
	id?: string

	@Field()
	@IsNotEmpty()
	@IsString()
	name: string

	@Field()
	@IsNotEmpty()
	@IsNumber()
	duration: number

	@Field()
	@IsNotEmpty()
	@IsNumber()
	order: number

	@Field()
	@IsNotEmpty()
	@IsString()
	color: string
}
