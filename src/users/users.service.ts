import * as colors from 'colors';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/database.service';
import { User, Prisma } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import { ENV } from '../env';
import { TUsersRole as TUserRole } from './users.types';

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	async getUser(login: string): Promise<number | undefined>
	{
		const data = await this.prisma.user.findFirst({where: {login}})

		if(data != null && 'id' in data)
		{
			return data.id;
		}

		return null;
	}

	// TODO нужно ли?
	async user(
		userWhereUniqueInput: Prisma.UserWhereUniqueInput,
	): Promise<User | null> {
		return this.prisma.user.findUnique({
			where: userWhereUniqueInput,
		});
	}

	// TODO нужно ли?
	async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
		const { skip, take, cursor, where, orderBy } = params;
		return this.prisma.user.findMany({
			skip,
			take,
			cursor,
			where,
			orderBy,
		});
	}

	async createUser(data: {login: string, password: string}): Promise<User> {
		const {login, password} = data;

		const user = await this.prisma.user.create({
			data: {
				login, password,
				UserRole: {
					create: { roles: ['User']}
				}
			},
		
		});

		return user;
	}

	async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
		const { where, data } = params;
		return this.prisma.user.update({
			data,
			where,
		});
	}

	async deleteUser(login: string): Promise<User> 
	{
		const user = await this.prisma.user.findFirst({where: {login}});

		await this.prisma.userRole.delete({where: {userId: user.id}});

		return await this.prisma.user.delete({
			where: {id: user.id},
		});
	}

	async login(login: string, password: string) 
	{
		const user = await this.prisma.user.findFirst({where: {login}});
		const {roles} = await this.prisma.userRole.findFirst({where: {userId: user.id}});

		if(!user || user.password != password)
		{
			return null;
		}
					
		const payload = {type: "user_verify", login, roles};

		return jwt.sign(payload, ENV.JWT_SECRET, {expiresIn: '1d'});
	}

	// Проверяет принадлежит ли токен пользователю и соответсвует от он роли roles. 
	async isUserToken(input: {login: string, token: string, roles?: TUserRole[]})
	{
		const {login, token} = input;

		const decoded = jwt.verify(token, ENV.JWT_SECRET);
		
		if(!decoded || login != decoded['login'])
		{
			return false
		}

		// console.log(colors.bgGreen(JSON.stringify(decoded)));
		// console.log((decoded['roles'] as string[]).includes);


		const roles = input.roles ?? ['User'];

		for (const role of roles) 
		{
			if(!decoded['roles'].includes(role))
			{
				return false
			}
		}
		
		return decoded['login'] === input.login
	}

}