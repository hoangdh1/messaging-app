# Messaging App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template, [Firebase](https://firebase.google.com/)  

The application is deployed on `Firebase` at: https://messaging-app-cfbb8.firebaseapp.com/

## Overview

- User can `login` with Facebook or Google account

![image](https://user-images.githubusercontent.com/66484333/130940383-9985d8db-d23d-4d65-9e79-367a23c4f927.png)



- If logging in for the first time, user need to provide information to `register`

![image](https://user-images.githubusercontent.com/66484333/130940728-ca81e16b-a6e4-435d-9a38-233e44d36903.png)


- After that, user go to `chat room` and can see a list of all **online users** and can select any of the ***available users*** to start a conversation🎉
  - ***Available users*** are users who are online and not in any conversation🎄
  - When chatting, if one of the two users closes the chat window, both will become *available*🎎
  - *Links and emojis* in chat messages can be automatically detected and properly formatted😀

![image](https://user-images.githubusercontent.com/66484333/130942552-8c927ce0-1532-4a9b-97cb-a5fb606f4ca8.png)


## Quick start

```
$ git clone https://github.com/hoangdh1/messaging-app.git
$ cd messaging-app
$ npm install
$ npm start
```

## Structure Database 

> Collection users


```
users
|__userId_1
|    |__id
|    |__nickname
|    |__birthday
|    |__gender
|    |__avatarUrl
|    |__isSignup
|    |__isOnline
|    |__chattingWith
|    |__createdAt
|
|__userId_2
     |__...
```


> Collection messages



```
messages
|__roomId_1
|    |__message
|        |__message_1
|            |__messageText
|            |__uidSender
|            |__createdAt
|
|__roomId_2
    |__...
```
with `roomId: `
```js
const roomId =
    uidCurrentUser < uidFriend
      ? uidCurrentUser + "-" + uidFriend
      : uidFriend + "-" + uidCurrentUser;
```







