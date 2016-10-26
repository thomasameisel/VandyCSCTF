## CTF Competition - 10/29/16 from 12-2pm

#### Complete:
- trivia - 10 points
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

- easy - 20 points
  - unzipper - unzip the file using multiple different compressions
    - \_FLAG_(zip_zip_zip_away)
  - login in source - have username and password in the source code
    - \_FLAG_(always_check_source)
  - robots - username and passwords in the robots.txt file
    - In description add "Passwords are hidden so well that not even Google can find it"
    - \_FLAG_(accept_robot_overlords)
  - hidden input - change hidden input in form
    - \_FLAG_(hide_and_go_seek)
  - caesar - caesar cipher to decrypt text
    - \_FLAG_(et_tu_julius)
  - redacted pdf - have to highlight the words in a pdf to copy the text
    - \_FLAG_(whats_really_in_pdfs)

- medium - 30 points
  - sql - sql injection to login
    - \_FLAG_(sanitize_your_inputs)
  - post to url - website that exposes the url that gets the flag, no authentication server side when posting to that url
    - \_FLAG_(post_to_me)
  - javascript injection - use javascript injection with the child_process node package in order to view file system
    - need separate ec2 instance
    - \_FLAG_(js_injector)
  - user agent - change user agent to get flag
    - \_FLAG_(agents_for_users)
  - php file flag - website that saves an image, use php vulnerabilities to execute php that will show the flag
    - need separate ec2 instance
    - \_FLAG_(cannot_trust_files)
  - text in image - hide text in an image
    - \_FLAG_(thousand_words)

- hard - 50 points
  - xss - use xss scripting in a message to get the admin's password
    - \_FLAG_(xss_all_day)
  - php file flag check extension - website that saves an image and checks extension, must change magic number to upload file
    - need separate ec2 instance
    - \_FLAG_(magic_numbers_lie)
  - signup sql injection - have to use sql injection in the signup form and also wildcards in order to get the admin password
    - need separate ec2 instance
    - Partly bruteforce attack, could be an issue with the server
    - \_FLAG_(third_times_the_charm)
