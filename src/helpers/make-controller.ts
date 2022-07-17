import type { Callback, Context } from "aws-lambda";
import { CustomError } from "utils/error";

import type { Func } from "../types/route";
import { StatusCodeEnum } from "enums/status-code";

export const makeController =
	<T = any>(func: Func<T>) =>
	async (event: T, context: Context, callback: Callback): Promise<any> => {
		try {
			const result = await func({
				event,
				context,
				callback,
			});

			return result;
		} catch (err: any) {
			console.error(err);

			if (err instanceof CustomError) {
				return err;
			}

			return {
				statusCode: StatusCodeEnum.INTERNAL,
			};
		}
	};
