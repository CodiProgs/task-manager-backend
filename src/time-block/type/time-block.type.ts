import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class TimeBlockType {
	@Field() id: string

	@Field() name: string

	@Field() duration: number

	@Field() order: number

	@Field() color: string
}
