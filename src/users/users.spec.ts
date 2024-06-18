import { URL } from "../common/common";

// TODO защитить эндпоинт
test('get user', async () => 
{
	const requestInit: RequestInit = {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			login: 'test'
		})
	}

	const res = await fetch(`${URL}/users/user`, requestInit);

	const data = await res.json();
	
	const {password} = data;

	expect(password != undefined && typeof password === 'string')
		.toBe(true);
  
})


