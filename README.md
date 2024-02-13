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
