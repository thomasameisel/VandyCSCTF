## CTF Competition - 10/29/16 from 12-2pm

#### Login
- vandy_cs_admin_accnt
- ThisISaBASD123!@#!adf

#### Complete:
- trivia - 5 points
  - Q: What would your SSL connection size be if your web server supports 128 bit and your browser supports 256 bit?
  - A: 128

  - Q: Which form of email authentication requires a specific policy for messages signed by the author's domain, which was demoted to historic in 2013?
  - A: ADSP

  - Q: What is the technique used to attack database-driven applications in which certain statements are inserted into the entry field, and then is executed?
  - A: SQL injection

  - Q: What is Internet standard for electronic mail (email) transmission that was first defined by RFC 821 in 1982?
  - A: SMTP

  - Q: What is the name of an attack in which multiple systems flood the bandwidth or resources of a targeted system with traffic?
  - A: DDoS

  - Q: After what change must a session ID be renewed?
  - A: Privilege level

  - Q: This vulnerability is caused by the timing of certain events or processes.
  - A: Race condition

  - Q: What was the highest selling single model of personal computer ever?
  - A: Commodore 64

  - Q: Dade "Zero Cool" Murphy has started calling himself by a second alias. What is that alias?
  - A: Crash Override

  - Q: What company does Elliot Anderson want to topple?
  - A: E Corp

- easy - 20 points
  - 1. unzipper - unzip the file using multiple different compressions
    - \_FLAG_(zip_zip_zip_away)

  - 2. login in source - have username and password in the source code
    - port 8081
    - \_FLAG_(always_check_source)

  - 3. robots - username and passwords in the robots.txt file
    - port 8082
    - In description add "Passwords are hidden so well that not even Google can find it"
    - \_FLAG_(accept_robot_overlords)

  - 4. hidden input - change hidden input in form
    - port 8083
    - \_FLAG_(hide_and_go_seek)

  - 5. caesar - caesar cipher to decrypt text
    - \_FLAG_(et_tu_julius)

  - 6. redacted pdf - have to highlight the words in a pdf to copy the text
    - \_FLAG_(whats_really_in_pdfs)

- medium - 40 points
  - 7. sql - sql injection to login
    - port 8084
    - \_FLAG_(sanitize_your_inputs)

  - 8. post to url - website that exposes the url that gets the flag, no authentication server side when posting to that url
    - port 8085
    - \_FLAG_(post_to_me)

  - 9. javascript injection - use javascript injection with the child_process node package in order to view file system
    - need separate ec2 instance
    - \_FLAG_(js_injector)

  - 10. user agent - change user agent to get flag
    - port 8086
    - \_FLAG_(agents_for_users)

  - 11. php file flag - website that saves an image, use php vulnerabilities to execute php that will show the flag
    - need separate ec2 instance
    - \_FLAG_(cannot_trust_files)

  - 12. text in image - hide text in an image
    - \_FLAG_(thousand_words)

- hard - 100 points
  - 13. xss - use xss scripting in a message to get the admin's password
    - port 8087
    - \_FLAG_(xss_all_day)

  - 14. php file flag check extension - website that saves an image and checks extension, must change magic number to upload file
    - need separate ec2 instance
    - \_FLAG_(magic_numbers_lie)

  - 15. signup sql injection - have to use sql injection in the signup form and also wildcards in order to get the admin password
    - need separate ec2 instance
    - Partly bruteforce attack, could be an issue with the server
    - \_FLAG_(third_times_the_charm)
