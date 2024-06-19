import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';


@Controller('users')
export class UsersController{
	constructor(private readonly appService: UsersService) {}

  
	@Post('get')
	async getUser(@Body() body: {login: string}): Promise<number> 
	{		
		return await this.appService.getUser(body.login);
	}

	@Post('create')
	async createUser(@Body() body: Prisma.UserCreateInput)
	{
		return await this.appService.createUser(body);
	}	

	@Post('delete')
	async deleteUsers(@Body() body: {login: string})
	{
		const {login} = body;
		
		return this.appService.deleteUser(login)
	}


}


