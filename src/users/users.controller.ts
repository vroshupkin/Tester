import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController{
	constructor(private readonly appService: UsersService) {}

  
	@Post('user')
	async getUser(@Body() body: {login: string}): Promise<string> {		
		const result = 'login' in body ?
			await this.appService.user(body) :
			{};

		return JSON.stringify(result);
	}
}


