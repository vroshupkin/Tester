import { URL } from "../common/common";
import * as colors from 'colors';
import { TUsersRole } from "./users.types";

const requestPost: RequestInit = {
	method: 'POST',
	headers: {'Content-Type': 'application/json'},
}


const postFetchText = async <T extends Record<string, unknown>>(
	body_input: T, end_point: string) => 
{
	const body = JSON.stringify(body_input);
	const res = await fetch(`${URL}/${end_point}`, {...requestPost, body});

	return res.text();
}

const postFetchJson = async <T extends Record<string, unknown>>(
	body_input: T, end_point: string) => 
{
	const body = JSON.stringify(body_input);
	const res = await fetch(`${URL}/${end_point}`, {...requestPost, body});

	return res.json();
}



export const getUser = (body: {login: string}) => 
	postFetchText(body, 'users/get');


export const createUser = (body: {login: string, password: string}) => 
	postFetchJson(body, 'users/create');
	

export const deleteUser = (body: {login: string}) => 
	postFetchText(body, 'users/delete');


export const loginUser = (body: {login: string, password: string}) => 
	postFetchText(body, 'users/login');


export const isUserToken = 
	async(body_input: {login: string, token: string, roles?: TUsersRole[]})=>
		postFetchText(body_input, 'users/verify_token')
