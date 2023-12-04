# PantryChef

## 1. BRIEF INTRO 📖

PantryChef is a Blog-type Web Application that consumes external APIs to fetch recipes for our users. It also features an **OpenAI-powered system** for automatically generating new custom-tailored recipes for each individual user based on the entries of items in a list. This Web App uses the **Vue.js** library for frontend development, an **Express.js**-based backend, and a **NoSQL Database**—more precisely, **MongoDB**. Thus, this app operates in a full **MEVN** environment.

## 2. ABOUT THE WEB APP 🕸

While studying at **General Assembly**, for my second unit, I had been given a project to deliver within one week. It was a solo project and had the following requirements:

- **CRUD FUNCTIONAL**
- **Vue.js framework for frontend development**
- **Node.js and Express for backend development**
- **MongoDB database**
- **Consume at least one API**
- **GoogleAuth for login and route protection**

All of these requirements have been met as they follow:
- Admin can **Create, Read, Update and Delete** blog posts
- **Vue.js** and **Express** were used in the development of the app
- **MongoDB database** was linked to PantryChef
- PantryChef consumes 2 different APIs: **OpenAI API** for recipe generating and an external API that fetches data for **Random Recipes**
- In order to gain access to all of the website's features, a user must be logged in which can be done by either using a Google account - **GoogleAuth** or even by registering with an username and a password - which they are then stored in the MongoDB database, password being encrypted by **Bcrypt** - and later on can be used as credentials for logging in

## 3. LOCAL DEVELOPMENT 🛠

- Clone this repo, as well as the [backend repo](https://github.com/msionut28/pantryChef_backend) and follow the steps below for both folders.
- Run `npm i` to get all of the dependencies locally installed.
- Update your `.env` file according to the `.env.example` so you can get the full experience.
- Run the development server using one of the following commands depending on the OS used:
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

## 6. STRUCTURE AND BUILDING 🏗️

+ **Vue.js** - Frontend framework
+ **Vue.js devtools** - Debugging
+ **Express** - Backend development
+ **MongoDB** - NoSQL Database
+ **CSS and Bootstrap**
+ **Netlify** - Deployment
+ **Git/ GitHub** - Tracking changes and updating the code
+ **VS Code** - Writing Code
+ **Postman** - Testing API fetches and backend urls
+ **Excalidraw** - Wireframe

## 6. PLANING 🤔

## 7. CODING 💻

### LOGGING IN AND OUT

For logging in, I used the ```Vue3 Google Login``` package and ```Vuex Store``` to store the user's state, whether they are logged in or not, and to check if they are an admin or not. Inside my store.js, I created a new ```store``` with ```state, mutations, actions, and getters``` that grant access to the user. Inside auth.js, the following snippet can be found:

```
export const handleLogin =  async function (response, store, cookies) {
    store.dispatch('login')
    const userData = decodeCredential(response.credential)
    const timestamp = Date.now() 
    const currentTime = new Date(timestamp)
    const userName = userData.given_name
    cookies.set('user_session', response.credential)
    cookies.set(cookies.set('username', userData.given_name))
...
}
```
These lines are self-explanatory. When a user logs in using GoogleAuth, the function sets the state of being logged in to a true boolean. It then decodes the credentials that Google sends in, allowing data such as First/Last Name, email, and full name to be used. It then creates a timestamp used for storing additional data in the database and sets info inside the cookies.

```
export const handleLogin =  async function (response, store, cookies) {
    ...
    try{
        await fetch(`${backendApi}/useradd`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userName: userName,
                lastLogin: currentTime
            })
        })
        const userResponse = await fetch(`${backendApi}/users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const userData = await userResponse.json()
        const user = userData.find((user)=> user.userName === userName)
        if (user) {
            userId = user._id
            console.log(userId);
            const membership = parseInt(user.membership)
            if (membership === 0 || null){
                cookies.set('new_user', true)
                store.dispatch('modal')
            }else {
                return
            }
        }
        location.reload()
        
    }
    catch (error) {
        console.error(error)
    }
    ...
}
```

This bit of code sends the username and timestamp to the database, then checks if the user already exists. If so, it only updates the last login. It also checks if the user has chosen a membership, and if not, a text shows up on the navbar, popping up a modal on click where a user can choose their membership.

```
export const handleLogout = function (store, cookies, router) {
    googleLogout()
    cookies.remove('user_session')
    cookies.remove('admin_session')
    cookies.remove('username')
    store.dispatch('logout')
    router.push({path: '/'})
}
```

For logging out, I created this function that calls the ```googleLogout``` function from ```Vue3 Google Login```, removes the cookies, sets the state of being logged in to false, and redirects to the home page.

```
export async function userPassLogin(userName, password, store, cookies, router){
    try{
        const response = await fetch(`${backendApi}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userName: userName,
                password: password
            })
        })
        if(response.ok){
            const data = await response.json()
            if(data.isAdmin){
                store.dispatch('isAdmin')
                cookies.set('admin_session', data.token)
                cookies.set('username', data.userName)
                router.push({path: '/home'})
            }else  if (data.token){
                store.dispatch('login')
                cookies.set('userpass_session', data.token)
                cookies.set('username', data.userName)
                router.push({path: '/home'})
            } else{
                location.reload()
            }
        } else{
            alert('incorrect credentials!')
        }
    }catch(error){
        console.error(error)
    }
}
```
This function sends the credentials to the backend, then checks if the credentials match the data stored in the database. If that's the case, it checks if the user is an admin or not and sets the appropriate states for each scenario.

### RANDOM RECIPE PAGE

```
export default {
  name: "RandomRecipe",
  data: () => ({
    error: "",
    recipe: {},
  }),
  ...
  mounted() {
    fetch(API_URL)
      .then((response) => response.json())
      .then((result) => {
        this.recipe = result.meals[0];
      });
  }
  ...
}
```

First, it fetches the data from the ```API_URL``` stored inside ```.env``` and sets it to the empty object declared inside the data. Once done, the method ```getIngredients``` is created.

```
export default {
  name: "RandomRecipe",
  ...
    methods: {
    getIngredients(recipe) {
      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        if (ingredient && measure) {
          ingredients.push(`${ingredient} - ${measure}`);
        } else {
          break;
        }
      }
      return ingredients;
    },
  },
  ...
}
```
It sets a limit of a maximum of 20 ingredients to avoid long lists. Some recipes in this API included common ingredients such as "salt," "pepper," "sunflower oil," and so on, and I found it unnecessary to list so many ingredients as a matter of styling.

The method is called inside the ```<template>``` of the page.

```
<template>
...
      <div class="recipe-body">
        <h4 class="section-title">Ingredients:</h4>
        <ul class="ingredient-list">
          <li
            v-for="(ingredient, index) in getIngredients(recipe)"
            :key="index"
          >
            {{ ingredient }}
          </li>
        </ul>
...
</template>
```

### RECIPE GENERATOR PAGE

```
export default {
  name: 'RecipeCreate',
  methods: {
    ...
    addRecipe: function () {
    this.loading = true
    fetch(`${backendApi}/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: this.title,
            ingredients: this.createdRecipe,
            userName: this.userName
        })
    })
    .then(res => {
      return res.json()
    })
    .then(data => {
    this.recipeId = data._id
    this.loading = false
    this.recipeGenerated = true
  })
  },
  ...
  }
  ...
}
```

This method gets all the ingredients that the user has typed in, then sends it to the backend where the actual **OpenAI API** integration takes place. As a response, it gets the generated response by **OpenAI**.

**TO BE FURTHER EDITED**

## 8. CHALLENGES 🧩

+ Personally, the biggest challenge for me was to integrate the **OpenAI API** into my project. It was already a lot of information for me to deal with as I was only 5 weeks into proper coding, and at that specific point, I felt like this was a really big challenge. Making the actual request to OpenAI was difficult as I had to understand the purpose of every single ```key & value``` sent in the object to OpenAI, and the documentation on their website was not too deep into details.

+ Another challenge that I faced was the integration of **Registration** and **Log In** by **Username** and **Password** as this was outside our course's curriculum. So, besides making sure I applied everything I had previously learned over the past 2 weeks of our second unit, I even went beyond the requirements and implemented this feature, which, personally, I think was a nice touch. I am way more comfortable now working and handling passwords and sensitive information.

+ Deployment was another challenge, as it was my first proper deploy. I have previously used GitHub for deploying my [Battleship Game](https://msionut28.github.io/Battleships-Project/), but this time was different as more complex techonology had to be used in order to make sure that the backend and frontend were properly handled. I have used **Netlify** in order to publish my website.

## 9. BUGS 🐛

+ One bug that I am currently aware of is that whenever a user is clicking the delete button to remove an already generated recipe, the modal with recipe's details pops up even though it shouldn't.

+ Sometimes, the **logged-in** state and ```membership === 0``` do not update accordingly. I had to use ```location.reload()``` to fix that, but as it is not good practice, I still consider it a bug.

+ CSS styling is not always working as intended on **Safari** browsers. At the time, I have no clue why this is happening, but I will definitely fix it.

## 10. FUTURE IMPROVEMENTS 🌱

+ Share button integration, allowing users to distribute their generated recipes with relatives and friends or even on social media.

+ Limiting the number of recipes a user can generate based on the membership.

+ User profile so the users can update their username, membership, email and password or even delete their accounts.

+ Newsletter subscription where a user can pick how often should it recieve an email from **PantryChef** with a random recipe: **Daily, Weekly or Monthly**.

+ Create recipes in different languages: The output language matches the one you use when typing in the ingredients.