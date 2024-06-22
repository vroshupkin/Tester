import * as dotenv from 'dotenv';

dotenv.config();

export const ENV = {
	PORT: Number(process.env.PORT),
	JWT_SECRET: String(process.env.JWT_SECRET)
}

