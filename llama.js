import { HfInference } from "@huggingface/inference";

const client = new HfInference("");

let out = "";

const stream = client.chatCompletionStream({
	model: "google/gemma-2-2b-it",
	messages: [
		{
			role: "user",
			content: "What is the capital of France?"
		}
	],
	max_tokens: 500
});

for await (const chunk of stream) {
	if (chunk.choices && chunk.choices.length > 0) {
		const newContent = chunk.choices[0].delta.content;
		out += newContent;
		console.log(newContent);
	}  
}