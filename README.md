## PantryChef

PantryChef is a Blog type Web Application that consumes exeternal APIs in order to fetch recipes for our users, as well as an OpenAI powered system of automatically generating new custom-tailored recipes for each individual user based on the entries of items in a list. This Web App uses Vue.js library for frontend development, an Express.js based backend and a NoSQL database - more precisely, MongoDB. Thus, this app uses a full MEVN environment.

## LOCAL DEVELOPMENT

1. Clone this repo, as well as the [https://github.com/msionut28/pantryChef_backend](backend repo) and follow the steps below for both folders.
2. Run a ``` npm i ``` in order to get all of the dependencies locally installed.
3. Update your ```.env``` file according to the ```.env.example``` so you can get the full experience.
4. Run the development server using one of the following commands depending on the OS used:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
5. Open [http://localhost:8080](http://localhost:8080) with your browser to see the result.