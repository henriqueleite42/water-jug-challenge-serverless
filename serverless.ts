/* eslint-disable @typescript-eslint/naming-convention */

import type { AWS } from "@serverless/typescript";

import { challengesDomain } from "./src/api/challenge";

const serverlessConfig: Partial<AWS> = {
	service: "water-jug-challenge",
	functions: challengesDomain,
	configValidationMode: "error",
	plugins: [
		"serverless-webpack",
	],
	frameworkVersion: "3",
	useDotenv: true,
	package: {
		individually: true,
	},
	custom: {
		region: {
			dev: "us-east-2",
			local: "us-east-2",
			production: "us-east-1",
		},
	},
	provider: {
		name: "aws",
		region: "${self:custom.region.${opt:stage, 'dev'}}" as any,
		runtime: "nodejs14.x",
		memorySize: 128,
		timeout: 5,
		logRetentionInDays: 1,
		apiGateway: {
			minimumCompressionSize: 1024,
			shouldStartNameWithService: true,
		},
		environment: {
			STACK_NAME: "${self:service}-${opt:stage, 'dev'}",
			AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
			NODE_PATH: "./:/opt/node_modules",
			NODE_ENV: "${opt:stage, 'dev'}",
			CLOUD_REGION: "${self:provider.region}",
		},
		tags: {
			costs: "${self:service}-${opt:stage, 'dev'}",
			environment: "${opt:stage, 'dev'}",
		},
		stackTags: {
			costs: "${self:service}-${opt:stage, 'dev'}",
			environment: "${opt:stage, 'dev'}",
		},
	},
};

//@ts-ignore
export = serverlessConfig;
