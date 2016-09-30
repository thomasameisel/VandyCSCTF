## VandyCS - Capture The Flag Fall 2016

#### Complete:
- unzipper - unzip the file using multiple different compressions
- cookies - website that change the cookies in order to login using admin
- post to url - website that exposes the url that gets the flag, no authentication server side when posting to that url
- login in source - have username and password in the source code
- sql - sql injection to login
- robots - username and passwords in the robots.txt file
  - In description add "Passwords are hidden so well that not even Google can find it"
- javascript injection - use javascript injection with the child_process node package in order to view file system
- xss - use xss scripting in a message to get the admin's password
- user agent - change user agent to get flag
- php - website that saves a file using php, use php vulnerabilities to execute php that will show the flag
- directory traversal - use directory traversal in order to access admin folder and download flag file
- common password - admin's password is "password"
  - Don't want to use this one
- php echo name - user can use passthru injection to navigate to the flag.txt
  - Include source code
- hidden input - change hidden input in form
- caesar - caesar cipher to decrypt text
- edit source code - edit css code to reveal flag

#### Needs to be done:
- Storage has to be implemented for the php challenge

#### Ideas:
- images - flag hidden in image
- pdf - flag hidden behind pdf
- client side encryption
- url - add to url
