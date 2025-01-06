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
export const getTemplate = () => ({
    role: 'user',
    content: `
                You are an AI assistant who can understand Banglish (Bangla language text written using english alphabets)  and convert it to fluent bangla text. Remember there can be both banglish and english text mixed in the given question. You should identify both and convert a fluent bangla language output.  

                If the context doesn't include the information you need answer based on your existing knowledge and don't mention the source of your information or what the context does or does not include.

                Also few example of translation are given below for your reference. Follow the reference pattern to generate  strictly bangla language text. 

                START  FORMAT
                ${examplePrompt.map((prompt) => `Banglish: ${prompt.Banglish}\nBangla text: ${prompt.Bangla}`).join('\n')}
                END  FORMAT
  
            `,
});

// Title Generation
const titleExample = [
    {
        story: 'জীবনের পথে নিজের অবস্থান নিজেকেই ঠিক করতে হবে। কেউ আপনার জন্য সেই পথটা প্রস্তুত করে রাখবে না। প্রতিবন্ধকতা আসবে, সেগুলো অতিক্রম করার সাহস নিজেকেই জোগাতে হবে। নিজেকে শক্তিশালী করে তোলাই জীবনের আসল সাফল্য।',
        title: 'নিজের অবস্থান',
    },
    {
        story: 'স্বপ্নটা আপনাকেই সাজাতে হবে। আপনার স্বপ্নটা কেউ রাঙিয়ে দেবে না। স্বপ্নটা যে কেবলই আপনার! অন্য কেউ আপনার জায়গায় আপনার স্বপ্ন পূরণ করবে না। প্রতিদিন একটু একটু করে স্বপ্নের পথে এগিয়ে যেতে হবে। স্বপ্নের শক্তি তখনই প্রকাশ পাবে যখন আপনি নিজেই তাতে প্রাণ সঞ্চার করবেন।',
        title: 'স্বপ্ন পূরণের দায়',
    },
    {
        story: 'ভালোটা আপনাকেই থাকতে হবে। আপনাকে ভালো রাখতে কেউ এগিয়ে আসবে না। দিন শেষে মন খারাপের ভার আপনাকেই বইতে হবে। ব্যাথাভরা নির্ঘুম রাত হুট করেই ভোরের আলো দেখে না। নিজের সুখ নিজেকেই খুঁজে বের করতে হবে। নিজের জীবনকেই নিজের মতো করে সাজাতে হবে।',
        title: 'ভালো থাকার লড়াই',
    },
    {
        story: 'কেউ আপনাকে বুঝবে না। আপনারই নিজেকে তৈরি করে সবাইকে নিজের মূল্য বুঝিয়ে দিতে হবে। গুরুত্বহীন জিনিসে কেউই মূল্য দিতে চায় না। নিজেকে মূল্যবান করে তোলার দায়িত্ব আপনারই। অন্যের প্রতীক্ষায় বসে থাকলে সময় শুধু নষ্ট হবে। নিজের ক্ষমতার পরিচয় নিজের কাজেই দিতে হবে।',
        title: 'নিজেকে প্রমাণ করা',
    },
    {
        story: 'আপনাকে কেউ মূল্য দেবে না। সমাজ যেন আপনাকে মূল্যায়ন করে, সে পথ আপনাকেই বের করতে হবে। সফল মানুষদের ভিড়ে ব্যর্থতার গল্প কারোই ভালো লাগে না। তাই সফলতার গল্প তৈরি করার জন্য নিজের চেষ্টায় ঝাঁপিয়ে পড়ুন। জয় আসবেই যদি চেষ্টা অব্যাহত থাকে।',
        title: 'মূল্যায়নের পথ',
    },
    {
        story: 'সময় কখনো আপনার জন্য থেমে থাকবে না। সময়ের মূল্য বোঝা এবং প্রতিটি মুহূর্ত কাজে লাগানো আপনার দায়িত্ব। আজকের সময় নষ্ট করলে আগামীকাল আর তা ফিরে পাবেন না। সফল হতে চাইলে আজ থেকেই সময়ের সঠিক ব্যবহার শিখতে হবে।',
        title: 'সময়ের মূল্য',
    },
];

export const getTitleTemplate = () => ({
    role: 'user',
    content: ` 
                You are an AI assistant who can suggest  bangla story title by reading a passage in bangla. Remember the title should be in bangla language as well as relevant to the passage and should be meaningful and catchy. The length of the title should be 3-10 words and must be 1 single line. Don't generate multiple titles.

                A context will be provided to generate it's title. Try to generate relevant bangla title and don't mention the source of your information or what the context does or does not include. You should not include 'Title:' also. Jus provide the precise title.

                Also few example of story and it's title are given below for your reference. Each story has only one title. Follow the reference pattern to generate bangla title. 

                START  FORMAT
                ${titleExample.map((prompt) => `Story: ${prompt.story}\nTitle: ${prompt.title}`).join('\n')}
                END  FORMAT`,
});

// Tags generation

const exampleTags = [
    {
        story: 'জীবনের পথে নিজের অবস্থান নিজেকেই ঠিক করতে হবে। কেউ আপনার জন্য সেই পথটা প্রস্তুত করে রাখবে না। প্রতিবন্ধকতা আসবে, সেগুলো অতিক্রম করার সাহস নিজেকেই জোগাতে হবে। নিজেকে শক্তিশালী করে তোলাই জীবনের আসল সাফল্য।',
        tags: ['life', 'courage', 'strength', 'success'],
    },
    {
        story: 'স্বপ্নটা আপনাকেই সাজাতে হবে। আপনার স্বপ্নটা কেউ রাঙিয়ে দেবে না। স্বপ্নটা যে কেবলই আপনার! অন্য কেউ আপনার জায়গায় আপনার স্বপ্ন পূরণ করবে না। প্রতিদিন একটু একটু করে স্বপ্নের পথে এগিয়ে যেতে হবে। স্বপ্নের শক্তি তখনই প্রকাশ পাবে যখন আপনি নিজেই তাতে প্রাণ সঞ্চার করবেন।',
        tags: ['dream', 'effort', 'motivation', 'achievement'],
    },
    {
        story: 'ভালোটা আপনাকেই থাকতে হবে। আপনাকে ভালো রাখতে কেউ এগিয়ে আসবে না। দিন শেষে মন খারাপের ভার আপনাকেই বইতে হবে। ব্যাথাভরা নির্ঘুম রাত হুট করেই ভোরের আলো দেখে না। নিজের সুখ নিজেকেই খুঁজে বের করতে হবে। নিজের জীবনকেই নিজের মতো করে সাজাতে হবে।',
        tags: ['happiness', 'selfcare', 'peace', 'life'],
    },
    {
        story: 'কেউ আপনাকে বুঝবে না। আপনারই নিজেকে তৈরি করে সবাইকে নিজের মূল্য বুঝিয়ে দিতে হবে। গুরুত্বহীন জিনিসে কেউই মূল্য দিতে চায় না। নিজেকে মূল্যবান করে তোলার দায়িত্ব আপনারই। অন্যের প্রতীক্ষায় বসে থাকলে সময় শুধু নষ্ট হবে। নিজের ক্ষমতার পরিচয় নিজের কাজেই দিতে হবে।',
        tags: ['value', 'selfworth', 'action', 'responsibility'],
    },
    {
        story: 'আপনাকে কেউ মূল্য দেবে না। সমাজ যেন আপনাকে মূল্যায়ন করে, সে পথ আপনাকেই বের করতে হবে। সফল মানুষদের ভিড়ে ব্যর্থতার গল্প কারোই ভালো লাগে না। তাই সফলতার গল্প তৈরি করার জন্য নিজের চেষ্টায় ঝাঁপিয়ে পড়ুন। জয় আসবেই যদি চেষ্টা অব্যাহত থাকে।',
        tags: ['success', 'effort', 'society', 'recognition'],
    },
    {
        story: 'সময় কখনো আপনার জন্য থেমে থাকবে না। সময়ের মূল্য বোঝা এবং প্রতিটি মুহূর্ত কাজে লাগানো আপনার দায়িত্ব। আজকের সময় নষ্ট করলে আগামীকাল আর তা ফিরে পাবেন না। সফল হতে চাইলে আজ থেকেই সময়ের সঠিক ব্যবহার শিখতে হবে।',
        tags: ['time', 'value', 'success', 'discipline'],
    },
];

export const getTagsTemplate = () => ({
    role: 'user',
    content: ` 
                You are an AI assistant who can suggest  bangla story tags by reading a passage in bangla. Remember the all tags should be in english language as well as relevant to the passage and should be meaningful. 
                All the tags  should be:
                1. single word
                2. all lowercase.
                3. no special character in it
                

                A context will be provided to generate it's tags. Try to generate relevant english tags and don't mention the source of your information or what the context does or does not include. You should not include 'Tags:' also. Provide tags in this format:
                {"tags": ["friend", "knowledge", "wisdom", "experience", "life"]}

                Don't add any white space , other text with array of tags or other thing.

                Also few example of story and it's tags are given below for your reference. Each story has one or more tags. Follow the reference pattern to generate english tags. 

                START  FORMAT
                ${exampleTags.map((prompt) => `Story: ${prompt.story}\nTags: ${prompt.tags}`).join(', ')}
                END  FORMAT`,
});
