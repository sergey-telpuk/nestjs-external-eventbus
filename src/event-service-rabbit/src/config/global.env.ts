export const EVENT_SERVICE = {
    PATTERN: process.env.EVENT_SERVICE_PATTERN,
};

export const RABBIT_SERVICE = {
    URLS: [
        process.env.RABBITMQ_URL,
    ],
    QUEUE: process.env.RABBITMQ_QUEUE,
    QUEUE_OPTIONS: {
        durable: true,
    },
};
