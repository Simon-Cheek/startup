# Notes from BYU CS 260 Class: Web Programming

## Assignment 1: Git and GitHub

- Create a repo first in GitHub and then clone to local machine using 'git clone'
- Commit *often* and commit one change at a time
- Avoid committing large files
- Use 'git checkout' to peruse previous commits, and configure one to be the HEAD if you'd like to revert to that version
- Fix merge conflicts by pulling from GitHub (merge) and then clarify conflicting lines in VSCode

## Assignment 2: Launching an AWS Instance

- EC2 Instance creates a web server that can be accessed via SSH command
- Key Value Pair (security) is needed to access the server (which is Linux)
- Elastic IP Address has been associated and is: 54.173.84.241
- Tech Stack consists of Node.JS, MongoDB, and Caddy2
- Domain Name is gollab.click ! and had DNS records connected to gollab.click as well as \*.gollab.click to redirect subdomains

## Assignment 3: Obtain a Secure Connection using Caddy

- Caddy acts as a router to various servers attached to your domain
- Caddy also allows for easy obtaining of security certificates (Let's Encrypt)
- Linux/Ubuntu: when in view mode for a file (vi), use `vi` to enter view mode and then `i` to engage in input mode
- Linux/Ubuntu: press `esc` to exit view mode and type `exit` to leave to server instance

## Assignment 4: HTML

- Table Elements include `<th>` for headers and then a set of `<tr>` rows that match the same number of headers
- Image elements take either a file path or a direct URL
- `<aside>` can be used for parts of the website not of principle importance
- Default color input values can be set using `value=""`
- Form elements are often wrapped in `<fieldset>`
- `<svg>` elements provide support for animated images
- `<canvas>` provides support for 2D Drawing

## Assignment 5: Startup HTML
- Deployment to AWS Production includes deleting all files associated with that branch of production and then copying files in your directory and pasting them into production (uses shellscripts to do so)
- Current content (HTML) will mimic what the app will do, but is not fully functional

## Assignment 6: CSS Practice / Flex
- Remember the transform property!
- Animations can be made using `@keyframes`
- Grid Layout allows for a 'minmax' property, which defines both min/max size for grid children
- Flex doesn't affect parents or grandchildren, only children
- Always include `<meta name="viewport" content="width=device-width, initial-scale=1" />` as a means of telling the browser to not try to shrink your website when devices change
- Media Queries can be used to determine screen orientation (landscape vs portrait)

## Assignment 7: Startup CSS
- Optimize your code! Try to create template CSS classes that can be used throughout rather than restyling every single page and element
- Remember that flex only affects children, use `align-items` to counteract how elements interact with the cross axis

## Assignment 8: Javascript
- LOCALSTORAGE: Use the methods `setItem`, `getItem`, `removeItem`, and `clear()` with localStorage to access local database with browser
- Simulate backend by using Javascript to pull data from localstorage and insert into the front end
- If you use localstorage with objects, you must convert to string using JSON methods
