import type { Page } from "@playwright/test"; 

import { Logger } from "winston";
export const PageFixture = {
  //@ts-ignore
    page: undefined as Page,
    //@ts-ignorets-ignore
    logger: undefined as Logger
}
