# React Typescript Example

### Tech Stack

Frontend : React

Backend : Node.js(Express)

Database : MySQL

.

### Installation

Install node.js (through nvm/nodebrew )

Install mysql (through brew/apt-get if you are using Mac)

##### Set Up MySQL

```
mysql -u root
```

inside mysql

```
create user 'reacttypescript'@'localhost' IDENTIFIED BY 'reacttypescript';
grant all on reacttypescript.* to 'reacttypescript'@'localhost';

create database reacttypescript
```

##### set up App

clone this repository and

```
cd app
npm install

npm run dev
```

##### set up API

Open another terminal and

```
cd api
npm install

npm run start
```

Create an initial admin user

```
curl 'http://localhost:7071/api/user/create' -H 'Accept: application/json, text/plain, */*' -H 'Content-Type: application/json' --data-binary '{"username":"user","password":"user","email":"user@jp","admin":true,"owner":true}'
```

Open [http://localhost:7000](http://localhost:7000)

.
