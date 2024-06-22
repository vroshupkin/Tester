import * as colors from 'colors';
import * as usersApi from "./users.api";

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
			token = await usersApi.loginUser({login, password})
			
			
			expect(token.length > 0).toBe(true);			
		})

		test('verify token', async() => {
			const isUser = await usersApi.isUserToken({token, login});
			expect(isUser).toBe("true");
		})

		test('get user', async () => 
		{	
			const userId = await usersApi.getUser({login});
			
			expect(Number(userId) > 0).toBe(true);
		})
	}
})



