import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Priority } from '@prisma/client'

@ObjectType()
export class TaskType {
	@Field() id: string

	@Field() createdAt: Date

	@Field() name: string

	@Field(() => Priority) priority: Priority

	@Field() isCompleted: boolean
}

registerEnumType(Priority, {
	name: 'Priority'
})
