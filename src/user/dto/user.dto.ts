import { Field, InputType } from '@nestjs/graphql'
import {
	IsEmail,
	IsNotEmpty,
	IsString,
	MaxLength,
	MinLength
} from 'class-validator'

@InputType()
export class UserDto {
	@Field()
	@IsNotEmpty()
	@IsEmail({}, { message: 'Invalid email' })
	email: string

	@Field()
	@IsNotEmpty()
	@IsString()
	@MinLength(3)
	@MaxLength(32)
	name: string
}
