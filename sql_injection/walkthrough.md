## Walkthrough
SQL injections work when the programmer does not correctly validate input before querying the database. Suppose there is a server where it checks if the login is correct. A query to do this would be <code>SELECT \* FROM users WHERE username="user" AND password="pass"</code>. If that query returns any results, you would know that the password <code>pass</code> for the username <code>user</code> would be correct. In order to be able to run this query for any username and password, a programmer might write <code>db.query('SELECT \* FROM users WHERE username="' + username_input + '" AND password="' + password_input + '"')</code>. The problem with this query is that the input can change the query to something completely different. For example, if <code>username_input='abc'</code> and <code>password_input='"; SELECT \* FROM credit_cards; --'</code> then query would be <code>db.query('SELECT \* FROM users WHERE username="abc" AND password=""; SELECT \* FROM credit_cards; --"')</code> and would therefore return every row in the credit_cards table.

By using a SQL injection, you are able to login and see the flag. For this challenge, by setting the username and password as

- username: abc
- password: " OR "1"="1

you are able to login.
