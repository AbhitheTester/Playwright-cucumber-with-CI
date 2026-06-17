import winston from "winston";

export const log = (scenarioName: string) => winston.createLogger({

    level: "info",

    format: winston.format.combine(

        winston.format.timestamp(),

        winston.format.printf((info: winston.Logform.TransformableInfo) => {
            const { timestamp, level, message } = info as { timestamp?: string; level?: string; message?: string };
            return `${timestamp ?? ''} ${level?.toUpperCase() ?? ''} ${message ?? ''}`;

        })

    ),

    transports: [

        new winston.transports.Console(),

        new winston.transports.File({
            filename: `test-results/logs/${scenarioName}/log.log`
        })

    ]

});