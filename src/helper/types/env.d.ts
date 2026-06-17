
export{};
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BROWSER: 'chromium' | 'chrome' | 'firefox' | 'webkit' | 'safari',
            ENV:"staging"|"prod"|"Dev",
            BaseURL:string,
            APP_USERNAME:string,
            APP_PASSWORD:string,
            HEADLESS:"true"|"false",
            CI:string
        }
}
}
