import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/database/database.service';

@Module({
	imports: [],
	controllers: [UsersController],
	providers: [UsersService, PrismaService],
})
export class UsersModule {}

