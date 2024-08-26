import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { PomodoroResolver } from './pomodoro.resolver'
import { PomodoroService } from './pomodoro.service'

@Module({
	providers: [PomodoroService, PomodoroResolver, PrismaService],
	exports: [PomodoroService]
})
export class PomodoroModule {}
