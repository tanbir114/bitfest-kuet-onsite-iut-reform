/* eslint-disable @typescript-eslint/no-explicit-any */

const examplePrompt = [
    {
        question: 'তাবু থেকে রোজ বেরিয়ে সামিন কী দেখতো?',
        answer: 'সামিন তাবু থেকে রোজ বেরিয়ে চারদিকে বড় বড় লাল ঘাস, মাঝে মাঝে গাছ এবং খোলা জায়গার শেষ সীমায় একটা বড় বাওবাব গাছ দেখতো।',
    },
    {
        question: 'Baobab gach keno Samin er jonno special chhilo?',
        answer: 'সামিনের জন্য বাওবাব গাছ বিশেষ ছিল কারণ এটি সেই সময়ে সবচেয়ে বড় এবং আকারে বিখ্যাত ছিল, যা সামিন আগে শুধুমাত্র ছবিতে দেখেছিল।',
    },
    {
        question: 'এলাকার ঘাসের উচ্চতা কেমন ছিল?',
        answer: 'এলাকার ঘাস কোথাও মানুষের মাথা সমান উঁচু, আবার কোথাও তার চেয়েও উঁচু ছিল।',
    },
    {
        question: 'Engineer sahib ki bollo Samin ke ghase jawa niye?',
        answer: 'ইঞ্জিনিয়ার সাহেব বললেন যে বিনা প্রস্তুতিতে এখানে এক পা-ও যাওয়া উচিত নয়। ঘাসের জমিতে পথ হারিয়ে গেলে তৃষ্ণা এবং পানির অভাবে মারা যাওয়ার সম্ভাবনা থাকে।',
    },
    {
        question: 'কেন ইনজিনিয়ার সাহেব সামিনকে সাবধান করলেন?',
        answer: 'ইঞ্জিনিয়ার সাহেব সামিনকে সাবধান করলেন কারণ ঘাসের জমিতে পথ হারানোর ঝুঁকি ছিল এবং সিংহের উপস্থিতির সম্ভাবনা ছিল।',
    },
];

export const getChatTemplate = (docContext: any, message: string) => ({
    role: 'system',
    content: `
                You are an AI assistant who  can understand bangla language chat and reply like a human in bangla.  You  knows a lot of information and can organize them precisely in bangla language. Use the below context to augment what you know more specifically to reply in bangla language. The context will provide you with the most recent page data from the web.

                If the context doesn't include the information you need answer based on your existing knowledge and don't mention the source of your information or what the context does or does not include. Please reply only in bangla language strictly.

                Format responses using markdown where applicable and don't return images.

                ------------------------------
                START CONTEXT
                ${docContext}
                END CONTEXT
                ------------------------------

                Also few example of question and answer are given below for your reference. Follow the reference pattern to generate answers. Try to generate precise and short answer in Bangla language strictly.

                START EXAMPLE CHAT
                ${examplePrompt.map((prompt: any) => `Question: ${prompt.question}\nAnswer: ${prompt.answer}`).join('\n')}
                END EXAMPLE CHAT

                -----------------------------
                QUESTION: ${message}
                ------------------------------
            `,
});
