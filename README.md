# Welcome to Little Strides- A Flask React Project
This is a platform for habit tracking and progress-sharing, inspired by an iOS app called Most Days. Users are encouraged to build positive routines, track habits, and post about their progress to connect with a supportive community. Whether you're looking to enhance your productivity, manage stress, or achieve personal goals, Little Strides is here to help you on your journey.

![Screen Shot 2024-01-10 at 6 32 53 PM](https://github.com/bergmazz/little-strides/assets/106289871/981c7f3f-cb7e-44fe-a1a6-e106dccbfd7c)

## Technology 
<div align="center">
  <img alt="Python" src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54">
  <img alt="Flask" src="https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white">
  <img alt="JavaScript" src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E">
  <img alt="React" src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB">
  <img alt="React Router" src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white">
  <img alt="Redux" src="https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white">
  <img alt="Postgres" src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white">
  <img alt="SQLite" src="https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white">
  <img alt="AWS" src="https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white">
  <img alt="Canva" src="https://img.shields.io/badge/Canva-%2300C4CC.svg?style=for-the-badge&logo=Canva&logoColor=white">
  <img alt="Figma" src="https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white">
  <img alt="MDN Web Docs" src="https://img.shields.io/badge/MDN_Web_Docs-black?style=for-the-badge&logo=mdnwebdocs&logoColor=white">
</div>
Python for back-end development. Flask framework used for building the backend. JavaScript for front-end development. React library for building the user interface. Redux for state management in the front-end. PostgreSQL database hosted on Render for production. SQLite database used for local development. Amazon Web Services for image storage. Canva and Figma for design. MDN for almost every kind of brain fart.

# Features
## Check In - a simple yes or no for every habit in your routine
![checkinlarger](https://github.com/bergmazz/little-strides/assets/106289871/f34cefb9-e253-46b5-a596-fee1945dd429)
## Routines and Habits - a multi-step form shared between the parent and child features
![Screen Shot 2024-01-10 at 9 47 25 PM](https://github.com/bergmazz/little-strides/assets/106289871/8a90df87-6515-4c7b-b848-20fd2350f01a)
## Progress - your biggest achievements and recent percentage of sucessfully completed habits
![Screen Shot 2024-01-10 at 9 44 42 PM](https://github.com/bergmazz/little-strides/assets/106289871/d832a453-14a2-44c1-8dae-022fe1e04ae6)
## Community - view posts and adopt other users' habits
![Screen Shot 2024-01-16 at 11 42 26 PM](https://github.com/bergmazz/little-strides/assets/106289871/2bcb55e3-f6d2-431b-a366-d0cbd76eb591)
![Screen Shot 2024-01-16 at 11 41 22 PM](https://github.com/bergmazz/little-strides/assets/106289871/5e40f71e-c906-43aa-9614-1346d356e752)

## Still In Progress
 - Mood Rating
   ![Screen Shot 2024-01-16 at 11 49 46 PM](https://github.com/bergmazz/little-strides/assets/106289871/dfb42c63-fd48-4cb6-884e-a3dadc7a5508)
 - Progress graph showing sucessful habit completion vs mood rating
   ![Screen Shot 2024-01-16 at 11 50 44 PM](https://github.com/bergmazz/little-strides/assets/106289871/8e62338c-4fa3-434b-979f-d03c3aed7b68)
 - Likes and comments on posts
   ![Screen Shot 2024-01-16 at 11 51 16 PM](https://github.com/bergmazz/little-strides/assets/106289871/85a4d171-8910-4e94-8cd8-f663b226e267)
 - More responsive design and CSS tweaks


## Run Locally or Check Out the [Live Site](https://little-strides.onrender.com/)
1. Clone this repository

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create an **.env** file based on the example (.env.example) with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, change to the `react-app` directory.
 ```bash
   npm install
 ```
 ```bash
   npm start
 ```
The project should then be accessible at http://localhost:3000 :) 

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.
