## Installation

I assume you have Node.js along with NPM installed. Now install packages and run the app using:

```bash
npm install
node index.js
```

By default, two users are created.
| Username| Password | Role |
| ------- | -------- | ---- |
| admin | admin | admin |
| User-A | user | user |
You can view the visualization through admin login only

This URL on which the app is hosted http://ec2-54-167-16-45.compute-1.amazonaws.com:5003 will be available upon request.

Backend uses MySQL Database. So please use your own credentials by modifying file at db_config/config.js.
Backend uses port number 5003.
