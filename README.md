# Simple CMS

## Quick start

```shell

# install the dependencies in backend
cd backend/
npm install

# now add .env file inside backend folder

# now, create core tables inside the database
npx drizzle-kit push:pg

# starting the backend server
npm run dev


# install the dependencies in frontend
cd ../frontend
npm install

# now add .env file inside frontend folder
# after this you need to add api url in .env file

# then, finally start the frontend
npm run dev


# now, visit the application on you browser
```
