import * as dotenv from 'dotenv';

dotenv.config();

export const ENV = {
	PORT: Number(process.env.PORT)
}

