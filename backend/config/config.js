import dotenv from 'dotenv'
dotenv.config({path:'../.env'})
export const ENV_VARS =
{

    PORT : process.env.PORT,
    MONGO_URI : process.env.MONGO_URI,
    NODE_ENV : process.env.NODE_ENV,
    JWT_TOKEN : process.env.JWT_TOKEN,

}

console.log(ENV_VARS.PORT)