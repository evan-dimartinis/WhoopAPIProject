# WhoopAPIProject

This project is in it's infancy for now. The main idea is to create a dashboard for myself to keep track of my habits and hold myself accountable. There are plenty of issues that I am keeping track of so I can get the main functionalities out the way first. This includes the file structure of the server, as well as security concerns with the server and OAuth2 Integration with whoop.

The main sections of the app, as separated through the react components are:
<li>Everydays (things you would like to do every day such as exercise, read, etc...)</li>
<li>To do list for the day (also an identical component to add things for tomorrow)</li>
<li>Daily entry - This is to keep track of your daily habits and what factors may be related to one another</li>
<li>Whoop scores - Described in more detail below</li>
<li>Goals - long term reminders of future goals</li>
<li>Journal entry - like a personal journal to make brief notes about the day - keep track of important events perhaps</li>

<h1>General Structure</h1>
<li>The front end of this application uses React including React Redux to communicate to the locally run server.

<li>This is my first experience with Express.js, which I have created the server with. The top to-do item here is to configure the routing and file paths soon.

<li>Database is also locally hosted with Postgres

<h1>Whoop Integration</h1>
Currently the Whoop OAuth2 integration is happening through the backend in a very makeshift process that will allow me to get a new refresh token for my user if need be. This will of course have to be improved in the future.

Upon initial app authorization, the application will test the present validity of the user's token and throw an error if a new token needs to be obtained from the user's Whoop account.

I am now collecting only 3 datapoints from whoop, which upon posting of the user's daily entry are stored in the database with that day's data.
<li>Recovery
<li>Strain
<li>Time Asleep

As the project progresses I'm really looking forward to using more of Whoop's data collection to create a way to see relations in my behavior and habits.

<h1>Front End</h1>
Front end is a very simple single-page application that dynamically gets and renders user data from the database

  
<img width="1440" alt="Screen Shot 2022-12-22 at 4 04 56 PM" src="https://user-images.githubusercontent.com/60354368/209225791-ab496d89-5373-4a16-b04f-2ffb7576fe5d.png">
