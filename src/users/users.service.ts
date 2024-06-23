
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from '../database/database.service';
import { ENV } from '../env';
import { TUsersRole as TUserRole } from './users.types';

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}


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

	deleteUser = async (login: string): Promise<User> =>
	{
		const user = await this.prisma.user.findFirst({where: {login}});

		await this.prisma.userRole.delete({where: {userId: user.id}});

		return await this.prisma.user.delete({
			where: {id: user.id},
		});
	}

	login = async (login: string, password: string): Promise<string | null> => 
	{
		const user = await this.prisma.user.findFirst({where: {login}});
		if(!user || user.password != password)
		{
			return null;
		}

		const roles = await this.prisma.userRole.findFirst({where: {userId: user.id}});

		if(!roles)
		{
			await this.prisma.userRole.create({data: {userId: user.id, roles: ['User']}})
		}					
		const payload = {type: "user_verify", login, roles: roles};

		return jwt.sign(payload, ENV.JWT_SECRET, {expiresIn: '1d'});
	}

	getUserRoles = async (input: {login: string, token: string}): Promise<TUserRole[] | false> =>
	{
		const {login, token} = input;
		const userToken = new UserToken(login, this.prisma);

		if(await userToken.verify(token))
		{	
			const user = await this.prisma.user.findFirst({where: {login}});
			if(!user) {return false}

			const user_role = await this.prisma.userRole.findFirst({where: {userId: user.id}});
			if(user_role) {return false}
			
			return user_role.roles as TUserRole[];
		}
		else
		{
			return false;
		}
	}

	getUser = async (input: {login: string}) =>
	{
		const {login} = input;
		return await this.prisma.user.findFirst({where: {login}});
	}


}

class UserToken
{
	private type = 'user_verify'

	constructor(private login: string, private prisma: PrismaService){}

	verify = async (token: string) => 
	{
		const decoded = jwt.verify(token, ENV.JWT_SECRET);
		const isLoginExist = await this.isLoginExist();

		return decoded && decoded['type'] === 'user_verify' && isLoginExist
	}

	encode = async () => 
	{
		if(await this.isLoginExist())
		{
			return ''
		}
		
		return jwt.sign({login: this.login, type: this.type}, ENV.JWT_SECRET);
	}

	private isLoginExist = async() => 
	{
		const login = this.login;
		const user = this.prisma.user.findFirst({where: {login}});

		return user ? true : false;
	}

}