# startup
### Startup Application for CS 260 Project (BYU)

-Notes taken for this project are stored [here](/Notes.md) <br> <br>


## Startup: Goal Setting Software for Collaborators (*Gollab*)

Welcome to my startup, *Gollab*! This software stands as an oppurtunity for professionals of all industries to set, maintain and track goals related to productivity. Gollab offers the ability to both set personal goals and collaborate with friends on shared goals- this way professionals can check in on each other and work to lift each other up in their pursuits. <hr>

### Key Features:

- Goal Setting (Daily, Weekly, and Monthly)
- Record Keeping of past and present goals
- User authentication
- The ability to see friend's goals
- The ability to set shared goals
- Statistics for past goal habits
<hr>

### Web Related Technologies:

- HTML/CSS/Javascript to create an interactive and professional UI (Using React)
- Authentication for Users as well as to verify friend lists
- Database (MongoDB) to store user information, goals, and friend info
- Websocket Data to update users on other's goals and information
<hr>

### Sample UI

![Sample UI for Gollab](/Assets/GollabUI.jpg)
<hr>

### HTML Deliverable:

- **HTML Pages**: Created 6 HTML Pages that include
    - A Main Page for Login (index.html)
    - A Profile Page to view current goals and navigate through the application (profile.html)
    - A place to view all goals (current or expired), works for self and friends (goals.html)
    - A place to view and add friends (friendlist.html)
    - A place to view friend's profile (friend.html)
    - A place to create new goals (create.html) 
- **Links**: Created a Navigation that links to carious sections of the application, including friend lists, profiles, and more!
- **Text**: Text displays content of goals set as well as statistics
- **Images**: An image is used for both the website Icon and Logo
- **DB/Login**: Database is used for login (input on main page) as well as for storing goal information and presenting it
- **WebSocket**: Friend lists allow users to add friends to their profile and can view the profiles of others who have added them

### CSS Deliverable:

- **Header, Footer, and Main Content Body**: Success!
- **Navigation Elements**: Bootstrap Navbar with additional links and navigation throughout
- **Responsive to Window Resizing**: Success!
- **Application Elements**: Properly styled and professional looking
- **Application Text Content**: Consistent Fonts, Coloration, and Hierarchy!
- **Application Images**: Images pulled from Unisplash (background) and a personally designed logo

### Javascript Deliverable:

- **Javascript Support for Future Login**: Success! Logging in right now automatically creates an account (sign up page not fully functional)
- **Javascript Support for Future Database**: Success! Very intensive integration of LocalStorage as placeholder for User, Friend, and Goal Data
- **Javascript Support for Web Socketing**: Success! Friend addition pop ups appear every ~15 seconds on every screen
- **Javascript Support for App Interaction Logic**: Success! (Almost) full CRUD functionality for friends and goal data. Update (U) coming soon!
- **Note**: Future features to be added are goal due dates displaying with the goal as well as update functionality for goals

### Service Deliverable:

- **Create an HTTP Service Using Node.JS and Express**: Success! Npm package and express installed and utilized!
- **Frontend served through static middleware**: Success! Used static services to serve files in public directory.
- **Frontend calls 3rd party Endpoints**: The third party API that I used is on the BACKEND (Index.js) for security reasons. I use an API key to access. The 3rd Party API provides stock prices for FAANG Companies (on the Front/Login page). I created my own endpoint to host the API and then call it from my front end. (Finnhub API)
- **Backend Provides Service Endpoints**: Success! Full CRUD Functionality is given through custom api endpoints (GET, PATCH, DELETE, POST)
- **Your Frontend calls your Service Endpoints**: Success! Fetch is all over the place, sometimes using async and sometimes using .then
