import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthResolver } from './auth.resolver'
import { PrismaService } from 'src/prisma.service'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getJwtConfig } from 'src/common/config'
import { UserModule } from 'src/user/user.module'
import { JwtStrategy } from './jwt.strategy'

@Module({
	imports: [
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		}),
		UserModule,
		ConfigModule
	],
	providers: [AuthResolver, AuthService, PrismaService, JwtStrategy]
})
export class AuthModule {}
