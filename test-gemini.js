import fs from 'fs';
import path from 'path';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Read .env manually
const envPath = path.resolve('.env');
const envStr = fs.readFileSync(envPath, 'utf8');
const keyMatch = envStr.match(/VITE_GEMINI_API_KEY=(.*)/);

if (!keyMatch || !keyMatch[1]) {
    console.error("NO KEY FOUND IN .ENV");
    process.exit(1);
}

const key = keyMatch[1].trim().replace(/^"|"$/g, '');
console.log("Using key starting with:", key.substring(0, 10) + "...");

async function testModel() {
    try {
        console.log("Testing generateContent with gemini-2.5-flash...");
        const genAI = new GoogleGenerativeAI(key);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent("Say 'hello world'");
        console.log("SUCCESS! Result:", result.response.text());
    } catch (e) {
        console.error("ERROR:", e.message);
    }
}

testModel();
