# PantryChef

## 1. BRIEF INTRO 📖

PantryChef is a Blog type Web Application that consumes exeternal APIs in order to fetch recipes for our users, as well as an **OpenAI powered system** of automatically generating new custom-tailored recipes for each individual user based on the entries of items in a list. This Web App uses **Vue.js** library for frontend development, an **Express.js** based backend and a **NoSQL Database** - more precisely, **MongoDB**. Thus, this app uses a full **MEVN** environment.

## 2. ABOUT THE WEB APP 🕸
While studying at **GeneralAssembly**, for my second unit I had been given a project to deliver within one week. It was a solo project and had the following requirements:

+ **CRUD FUNCTIONAL**
+ **Vue.js framework for frontend development**
+ **Node.js and Express for backend development**
+ **MongoDB database**
+ **Consume at least one API**
+ **GoogleAuth for login and route protection**

All of these requirements have been met as they follow:
+ Admin can **Create, Read, Update and Delete** blog posts
+ **Vue.js** and **Express** were used in the development of the app
+ **MongoDB database** was linked to PantryChef
+ PantryChef consumes 2 different APIs: **OpenAI API** for recipe generating and an external API that fetches data for **Random Recipes**
+ In order to gain access to all of the website's features, a user must be logged in which can be done by either using a Google account - **GoogleAuth** or even by registering with an username and a password - which they are then stored in the MongoDB database, password being encrypted by **Bcrypt** - and later on can be used as credentials for logging in

## 3. LOCAL DEVELOPMENT 🛠

+ Clone this repo, as well as the [backend repo](https://github.com/msionut28/pantryChef_backend) and follow the steps below for both folders.
+ Run a ``` npm i ``` in order to get all of the dependencies locally installed.
+ Update your ```.env``` file according to the ```.env.example``` so you can get the full experience.
+ Run the development server using one of the following commands depending on the OS used:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
+ Open [http://localhost:8080](http://localhost:8080) with your browser to see the result.
## 4. DEPLOYMENT 🚀

The deployed v1.0 of the website can be accessed [here](https://pantrychef-ga.netlify.app).
It is currently up to date with the repository found on GitHub

## 5. SCREENSHOTS AND GIFS 📸

### HOME PAGE
![Website Gif Presentation](/src/assets/github/homepage.png)

### LOGIN PAGE
![Website Gif Presentation](/src/assets/github/login.png)

### RECIPE GENERATOR PAGE
![Website Gif Presentation](/src/assets/github/recipegenerator.png)

### GENERATED RECIPES PAGE
![Website Gif Presentation](/src/assets/github/pastrecipe.png)

### RANDOM RECIPE PAGE
![Website Gif Presentation](/src/assets/github/randomrecipe.png)

### POST CREATOR PAGE - ADMIN ONLY
![Website Gif Presentation](/src/assets/github/createpost.png)

### POST EDITOR PAGE - ADMIN ONLY
![Website Gif Presentation](/src/assets/github/editpost.png)

### GIF PRESENTATION OF THE WEBSITE'S FEATURES
![Website Gif Presentation](/src/assets/github/pantrygif.gif)

