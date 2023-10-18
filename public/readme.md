# KV Resident API endpoint
This api endpoint handles all the interactions between the frontend and the database.
- It also gives security to the the user data

## Security
For login we use email and password, I'll implement logging in with username

After logging in, a user receives an access key. This is the key that will be used whenever auth is needed.

### Auth
Alongside the access key comes the account id which is also used to make sure that the access key belongs to the specified user

The auth data is kept in the request header, so whether it is a get request or any other type of request that needs auth, this is how you would do it in JavaScript

We will be using the variable **`myHeaders`** throughout the project so here is it's definition
```js
var myHeaders = new Headers();
myHeaders.append("user", "63ec6fb40f74a1be9ed87a2e"); // account's id
myHeaders.append("key", "2w361f5n5m2p5s411a27446s2q2i725r"); // account's access key
```

This is how to use it

```js
var myHeaders = new Headers();
myHeaders.append("user", "63ec6fb40f74a1be9ed87a2e");
myHeaders.append("key", "2w361f5n5m2p5s411a27446s2q2i725r");

var requestOptions = {
  method: '--specify request method--',
  headers: myHeaders,
  redirect: 'follow'
};
// in the fetch request

fetch("yourApiEndpoint.com/specificRoute/", requestOptions)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

**Note**
- In the code example above, the first three lines are what's important
- Beyond the three lines, it's just an illustration of how you would use the important part
- `user` in `myHeaders` is the account id `_id`
- `key` in `myHeaders` is th account access key `accessKey`
- When you login successfully you get `_id` and `accessKey` from the response. Keep that somewhere for the auth

## Models

### Accounts
```js
// example account object
let user = {
        _id: "63eb8a50487a0d9e4365960c",
        name: "Lucy",
        userName: "lucy_mj",
        email: "lucy@email.com",
        phone: "+23344243890",
        accessKey: "2rm2v1l486y4f13264g4t3x3x26e3p34",
        gender: "female",
        password: "$2b$10$z8bMZut/RPDaHDcJOioVse9XM9ZwFq9tYq4IB7BgKp302f4dqJnbG",
        followers: [],
        followed: [],
        loginInfo: [],
        createdAt: "2023-02-14T13:19:12.117Z",
        updatedAt: "2023-02-14T13:19:12.117Z",
        __v: 0
    }
```
#### Creating account
Post request url --> `/account/create`

Required in the post request
- name
- email
- password
- phone
- gender

Accessing account information
fetch request in javascript
```js
// myHeaders has the auth info see the first topic - security > auth


var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};
// the url variable is the url link to the api endpoint, replace 'location.origin' with the api endpoint url like http://locahost:4000
let url = location.origin + '/account/id/'+ account._id;
fetch(url, requestOptions)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```


To access public information of an account the link is `/account/public/` + ` foreignUser._id`, *its a get request*


### Login info

```js
// example login info
let login = {
    _id: "63ec7030b270aaf686b6ff26",
    deviceName: "HP EliteBook 840 G3",
    deviceType: "laptop",
    os: "Microsoft windows 11",
    deviceDescription: "none",
    loginDescription: "attempted to login from postman app",
    startTime: "2023-02-15T05:40:00.000Z",
    endTime: null,
    authType: "password",
    appType: "postman desktop app",
    accountId: "63ec6fb40f74a1be9ed87a2e"
}
```
*If* `endTime` *is not null, then login session has expired*

to create a login

```js
var formData = new FormData();
formData.append("deviceName", "HP EliteBook 840 G3");
formData.append("deviceDescription", "none");
formData.append("loginDescription", "attempted to login from postman app");
formData.append("deviceType", "laptop");
formData.append("os", "Microsoft windows 11");
formData.append("authType", "password");
formData.append("appType", "postman desktop app");
formData.append("email", "examplemail@email.com1");
formData.append("password", "strong_pwd");

var requestOptions = {
  method: 'POST',
  body: formData,
  redirect: 'follow'
};

fetch("localhost:6423/account/login", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

Activities during login
1. password check
2. Login creation attempt 
3. on successful Login creation , the login id is added to the account login info
4. successful login message is sent to the user

#### Getting all your login info i.e all places you are currently logged in

```js
// myHeaders has the auth info see the first topic - security > auth



var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("localhost:6423/account/login/63ec6fb40f74a1be9ed87a2e", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

#### Logout
**Requirements**
1. Auth -> accountId & accessKey
2. Login id
3. account id
```js
// myHeaders is defined in the auth section

var formdata = new FormData();
formdata.append("loginId", "63ec6fe70f74a1be9ed87a31");
formdata.append("accountId", "63ec6fb40f74a1be9ed87a2e");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch("localhost:6423/account/logout", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```
### Profile and cover images

#### updating profile picture
request type `POST`
link `/account/image-upload/profile-picture`
request body 
```js
{
    accountId: {type: String},
    accessKey: {type: String},
    coverPicture: {type: File, accept:['png', 'jpg'], aspectRatio: 1}
}
```

### updating cover picture

- request type `POST`
- link `/account/image-upload/cover-picture`
- example code
- authentication `key` from `account.accessKey`
```js
// myHeaders has the auth info see the first topic - security > auth


var formdata = new FormData();
formdata.append("accountId", "63ec6fb40f74a1be9ed87a2e");
formdata.append("coverPicture", fileInput.files[0], "/C:/Users/hp/Pictures/Screenshot 2022-11-29 132034.png");
formdata.append("accessKey", "2w361f5n5m2p5s411a27446s2q2i725r");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch("localhost:6423/account/image-upload/cover-picture", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```


## Posts

### Creating a post
#### Requirements
**Request Body**
- account id `accountId`
- description/content (text) `description`
- images, (1 to 4 images as files) `images`
**Request Headers**
- Auth key `key`, which is the accessKey of an account


example code in js
```js
// myHeaders has the auth info see the first topic - security > auth


var formdata = new FormData();
formdata.append("accountId", "accountIdHere");
formdata.append("description", "a less than 300 word description of your post");
formdata.append("images", fileInput.files[0], "/directory/to/your/image.png");
formdata.append("images", fileInput.files[0], "/directory/to/your/second/image.jpg");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch("localhost:6423/post/", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

### Updating a post / editing a post
* A user can only edit his/her own post hence the need for auth
#### Requirements
**Request Body**
- account id `accountId`
- description/content (text) `description`

**Request Headers**
- Auth key `key`, which is the `accessKey` of an account

**Request method**
- `PATCH`

example code in js

```js
// myHeaders has the auth info see the first topic - security > auth


var formdata = new FormData();
formdata.append("description", "This works well ! Too well In fact");
formdata.append("createdBy", "63ec6fb40f74a1be9ed87a2e");

var requestOptions = {
  method: 'PATCH',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch("localhost:6423/post/63ee16a9b63a39c9ad499419", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```
### Deleting posts
**Requirements**
- post id
- auth data (`accountId` and `accessKey`)

example code in JS

```js
// myHeaders has the auth info see the first topic - security > auth


var formdata = new FormData();
formdata.append("id", "63ef7f060923aa2449ccbc67");

var requestOptions = {
  method: 'DELETE',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch("localhost:6423/post/", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

### Getting posts
#### Getting by id
- link is `/post/--post--id--here--`
- request method is `GET`
- no auth required


### Like and unlike a post

**Requirements**
- The account to like a post
- the post to be liked

**Events**
- The post is checked for whether the post has been liked by the given account or not
- If the account has already liked the post, the post is removed from the account's list of liked posts while also removing the account from the post's list of its likes
- If the account has not liked the post,  the account is added to the post's list of likers and also the post is added to the account's list of liked posts


example javascript code implementation
```js
var formdata = new FormData();
formdata.append("accountId", "63eb1d501644a2733089065");
formdata.append("post", "63ef7ec39189802123a1a45d");

var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};

fetch("localhost:6423/post/like", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

### View Post
The idea behind viewing a post is that when a post appears in a user's screen for some time it is considered viewed
- Every time a post appears on a user's screen it is considered a new view, whether it is recommended, shared or searched
- The views of a post can not reduce
- we could also call it post reach

* To add a view to a post, you send a simple post request to the server containing the post id and the account's auth data to avoid the exploitation of the functionality

this is how you would do it in javascript
```js
// myHeaders has the auth info see the first topic - security > auth


var formdata = new FormData();
formdata.append("post", "63ef7ec39189802123a1a45d");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch("localhost:6423/post/view", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

### Share a post

You can share a post as a quoted post or just a shared post

requirements
- auth
- account id, id of the account sharing the post
- if it is a quoted post put all the entries required for a normal post check out the requirements of a post

steps
- prepare the auth info
- if it is not a quoted post, specify `pass` to be `true` so that the post creation step is skipped
- Send them using a `POST` request

example in JavaScript
```js
// myHeaders has the auth info see the first topic - security > auth

var formdata = new FormData();
formdata.append("accountId", "63ec6fb40f74a1be9ed87a2e");
formdata.append("postId", "63ef1f2ff7bf5b8b1f56c603");
formdata.append("description", "I am happy for you too");
formdata.append("images", fileInput.files[0], "/directory/to/your/image.jpg");
formdata.append("pass", "true");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch("localhost:6423/post/share", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

### Deleting or canceling a share

Requirements 
- auth

```js
var myHeaders = new Headers();
myHeaders.append("user", "63ec6fb40f74a1be9ed87a2e");
myHeaders.append("key", "2w361f5n5m2p5s411a27446s2q2i725r");

var formdata = new FormData();
formdata.append("shareId", "63f0bfc822374d11535acc81");

var requestOptions = {
  method: 'DELETE',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch("localhost:6423/post/share", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

## Comments

A comment is an extension of a post
It is also a post in its core

### Creating a comment

requirements
- auth
- creator
- original post

```js
// you know where to get auth data

var formdata = new FormData();
formdata.append("accountId", "63ec6fb40f74a1be9ed87a2e");
formdata.append("description", "I like this");
formdata.append("postId", "63f0b035cc9e5e3f32dd60e2");
formdata.append("type", "comment");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch("localhost:6423/post/comment", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

```

### Deleting a comment

requirements
- auth
- comment

```js
var formdata = new FormData();
formdata.append("id", "63f1e2c1356d2ac0dc47299c");

var requestOptions = {
  method: 'DELETE',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch("localhost:6423/post/comment", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```