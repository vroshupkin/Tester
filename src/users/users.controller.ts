import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController{
	constructor(private readonly usersService: UsersService) {}

  
	@Post('login')
	@HttpCode(HttpStatus.ACCEPTED)
	async login(@Body() body: {login: string, password: string}, @Res() response: Response)
	{
		const {login, password} = body;
		const token = await this.usersService.login(login, password);

		if(!token)
		{
			response.status(HttpStatus.BAD_REQUEST).send();
			return;
		}

		response.status(HttpStatus.ACCEPTED).send(token);
		
	}

	@Post('get')
	@HttpCode(HttpStatus.OK)
	async getUser(@Body() body: {login: string})
	{		
		const {login} = body;

		return (await this.usersService.getUser({login})).id;
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

	@Post('get_user_roles')
	@HttpCode(HttpStatus.OK)
	async verifyToken(@Body() body: {login: string, token: string}, @Res() response: Response)
	{	

		const data = await this.usersService.getUserRoles(body);

		response.status(HttpStatus.OK);
		response.send(data);
		
	}
}


