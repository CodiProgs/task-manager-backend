import { Field, InputType } from '@nestjs/graphql'
import {
	IsEmail,
	IsNotEmpty,
	IsString,
	MaxLength,
	MinLength
} from 'class-validator'

@InputType()
export class AuthDto {
	@Field()
	@IsNotEmpty()
	@IsEmail({}, { message: 'Invalid email' })
	email: string

	@Field()
	@IsNotEmpty()
	@IsString()
	@MinLength(6)
	@MaxLength(32)
	password: string
}
