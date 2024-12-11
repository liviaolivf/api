import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    DATABASE_URL: z.string(),
    PORT: z.number().default(3333)
}) // This is a schema that describes the shape of the env vars

const _env = envSchema.safeParse(process.env) // This will throw if the env vars are not valid

if (_env.success === false) {
    console.error('🐞 Invalid env vars:', _env.error.format())
    throw new Error('Invalid env vars')
}

export const env = _env.data // This is the actual env object that we will use in the app