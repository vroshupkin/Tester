
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/database.service';
import { User, Prisma } from '@prisma/client';
import { TestInput } from './tests.type';

@Injectable()
export class TestService {
	constructor(private prisma: PrismaService) {}

	async getTestsCases(user_id: number)
	{


	}

	// TODO сделать защищенным 
	async appendInputTestCase(user_id: number, data: TestInput)
	{
    
	}

	async appendTestCase(user_id: number, )
	{

	}

	async getTestCase(user_id: number, name: string)
	{

	}

	async getAllTestsCase(user_id: number)
	{
    
	}


}