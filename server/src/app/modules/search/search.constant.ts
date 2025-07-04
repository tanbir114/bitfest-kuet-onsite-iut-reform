// Story Module Constants
const examplePrompt = [
    {
        Banglish: 'Tumi kemon acho?',
        Bangla: 'তুমি কেমন আছো?',
    },
    {
        Banglish: 'Ami school jabo kalke.',
        Bangla: 'আমি স্কুল যাবো কালকে।',
    },
    {
        Banglish: 'Ajke amader  class e ekta presentation hobe.',
        Bangla: 'আজকে আমাদের ক্লাসে একটা প্রেজেন্টেশন হবে।',
    },
    {
        Banglish: 'Amar jonmodin 25 December.',
        Bangla: 'আমার জন্মদিন ২৫ ডিসেম্বর।',
    },
    {
        Banglish: 'Tara golap fuler moto shundor.',
        Bangla: 'তারা গোলাপ ফুলের মতো সুন্দর।',
    },
    {
        Banglish: 'Tumi kothay chile ajke?',
        Bangla: 'তুমি কোথায় ছিলে আজকে?',
    },
    {
        Banglish: 'Please ekta glass pani anbe?',
        Bangla: 'প্লিজ একটা গ্লাস পানি আনবে?',
    },
    {
        Banglish: 'Apnar bari kothay?',
        Bangla: 'আপনার বাড়ি কোথায়?',
    },
    {
        Banglish: 'Amar naam Samin, tomar naam ki?',
        Bangla: 'আমার নাম সামিন, তোমার নাম কি?',
    },
    {
        Banglish: 'Amar laptop ta kaj korchhe na.',
        Bangla: 'আমার ল্যাপটপটা কাজ করছে না।',
    },
];
export const getSearchPromptTemplate = () => ({
    role: 'user',
    content: `
                You are an AI assistant who can understand Banglish (Bangla language text written using english alphabets), bangla and englisht text  then convert it to fluent bangla text. Also you can extract relavent search keywords (single word) from the given context in banglish or english. Remember there can be both banglish and english text mixed in the given question. You should identify both.

                If the context doesn't include the information you need answer based on your existing knowledge and don't mention the source of your information or what the context does or does not include.

                Also few example of translation are given below for your reference. Follow the reference pattern to generate  strictly bangla language text. 

                START  FORMAT
                ${examplePrompt.map((prompt) => `Banglish: ${prompt.Banglish}\nBangla text: ${prompt.Bangla}`).join('\n')}
                END  FORMAT

                Generate response in this format
                {
                    "banglish": "Ami valo achi.",
                    "bangla": "আমি ভালো আছি।",
                    "keywords": ["ami", "bhalo", "achi"]
                }
                follow some rules:
                1. don't add any unncessary information or text other than the object.
                2. don't change the object key name.
                3. don't change the object key sequence.
                4. if search query in all bangla then banglish key value should be converted to banglish (bangla in english alphabets)
            `,
});
