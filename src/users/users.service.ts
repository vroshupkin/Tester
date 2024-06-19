
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/database.service';
import { User, Prisma } from '@prisma/client';

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

	async createUser(data: Prisma.UserCreateInput): Promise<User> {
		return this.prisma.user.create({data});
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

	async deleteUser(login: string): Promise<User> {
		return await this.prisma.user.delete({where: {login}});
	}
}