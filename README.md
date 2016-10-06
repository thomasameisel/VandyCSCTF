## VandyCS - Capture The Flag Fall 2016

#### Complete:
- unzipper - unzip the file using multiple different compressions
  - \_FLAG_(zip_zip_zip_away)
- cookies - website that change the cookies in order to login using admin
  - \_FLAG_(i_like_cookies)
- post to url - website that exposes the url that gets the flag, no authentication server side when posting to that url
  - \_FLAG_(post_to_me)
- login in source - have username and password in the source code
  - \_FLAG_(always_check_source)
- sql - sql injection to login
  - \_FLAG_(sanitize_your_inputs)
- robots - username and passwords in the robots.txt file
  - In description add "Passwords are hidden so well that not even Google can find it"
  - \_FLAG_(accept_robot_overlords)
- javascript injection - use javascript injection with the child_process node package in order to view file system
  - \_FLAG_(js_injector)
- xss - use xss scripting in a message to get the admin's password
  - \_FLAG_(xss_all_day)
- user agent - change user agent to get flag
  - \_FLAG_(agents_for_users)
- php file flag - website that saves an image, use php vulnerabilities to execute php that will show the flag
  - \_FLAG_(cannot_trust_files)
- php file flag check extension - website that saves an image and checks extension, must change magic number to upload file
  - \_FLAG_(magic_numbers_lie)
- directory traversal - use directory traversal in order to access admin folder and download flag file
  - \_FLAG_(practice_round_1)
- common password - admin's password is "password"
  - Don't want to use this one
- php echo name - user can use passthru injection to navigate to the flag.txt
  - Include source code
  - \_FLAG_(echo_echo_echo_echo)
- hidden input - change hidden input in form
  - \_FLAG_(hide_and_go_seek)
- caesar - caesar cipher to decrypt text
  - \_FLAG_(et_tu_julius)
- edit source code - edit css code to reveal flag
- text in image - hide text in an image
  - \_FLAG_(thousand_words)
- redacted pdf - have to highlight the words in a pdf to copy the text
  - \_FLAG_(whats_really_in_pdfs)
- signup sql injection - have to use sql injection in the signup form and also wildcards in order to get the admin password
  - Partly bruteforce attack, could be an issue with the server
  - \_FLAG_(third_times_the_charm)

#### Needs to be done:
- Storage has to be implemented for the php challenge
- Change the edit source code

#### Ideas:
- client side encryption
- url - add to url
