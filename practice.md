## Practice Competition - 10/27/16 from 6-7pm

#### Login
- vandy_cs_practice_admin
- CTF1SF0NforE!VERY&

#### Questions
- trivia
  - 10 points
  - Q: Unix and Linux use this instead of a file format to check the type of a file.
  - A: magic number

- directory traversal - use directory traversal in order to access admin folder and download flag file
  - 20 points
  - need separate ec2 instance (can navigate to other folders)
  - \_FLAG_(traverse_away)

- cookies - website that change the cookies in order to login using admin
  - 30 points
  - port 8081
  - \_FLAG_(i_like_cookies)

- php echo name - user can use passthru injection to navigate to the flag.txt
  - 30 points
  - need separate ec2 instance (can navigate to other folders)
  - include source code (/challenge3/index.php)
  - \_FLAG_(echo_echo_echo_echo)
