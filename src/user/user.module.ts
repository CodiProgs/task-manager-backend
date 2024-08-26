import { Module } from '@nestjs/common'
import { PomodoroModule } from 'src/pomodoro/pomodoro.module'
import { PrismaService } from 'src/prisma.service'
import { TaskModule } from 'src/task/task.module'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'

@Module({
	imports: [PomodoroModule, TaskModule],
	providers: [UserResolver, UserService, PrismaService],
	exports: [UserService]
})
export class UserModule {}
