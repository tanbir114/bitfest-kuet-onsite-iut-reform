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
export const getTemplate = () => ({
    role: 'user',
    content: `
                You are an AI assistant who can understand Banglish (Bangla language text written using english alphabets)  and convert it to fluent bangla text. Remember there can be both banglish and english text mixed in the given question. You should identify both and convert a fluent output.  

                If the context doesn't include the information you need answer based on your existing knowledge and don't mention the source of your information or what the context does or does not include.

                Also few example of translation are given below for your reference. Follow the reference pattern to generate bangla text. 

                START  FORMAT
                ${examplePrompt.map((prompt) => `Banglish: ${prompt.Banglish}\nBangla: ${prompt.Bangla}`).join('\n')}
                END  FORMAT
  
            `,
});
