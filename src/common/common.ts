import {ENV} from '../env'
import * as colors from 'colors'

export const URL = `http://localhost:${ENV.PORT}`;

type TLoggerOptions = {
	withFileLog?: true,
	disable?: true
}

// eslint-disable-next-line 
const logger_constructor = (id: number, options?: TLoggerOptions) => (str: string | number | Record<any, any>) => 
{
	if(typeof str === 'object' && str !== null)
	{
		str = JSON.stringify(str);
	}

	const HEADER = colors.bgGreen(` LOGGER ${id} `);
	
	console.log(`${HEADER} ${str}`)  

	if(!options)
	{
		return;
	}

	if(options.withFileLog)
	{
		console.log(getFileLog())
	}
}

const getFileLog = () => 
{
	const err = new Error();
	console.log(err.stack.split('\n')[3]);
}
	
export const logger_1 = logger_constructor(1, {withFileLog: true});