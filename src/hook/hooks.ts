import { Before,After,BeforeAll, AfterAll} from "@cucumber/cucumber";


import { type Browser, type BrowserContext } from "@playwright/test";

import { PageFixture } from "./fixture";

import { browseroptions } from "../helper/browsers/browserManager";
import { getEnv } from "../helper/env/env";
import { log } from "../helper/logger";
import { createLogger } from "winston";

let browser: Browser;  
let context: BrowserContext;


BeforeAll(async function(){
  getEnv();
browser =await browseroptions()
})

Before(async function({pickle}){
    context = await browser.newContext();
   PageFixture.page=await context.newPage();
   PageFixture.logger=createLogger(log(pickle.name+pickle.id));
    
})



After(async function({result}){
    if(result?.status==="FAILED" && PageFixture.page && !PageFixture.page.isClosed()){
        const img= await PageFixture.page.screenshot({path:"./reports/screenshot",type:"png"});
await this.attach(img,"image/png");  
    }
  
    await context.close();
})

AfterAll(async function(){
    await browser?.close();
    PageFixture.logger?.close();

});
