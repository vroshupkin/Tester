import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import * as jwt from 'jsonwebtoken'


@Controller('users')
export class UsersController{
	constructor(private readonly usersService: UsersService) {}

  
	@Post('login')
	async login(@Body() body: {login: string, password: string})
	{
		const {login, password} = body;
		return await this.usersService.login(login, password);
	}

	@Post('get')
	async getUser(@Body() body: {login: string,}): Promise<number> 
	{		
		return await this.usersService.getUser(body.login);
	}

	@Post('create')
	async createUser(@Body() body: Prisma.UserCreateInput)
	{
		
		return await this.usersService.createUser(body);
	}	

	@Post('delete')
	async deleteUsers(@Body() body: {login: string})
	{
		const {login} = body;

		return await this.usersService.deleteUser(login)
	}

	@Post('verify_token')
	async verifyToken(@Body() body: {login: string, token: string})
	{
		return await this.usersService.isUserToken(body);
	}
}


