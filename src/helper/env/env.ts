import * as dotenv from "dotenv";

 
export const getEnv=()=>{
const envName = process.env.ENV || "prod";

dotenv.config({
override:false,
quiet: true,
path:`src/helper/env/.env.${envName}`

});

process.env.ENV = envName;
}

getEnv();
