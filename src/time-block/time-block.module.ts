import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { TimeBlockResolver } from './time-block.resolver'
import { TimeBlockService } from './time-block.service'

@Module({
	providers: [TimeBlockResolver, TimeBlockService, PrismaService]
})
export class TimeBlockModule {}
