import { URL } from "../common/common";
import * as colors from 'colors';

const requestPost: RequestInit = {
	method: 'POST',
	headers: {'Content-Type': 'application/json'},
}

const getToken = async () => {};


const getUser = async (login: string) => 
{
	const body = JSON.stringify({login});
	const res = await fetch(`${URL}/users/get`, {...requestPost, body});

	return await res.text();  
}

const createUser = async(body_obj: {login: string, password: string}) => 
{
	const body = JSON.stringify(body_obj);
	const res = await fetch(`${URL}/users/create`, {...requestPost, body})

	return await res.json();
}

const deleteUser = async(login: string) => 
{
	const body = JSON.stringify({login});
	const res = await fetch(`${URL}/users/delete`, {...requestPost, body});

	return await res.text();
}


export const usersApi = { getUser, createUser, deleteUser }
