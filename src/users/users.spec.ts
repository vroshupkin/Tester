import * as usersApi from "./users.api";
import { logger_1 } from '../common/common';
import { HttpStatus } from '@nestjs/common';



describe('users', () => {
	{
		const login = 'mock_test';
		const password = 'mock_test';
		let token = '';

		beforeAll( async () => 
		{
			await usersApi.deleteUser({login});
		})

		test('create user', async () => 
		{
			const res = await usersApi.createUser({login, password});

			expect(res.id > 0).toBe(true);
		})

		test('login', async() => 
		{
			const res = await usersApi.loginUser({login, password});
			
			token = await res.text();
			
			expect(res.status).toBe(202);
			expect(token.length > 0).toBe(true);			
		})

		test('verify token', async () => {
			const res = await usersApi.getUserRoles({token, login});
			const roles = await res.json();

			logger_1(roles);

			expect(roles.includes('User')).toBe(true);
		}, 10000)

		test('get user', async () => 
		{	
			const res = await usersApi.getUser({login});
			const id = Number(await res.text());

			expect(id > 0).toBe(true);
			expect(res.status).toBe(HttpStatus.OK)
		})
	}
})



