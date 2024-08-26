import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { AuthModule } from './auth/auth.module'
import { PomodoroModule } from './pomodoro/pomodoro.module'
import { TaskModule } from './task/task.module'
import { TimeBlockModule } from './time-block/time-block.module'
import { UserModule } from './user/user.module'

@Module({
	imports: [
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
			sortSchema: true,
			introspection: true,
			playground: true,
			context: ({ req, res }) => ({ req, res })
		}),
		ConfigModule.forRoot(),
		AuthModule,
		UserModule,
		TaskModule,
		TimeBlockModule,
		PomodoroModule
	]
})
export class AppModule {}
