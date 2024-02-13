
# __proxy__ : `http://localhost:5050`
# __SIGN UP__
# __API__ : `/api/v1/users/signup`
# Status Code for Sign Up
## Status Code : Message

### If Success :
`201` : `User Created !!!`
### Else

`400` : `All fields are required` 

`409` : `User with same username or email already existed`

`501` : `Failed to create user`

## Input Field's Name while Signup

`username` : for Username  __Required__

`password` : for Password  __Required__

`email` : for Email  __Required__

# __SIGN IN__

# __API__ : `/api/v1/users/signin`
# Status Code for Sign In
## Status Code : Message

### If Success :
`202` : `Login Successful`
### Else :
`401` : Invalid Credentials

`404` : User not existed

`400` : All fieilds are required

`401` : Invalid Credentials


## Input Field's Name while Signup


`usernameORemail` : for username or email

`password` : for password

# Authorization Tokens

`AccessToken` : for access token

`RefreshToken` : for refresh token

### ___Note___ : Save the access token and refresh token to local storage as `AccessToken` and `RefreshToken`


# __SIGN OUT__

# __API__ : `/api/v1/users/signout`
# Status Code for Sign Out
## Status Code : Message

### If Success :
`202` : Logout Successful
### Else :
`404` : Cookie not found

`401` : Invalid Token


## ___Note___ :
   ### while sending request to API send `AccessToken` as `Authorization` via `headers` from `localStorage`
   eg:

`const res = await axios.post("/api/v1/users/signout",  data , { headers:{Authorization:localStorage.getItem("AccessToken")}} )`







