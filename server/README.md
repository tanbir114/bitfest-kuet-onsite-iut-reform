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
