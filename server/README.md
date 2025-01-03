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
