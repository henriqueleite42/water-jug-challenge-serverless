/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @typescript-eslint/naming-convention */

import { solve } from "@techmmunity/water-jug-solver";
import { CustomError } from "utils/error";

import { StatusCodeEnum } from "enums/status-code";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ServiceParams {
	firstJugCapacity: number;
	secondJugCapacity: number;
	desiredAmount: number;
}

export const service = (params: ServiceParams) => {
	const result = solve(params);

	if (!result.solvable) {
		throw new CustomError("Unsolvable", StatusCodeEnum.BAD_REQUEST);
	}

	return {
		statusCode: StatusCodeEnum.SUCCESS,
		body: JSON.stringify(result),
	};
};
