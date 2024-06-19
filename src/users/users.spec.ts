import { usersApi } from "./users.api";


describe('users', () => {
	{
		const login = 'mock_test';
		const password = 'mock_test';
		
		beforeAll( async () => 
		{
			await usersApi.deleteUser(login);
		})

		test('create user', async () => 
		{
			const res = await usersApi.createUser({login, password});
			expect(res.id > 0).toBe(true);
		})

		// TODO защитить эндпоинт
		test('get user', async () => 
		{	
			const userId = await usersApi.getUser(login);
			
			expect(Number(userId) > 0).toBe(true);
		})
	}
})



