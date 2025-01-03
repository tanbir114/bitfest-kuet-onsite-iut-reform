# BITFEST_ONSITE_IUT_REFORM

## API ENDPOINTS

-   `http:localhost:5001/api/user/login`

```
    // Req Body
    {
        "email" : "tanvirhossain20@iut-dhaka.edu",
        "password" : "123456"
    }
```

```
    // Response Example
    {
        "success": true,
        "statusCode": 200,
        "message": "User logged in successfully",
        "data": {
            "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRhbnZpcmhvc3NhaW4yMEBpdXQtZGhha2EuZWR1Iiwicm9sZSI6InVzZXIiLCJuYW1lIjoiVGFudmlyIEhvc3NhaW4gRGloYW4iLCJpZCI6IjY3Nzc3OTljNmExZDVjNjk0NzdkNmYxYiIsImlhdCI6MTczNTg4MzIxOCwiZXhwIjoxNzM2NDg4MDE4fQ._9vTXQnwTV0tgVS_dUXRRn83jrhl2lyIIrt5o9WOf6A",
            "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRhbnZpcmhvc3NhaW4yMEBpdXQtZGhha2EuZWR1Iiwicm9sZSI6InVzZXIiLCJuYW1lIjoiVGFudmlyIEhvc3NhaW4gRGloYW4iLCJpZCI6IjY3Nzc3OTljNmExZDVjNjk0NzdkNmYxYiIsImlhdCI6MTczNTg4MzIxOCwiZXhwIjoxNzY3NDQwODE4fQ.C1OAuzPlqyquBtiijsoXvB_hGuWqFTO079QQ5z1q1jI",
            "loggedInUser": {
                "_id": "6777799c6a1d5c69477d6f1b",
                "role": "user",
                "name": "Tanvir Hossain Dihan",
                "email": "tanvirhossain20@iut-dhaka.edu",
                "__v": 0
            }
        }
    }
```

-   `http:localhost:5001/api/user/signup`

```
    // Req Body
    {
        "name":"Tanvir Hossain Dihan",
        "email" : "tanvirhossain20@iut-dhaka.edu",
        "password" : "123456"
    }
```

```
    // Response Example
{
    "success": true,
    "statusCode": 200,
    "message": "User registered successfully",
    "data": {
        "role": "user",
        "name": "Tanvir Hossain Dihan",
        "email": "tanvirhossain20@iut-dhaka.edu",
        "password": "",
        "_id": "6777799c6a1d5c69477d6f1b",
        "__v": 0
    }
}
```

-   `http:localhost:5001/api/user/signup`

```
// body
{
    "title": "This is story title",
    "originalContent": "This is demo story",
    "tags": ["horror", "thriller" ],
    "author": "6777799c6a1d5c69477d6f1b"
}
```

```
// Response Example
{
    "success": true,
    "statusCode": 200,
    "message": "Initial story created successfully",
    "data": {
        "title": "This is story title",
        "originalContent": "This is demo story",
        "tags": [
            "horror",
            "thriller"
        ],
        "_id": "67778397226c88c5b1c74179",
        "createdAt": "2025-01-03T06:28:39.372Z",
        "updatedAt": "2025-01-03T06:28:39.372Z",
        "__v": 0
    }
}
```

-   `/story/initial`

```
// body
{
    "title": "This is story title",
    "originalContent": "Hackathon er question onek kothin.",
    "tags": ["horror", "thriller" ],
    "author": "6777799c6a1d5c69477d6f1b"
}
```

```
// Response Example
{
    "success": true,
    "statusCode": 200,
    "message": "Initial story created successfully",
    "data": {
        "newStory": {
            "title": "This is story title",
            "originalContent": "Hackathon er question onek kothin.",
            "tags": [
                "horror",
                "thriller"
            ],
            "_id": "6777c96af83cf0051219081c",
            "createdAt": "2025-01-03T11:26:34.839Z",
            "updatedAt": "2025-01-03T11:26:34.839Z",
            "__v": 0
        },
        "generatedContent": "হ্যাকাথনের প্রশ্নগুলো অনেক কঠিন।"
    }
}
```

-   `/story/final/<id>`

```
// body
{
    "title": "This is story title",
    "originalContent": "Hackathon er question onek kothin.",
    "tags": ["horror", "thriller" ],
    "author": "6777cd02a35610db18ae569b",
    "generatedContent": "হ্যাকাথনের প্রশ্ন অনেক কঠিন।"
}
```

```
// Response
{
    "success": true,
    "statusCode": 200,
    "message": "Final story updated successfully",
    "data": {
        "_id": "6777cd40a35610db18ae569f",
        "title": "This is story title",
        "originalContent": "Hackathon er question onek kothin.",
        "tags": [
            "horror",
            "thriller"
        ],
        "author": "6777cd02a35610db18ae569b",
        "createdAt": "2025-01-03T11:42:56.361Z",
        "updatedAt": "2025-01-03T11:45:05.360Z",
        "__v": 0,
        "generatedContent": "হ্যাকাথনের প্রশ্ন অনেক কঠিন।"
    }
}
```

-   `/story`

```
{
    "success": true,
    "statusCode": 200,
    "message": "All stories fetched successfully",
    "data": [
        {
            "_id": "6777f48c3b068405e41d88b2",
            "title": "পরিবর্তন ও স্বপ্ন ভালো থাকার লড়াই",
            "originalContent": "পরিবর্তনে আপনাকেই অংশ নিতে হবে, আপনার পরিবর্তনের দায়িত্ব কেউ হাতে তুলে নেবে না। অন্যের সময় কখনো এমনটা করার নয়। স্বপ্ন আপনাকেই সাজাতে হবে। ...",
            "tags": [
                "tag1",
                "tag2"
            ],
            "author": {
                "_id": "6777cd02a35610db18ae569b",
                "role": "user",
                "name": "Tanvir Hossain Dihan",
                "email": "tanvirhossain20@iut-dhaka.edu",
                "password": "$2b$12$dQ/xRrHBIx8BRaG7NjZik.0UPDvHoE..3JVzH0z7NTld7Xl2s.rTy",
                "__v": 0
            },,
            "createdAt": "2025-01-03T14:30:36.731Z",
            "updatedAt": "2025-01-03T14:31:56.366Z",
            "__v": 0,
            "generatedContent": "পরিবর্তনে আপনাকেই অংশ নিতে হবে, আপনার পরিবর্তনের দায়িত্ব কেউ হাতে তুলে নেবে না। অন্যের সময় কখনো এমনটা করার নয়। স্বপ্ন আপনাকেই সাজাতে হবে। ..."
        },
        {
            "_id": "6777f58a3b068405e41d88b7",
            "title": "নিজের পরিবর্তন",
            "originalContent": "পরিবর্তনে আপনাকেই অন্তর হতে হবে, আপনার পরিবর্তনের দায়িত্ব কেউ হাতে তুলে নেবে না। অন্যের সময় কখনো এমনটা করার? স্বপ্ন আপনাকেই সাজাতে হবে। ...",
            "tags": [
                "tag1",
                "tag2"
            ],
            "author": {
                "_id": "6777cd02a35610db18ae569b",
                "role": "user",
                "name": "Tanvir Hossain Dihan",
                "email": "tanvirhossain20@iut-dhaka.edu",
                "password": "$2b$12$dQ/xRrHBIx8BRaG7NjZik.0UPDvHoE..3JVzH0z7NTld7Xl2s.rTy",
                "__v": 0
            },
            "createdAt": "2025-01-03T14:34:50.605Z",
            "updatedAt": "2025-01-03T14:35:15.928Z",
            "__v": 0,
            "generatedContent": "পরিবর্তনে আপনাকেই অন্তর হতে হবে, আপনার পরিবর্তনের দায়িত্ব কেউ হাতে তুলে নেবে না। অন্যের সময় কখনো এমনটা করার? স্বপ্ন আপনাকেই সাজাতে হবে। ..."
        },

    ]
}
```

-   `/chat`

```
// body
{
    "message" : "কেন নিজের স্বপ্ন নিজেকেই সাজাতে হবে?"
}
```

```
// Response
{
    "success": true,
    "statusCode": 200,
    "message": "Chat reply generated successfully",
    "data": "আমাদের স্বপ্ন কেবল এবং কেবল আমাদেরই। স্বপ্ন কেউ আর সাজায় না। তাই সেগুলো সাজানোর দায়িত্ব আমাদেরই নিতে হবে। আমাদের ভালো রাখা, মনের খারাপের ভার বহন, ব্যর্থতার রাত কাটিয়ে সকালের আলো দেখা, নিজের মূল্য বোঝানো এসবের দায়িত্ব আমাদেরই। কেউ এগিয়ে এসে তা করবে না।"
}
```

-   `/improvement/create`

```
// body
{
    "banglaContent": "একদিন এক গ্রামে ছিল দুই বন্ধু, নাম তাদের রাজু ও সুমন। রাজু ছিল খুবই মেধাবী, আর সুমন ছিল তার থেকে একটু পিছিয়ে। তবে সুমন তার বন্ধুর কাছ থেকে অনেক কিছু শিখতো। একদিন রাজু তার বন্ধু সুমনকে বলে, দেখ, আমি তো আজকাল অনেক পড়াশোনা করি, কিন্তু তুমি কিছুই শেখো না। সুমন হেসে বলে, আমি কিছু না শিখলেও তুমি তো আমার কাছ থেকে জীবনের আসল পথ শেখতে পারো। রাজু সুমনের কথা শুনে একটু থেমে দাঁড়াল। তখন সুমন তার বন্ধু রাজুকে বলে।জীবন সব সময় বইয়ের মধ্যে পাওয়া যায় না, কখনো কখনো তা বাস্তবতা থেকেই শেখা হয়। এই কথা শুনে রাজু অনেক কিছু ভাবে, এবং সেদিন থেকে সে আরো বাস্তব জ্ঞান লাভের জন্য কাজ করতে লাগল। সে বুঝতে পারল, সঠিকভাবে শিক্ষা সব সময় বইয়ের মধ্যে থাকে না, বরং অভিজ্ঞতা থেকেও অনেক কিছু শেখা যায়।",
    "originalContent": "Ekdin ek grame chhilo dui bondhu, naam tader Raju o Suman. Raju chhilo khubhi medhabi, ebong Suman chhilo tar theke ekto pichiye. Tobe Suman tar bondhur kach theke onek kichu shikhoto. Ekdin Raju tar bondhu Suman ke boll, Dekh, ami to aajkal onek porashona kori, kintu tumi kichui shekho na. Suman hese boll, Ami kichu na shekho na holeo tumi to amar kach theke jibon er ashol path shekhte paro. Raju Suman er kotha shune ektu thomke daral. Tokhon Suman tar bondhu Rajuke boll.Jibon shob shomoy boi er modhye pawa jay na, kokhono kokhono ta bastabota thekei shikhte hoy. Ei kotha shune Raju onek kichu bhabl, ebong sei din theke se aro bastob gyan labher jonno kaj korte laglo. Se bujhte parlo, shothikcare shikkha shob shomoy boi er modhye thake na, barong obhiggota theke o onek kichu shekha jay.",
    "author": "6777cd02a35610db18ae569b"
}
```

```
// Response
{
    "success": true,
    "statusCode": 201,
    "message": "Improvement created successfully",
    "data": {
        "originalContent": "Ekdin ek grame chhilo dui bondhu, naam tader Raju o Suman. Raju chhilo khubhi medhabi, ebong Suman chhilo tar theke ekto pichiye. Tobe Suman tar bondhur kach theke onek kichu shikhoto. Ekdin Raju tar bondhu Suman ke boll, Dekh, ami to aajkal onek porashona kori, kintu tumi kichui shekho na. Suman hese boll, Ami kichu na shekho na holeo tumi to amar kach theke jibon er ashol path shekhte paro. Raju Suman er kotha shune ektu thomke daral. Tokhon Suman tar bondhu Rajuke boll.Jibon shob shomoy boi er modhye pawa jay na, kokhono kokhono ta bastabota thekei shikhte hoy. Ei kotha shune Raju onek kichu bhabl, ebong sei din theke se aro bastob gyan labher jonno kaj korte laglo. Se bujhte parlo, shothikcare shikkha shob shomoy boi er modhye thake na, barong obhiggota theke o onek kichu shekha jay.",
        "banglaContent": "একদিন এক গ্রামে ছিল দুই বন্ধু, নাম তাদের রাজু ও সুমন। রাজু ছিল খুবই মেধাবী, আর সুমন ছিল তার থেকে একটু পিছিয়ে। তবে সুমন তার বন্ধুর কাছ থেকে অনেক কিছু শিখতো। একদিন রাজু তার বন্ধু সুমনকে বলে, দেখ, আমি তো আজকাল অনেক পড়াশোনা করি, কিন্তু তুমি কিছুই শেখো না। সুমন হেসে বলে, আমি কিছু না শিখলেও তুমি তো আমার কাছ থেকে জীবনের আসল পথ শেখতে পারো। রাজু সুমনের কথা শুনে একটু থেমে দাঁড়াল। তখন সুমন তার বন্ধু রাজুকে বলে।জীবন সব সময় বইয়ের মধ্যে পাওয়া যায় না, কখনো কখনো তা বাস্তবতা থেকেই শেখা হয়। এই কথা শুনে রাজু অনেক কিছু ভাবে, এবং সেদিন থেকে সে আরো বাস্তব জ্ঞান লাভের জন্য কাজ করতে লাগল। সে বুঝতে পারল, সঠিকভাবে শিক্ষা সব সময় বইয়ের মধ্যে থাকে না, বরং অভিজ্ঞতা থেকেও অনেক কিছু শেখা যায়।",
        "author": "6777cd02a35610db18ae569b",
        "status": "pending",
        "_id": "67782d59029c1641457468a4",
        "createdAt": "2025-01-03T18:32:57.295Z",
        "updatedAt": "2025-01-03T18:32:57.295Z",
        "__v": 0
    }
}
```

-   `/improvement/getAll`

```
{
    "success": true,
    "statusCode": 200,
    "message": "Get all improvements successfully",
    "data": [
        {
            "_id": "67782d59029c1641457468a4",
            "originalContent": "Ekdin ek grame chhilo dui bondhu, naam tader Raju o Suman. Raju chhilo khubhi medhabi, ebong Suman chhilo tar theke ekto pichiye. Tobe Suman tar bondhur kach theke onek kichu shikhoto. Ekdin Raju tar bondhu Suman ke boll, Dekh, ami to aajkal onek porashona kori, kintu tumi kichui shekho na. Suman hese boll, Ami kichu na shekho na holeo tumi to amar kach theke jibon er ashol path shekhte paro. Raju Suman er kotha shune ektu thomke daral. Tokhon Suman tar bondhu Rajuke boll.Jibon shob shomoy boi er modhye pawa jay na, kokhono kokhono ta bastabota thekei shikhte hoy. Ei kotha shune Raju onek kichu bhabl, ebong sei din theke se aro bastob gyan labher jonno kaj korte laglo. Se bujhte parlo, shothikcare shikkha shob shomoy boi er modhye thake na, barong obhiggota theke o onek kichu shekha jay.",
            "banglaContent": "একদিন এক গ্রামে ছিল দুই বন্ধু, নাম তাদের রাজু ও সুমন। রাজু ছিল খুবই মেধাবী, আর সুমন ছিল তার থেকে একটু পিছিয়ে। তবে সুমন তার বন্ধুর কাছ থেকে অনেক কিছু শিখতো। একদিন রাজু তার বন্ধু সুমনকে বলে, দেখ, আমি তো আজকাল অনেক পড়াশোনা করি, কিন্তু তুমি কিছুই শেখো না। সুমন হেসে বলে, আমি কিছু না শিখলেও তুমি তো আমার কাছ থেকে জীবনের আসল পথ শেখতে পারো। রাজু সুমনের কথা শুনে একটু থেমে দাঁড়াল। তখন সুমন তার বন্ধু রাজুকে বলে।জীবন সব সময় বইয়ের মধ্যে পাওয়া যায় না, কখনো কখনো তা বাস্তবতা থেকেই শেখা হয়। এই কথা শুনে রাজু অনেক কিছু ভাবে, এবং সেদিন থেকে সে আরো বাস্তব জ্ঞান লাভের জন্য কাজ করতে লাগল। সে বুঝতে পারল, সঠিকভাবে শিক্ষা সব সময় বইয়ের মধ্যে থাকে না, বরং অভিজ্ঞতা থেকেও অনেক কিছু শেখা যায়।",
            "author": "6777cd02a35610db18ae569b",
            "status": "pending",
            "createdAt": "2025-01-03T18:32:57.295Z",
            "updatedAt": "2025-01-03T18:32:57.295Z",
            "__v": 0
        }
    ]
}
```

-   `/improvement/<postid>`

```
{
    "banglaContent": "একদিন এক গ্রামে ছিল দুই বন্ধু, নাম তাদের রাজু ও সুমন। রাজু ছিল খুবই মেধাবী, আর সুমন ছিল তার থেকে একটু পিছিয়ে। তবে সুমন তার বন্ধুর কাছ থেকে অনেক কিছু শিখতো। একদিন রাজু তার বন্ধু সুমনকে বলে, দেখ, আমি তো আজকাল অনেক পড়াশোনা করি, কিন্তু তুমি কিছুই শেখো না। সুমন হেসে বলে, আমি কিছু না শিখলেও তুমি তো আমার কাছ থেকে জীবনের আসল পথ শেখতে পারো। রাজু সুমনের কথা শুনে একটু থেমে দাঁড়াল। তখন সুমন তার বন্ধু রাজুকে বলে।জীবন সব সময় বইয়ের মধ্যে পাওয়া যায় না, কখনো কখনো তা বাস্তবতা থেকেই শেখা হয়। এই কথা শুনে রাজু অনেক কিছু ভাবে, এবং সেদিন থেকে সে আরো বাস্তব জ্ঞান লাভের জন্য কাজ করতে লাগল। সে বুঝতে পারল, সঠিকভাবে শিক্ষা সব সময় বইয়ের মধ্যে থাকে না, বরং অভিজ্ঞতা থেকেও অনেক কিছু শেখা যায়।",
    "originalContent": "Ekdin ek grame chhilo dui bondhu, naam tader Raju o Suman. Raju chhilo khubhi medhabi, ebong Suman chhilo tar theke ekto pichiye. Tobe Suman tar bondhur kach theke onek kichu shikhoto. Ekdin Raju tar bondhu Suman ke boll, Dekh, ami to aajkal onek porashona kori, kintu tumi kichui shekho na. Suman hese boll, Ami kichu na shekho na holeo tumi to amar kach theke jibon er ashol path shekhte paro. Raju Suman er kotha shune ektu thomke daral. Tokhon Suman tar bondhu Rajuke boll.Jibon shob shomoy boi er modhye pawa jay na, kokhono kokhono ta bastabota thekei shikhte hoy. Ei kotha shune Raju onek kichu bhabl, ebong sei din theke se aro bastob gyan labher jonno kaj korte laglo. Se bujhte parlo, shothikcare shikkha shob shomoy boi er modhye thake na, barong obhiggota theke o onek kichu shekha jay.",
    "author": "6777cd02a35610db18ae569b",
    "status" : "approved"
}
```

```
{
    "success": true,
    "statusCode": 200,
    "message": "Improvement updated successfully",
    "data": {
        "_id": "67782d59029c1641457468a4",
        "originalContent": "Ekdin ek grame chhilo dui bondhu, naam tader Raju o Suman. Raju chhilo khubhi medhabi, ebong Suman chhilo tar theke ekto pichiye. Tobe Suman tar bondhur kach theke onek kichu shikhoto. Ekdin Raju tar bondhu Suman ke boll, Dekh, ami to aajkal onek porashona kori, kintu tumi kichui shekho na. Suman hese boll, Ami kichu na shekho na holeo tumi to amar kach theke jibon er ashol path shekhte paro. Raju Suman er kotha shune ektu thomke daral. Tokhon Suman tar bondhu Rajuke boll.Jibon shob shomoy boi er modhye pawa jay na, kokhono kokhono ta bastabota thekei shikhte hoy. Ei kotha shune Raju onek kichu bhabl, ebong sei din theke se aro bastob gyan labher jonno kaj korte laglo. Se bujhte parlo, shothikcare shikkha shob shomoy boi er modhye thake na, barong obhiggota theke o onek kichu shekha jay.",
        "banglaContent": "একদিন এক গ্রামে ছিল দুই বন্ধু, নাম তাদের রাজু ও সুমন। রাজু ছিল খুবই মেধাবী, আর সুমন ছিল তার থেকে একটু পিছিয়ে। তবে সুমন তার বন্ধুর কাছ থেকে অনেক কিছু শিখতো। একদিন রাজু তার বন্ধু সুমনকে বলে, দেখ, আমি তো আজকাল অনেক পড়াশোনা করি, কিন্তু তুমি কিছুই শেখো না। সুমন হেসে বলে, আমি কিছু না শিখলেও তুমি তো আমার কাছ থেকে জীবনের আসল পথ শেখতে পারো। রাজু সুমনের কথা শুনে একটু থেমে দাঁড়াল। তখন সুমন তার বন্ধু রাজুকে বলে।জীবন সব সময় বইয়ের মধ্যে পাওয়া যায় না, কখনো কখনো তা বাস্তবতা থেকেই শেখা হয়। এই কথা শুনে রাজু অনেক কিছু ভাবে, এবং সেদিন থেকে সে আরো বাস্তব জ্ঞান লাভের জন্য কাজ করতে লাগল। সে বুঝতে পারল, সঠিকভাবে শিক্ষা সব সময় বইয়ের মধ্যে থাকে না, বরং অভিজ্ঞতা থেকেও অনেক কিছু শেখা যায়।",
        "author": "6777cd02a35610db18ae569b",
        "status": "approved",
        "createdAt": "2025-01-03T18:32:57.295Z",
        "updatedAt": "2025-01-03T18:40:16.319Z",
        "__v": 0
    }
}
```
