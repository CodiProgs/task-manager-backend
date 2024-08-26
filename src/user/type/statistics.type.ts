import { Field, ObjectType } from '@nestjs/graphql'
import { UserType } from './user.type'

@ObjectType()
export class Statistic {
	@Field() label: string
	@Field() value: number
}

@ObjectType()
export class StatisticsType {
	@Field(() => UserType) user: UserType

	@Field(() => [Statistic]) statistics: Statistic[]
}
