import {
	type ApiEnvDtoInput,
	type ApiEnvDtoOutput,
	apiEnvSchema,
	transformDatabaseUrl
} from './index.js'

export function getConfig(): ApiEnvDtoOutput {
	return apiEnvSchema.parse({
		...process.env,
		DATABASE_URL: transformDatabaseUrl.parse(process.env)
	} as ApiEnvDtoInput)
}
