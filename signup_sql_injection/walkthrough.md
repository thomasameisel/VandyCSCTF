## Walkthrough
It is recommended that you work through the sql_injection challenge before starting this challenge.

You can try to use a SQL injection in the Login page, but it does not work. However, a SQL injection in the Signup page's username field does work. You can tell that it works because if you enter <code>" OR "2831@$#"="2831@$#</code> in the username field, it will return that that username already exists even though it is very unlikely that someone actually signed up under the username <code>" OR "2831@$#"="2831@$#</code>.

This means that the SQL injection occurs when the server checks if the username already exists before allowing a new login to be created. The query looks something like this <code>db.query('SELECT \* FROM users WHERE username="' + username_input + '"')</code>. If that query returns at least one row, the server knows that there is a user with the given username, and will return that the username already exists. If the query does not return any rows, the server knows that there are no users with that username and will allow the signup to occur.

You can use this injection to determine the password for the admin. SQL has wildcard symbols that can be used like regular expressions. For example, <code>SELECT \* FROM users WHERE username LIKE "a%"</code> will return all the users with a username starting with "a". By setting the username field to <code>admin" AND password LIKE "a%</code> the server will run the query <code>db.query('SELECT \* FROM users WHERE username="admin" AND password LIKE "a%"')</code>. If the admin's password starts with <code>a</code> the query will return the admin user and therefore think that the username already exists. If the admin's password does not start with <code>a</code> the query will not return a row and will allow the signup to occur.

So if you set the username field to <code>admin" AND password LIKE "a%</code> and you see a message that the username already exists, you know that the admin's password starts with <code>a</code>. In that case, you can change the username field to <code>admin" AND password LIKE "aa%</code> and so on.

It does not matter what you set the password field to be in the form because the SQL injection occurs in the query before the password field is used.

Since the Signup page says that passwords can only be alphanumeric and max 5 characters, this greatly reduces the number of characters that you have to check in the password. Even so, it would still be time-consuming to do this by hand since there are still (26 + 10)^5 possibilities that you have to check in the worst case. It is much easier and faster to write a simple script that will do this work for you. The sol.py file is a script that will find the password for you.

Once you have the password, you can login as admin to view the flag.
