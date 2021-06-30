# Wize

This is the official repository of [thewize.in](https://thewize.in)

---

# Requirements

## Node & NPM

The App is completly written in JavaScript so, You should have nodejs installed. if you don't have node you can install from [here](https://nodejs.org/en/)

to check node installed correctly enter following command in CMD or Terminal.

```
node --version
```

similary for NPM

```
npm --version
```

if goes right you can see version of node and npm.

## MongoDB (Database)

This application store data in MongoDB database.

Install from [Here](https://www.mongodb.com/try/download/community)

## Reddis (In Memory Database i.e Cache)

To enhance performance we used Reddis for Caching.

Install from [Here](https://redis.io/download)

(Install stable version)

---

# Setup

## Clone Repo

open CMD or Terminal and Enter following command.

```
git clone https://github.com/thewize-in/wize.git
```

## Go To Project Directory

As you open project folder you will see that this project is divided into two folders **frontend** and **backend**

## Install Dependencies

Since application is written in node means there must be dependencies and our project is divided into frontend and backend so we would need to install there dependencies seperatly.

**Install frontend dependencies**

_i assume your are in project's root directory_

Enter the following in CMD or Terminal

change directory

```
cd frontend
```

then

```
npm install
```

**Install backend dependencies**

_i assume your are in project's root directory_

Enter the following in CMD or Terminal

change directory

```
cd backend
```

then

```
npm install
```

we have install all our dependencies now we are ready to rock and roll.

## Build And Run Application

Our frontend and backend is written in vuejs and typescript it need to be build before run.

_I assume you are in **frontend** directory_

**Build frontend**

```
npm build
```

**Build backend**

_I assume you are in **backend** directory_

```
npm build
```

**Run**

_I assume you are in **backend** directory_

```
nodemon src/index.ts
```

if everything goes smooth you can see application running on [http://localhost:3000](http://localhost:3000)

---

# Note

There is one `.env` file that we need to create in root directory which store all our credentials like google client id, database url etc and is must required. otherwise app won't start.

since this is sensitive data so we don't share that file on github. it stay in our local environment.
