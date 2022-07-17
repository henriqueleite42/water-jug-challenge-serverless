import type { APIGatewayEvent } from "aws-lambda";
import { makeController } from "helpers/make-controller";

import { service } from "./service";
import { validate } from "./validate";

export const controller = makeController<APIGatewayEvent>(async ({ event }) => {
	const params = await validate(event.queryStringParameters || ({} as any));

	return service(params);
});
