import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { verify } from 'argon2'
import { Response } from 'express'
import { UserService } from 'src/user/user.service'
import { AuthDto } from './dto/auth.dto'

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly userService: UserService
	) {}

	EXPIRE_DAY_REFRESH_TOKEN = 7
	REFRESH_TOKEN_NAME = 'refreshToken'

	async authenticate(dto: AuthDto) {
		let user = await this.userService.getByEmail(dto.email)

		if (!user) {
			user = await this.userService.create(dto)
		} else {
			const isValidPassword = await verify(user.password, dto.password)
			if (!isValidPassword)
				throw new BadRequestException({ form: 'Invalid password' })
		}

		const tokens = this.issueTokens(user.id)

		return { user, ...tokens }
	}

	async getNewTokens(refreshToken: string) {
		let result: any
		try {
			result = await this.jwtService.verifyAsync(refreshToken)
		} catch (error) {
			throw new BadRequestException('Verification failed. Log in again.')
		}

		const user = await this.userService.getById(result.id)
		if (!user)
			throw new NotFoundException(
				'It seems that something went wrong. Log in again'
			)

		const tokens = this.issueTokens(user.id)

		return { ...tokens }
	}

	private issueTokens(userId: string) {
		const payload = { id: userId }

		const accessToken = this.jwtService.sign(payload, {
			expiresIn: '1h'
		})

		const refreshToken = this.jwtService.sign(payload, {
			expiresIn: '7d'
		})

		return { accessToken, refreshToken }
	}

	addRefreshTokenToResponse(res: Response, refreshToken: string) {
		const expiresIn = new Date()
		expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN)

		res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
			httpOnly: true,
			expires: expiresIn,
			secure: true,
			sameSite: 'lax'
		})
	}

	removeRefreshTokenFromResponse(res: Response) {
		res.clearCookie(this.REFRESH_TOKEN_NAME)
	}
}
