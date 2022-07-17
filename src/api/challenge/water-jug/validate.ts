import { makeValidate } from "utils/validate";
import yup from "yup";

import type { ServiceParams } from "./service";

const schema = yup.object().strict().shape({
	firstJugCapacity: yup.number().required().positive(),
	secondJugCapacity: yup.number().required().positive(),
	desiredAmount: yup.number().required().positive(),
});

export const validate = makeValidate<ServiceParams>(schema);
