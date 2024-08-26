import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { StatusPomodoro, TypePomodoro } from '@prisma/client'

@ObjectType()
export class PomodoroType {
	@Field() id: string

	@Field() createdAt: Date

	@Field() remainingSeconds: number

	@Field() totalSeconds: number

	@Field(() => TypePomodoro) type: TypePomodoro

	@Field(() => StatusPomodoro) status: StatusPomodoro
}

registerEnumType(StatusPomodoro, {
	name: 'StatusPomodoro'
})

registerEnumType(TypePomodoro, {
	name: 'TypePomodoro'
})
