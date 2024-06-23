import { URL, logger_1 } from "../common/common";

const requestPost: RequestInit = {
	method: 'POST',
	headers: {'Content-Type': 'application/json'},
}


const postFetch = async <T extends Record<string, unknown>>(
	body_input: T, end_point: string) => 
{
	const body = JSON.stringify(body_input);
	const res = await fetch(`${URL}/${end_point}`, {...requestPost, body});

	return res
}

const postFetchJson = async <T extends Record<string, unknown>>(
	body_input: T, end_point: string) => 
{
	const body = JSON.stringify(body_input);
	const res = await fetch(`${URL}/${end_point}`, {...requestPost, body});

	return res.json();
}



export const getUser = (body: {login: string}) => 
	postFetch(body, 'users/get');


export const createUser = (body: {login: string, password: string}) => 
	postFetchJson(body, 'users/create');
	

export const deleteUser = (body: {login: string}) => 
	postFetch(body, 'users/delete');


export const loginUser = (body: {login: string, password: string}) => 
	postFetch(body, 'users/login');


export const getUserRoles = 
	(body_input: {login: string, token: string}) =>
		postFetch(body_input, 'users/get_user_roles')
