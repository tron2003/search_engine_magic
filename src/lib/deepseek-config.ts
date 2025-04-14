import { DeepSeek } from "@deepseek/sdk" // Or appropriate SDK

export const deepseek = new DeepSeek({
    apiKey: process.env.DEEPSEEK_API_KEY
})