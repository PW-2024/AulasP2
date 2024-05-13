# OAuth

## Brief history

Before OAuth, when you wanted to use an application to access your data, you had to give it your username and password. This was a bad idea for a number of reasons:

- The application could do anything it wanted with your data.
- The application could do anything it wanted with your account.
- The application could do anything it wanted with your friends' data.

The applications like facebook, twitter, google, ... were not happy with this situation. They wanted to provide a way for users to give an application permission to access their data without giving the application their password.
Each of them started to develop their own way to do this, but they all had the same basic idea: the user would give the application a token that the application could use to access the user's data.

After a while, the people at Twitter, Google, and other companies got together and decided to create a standard way to do this. They called it OAuth.

## OAuth 1.0

In 2007, OAuth 1.0 was released. It was a good start, but it had some problems:
- It was complicated (for devices)
- Wasn't very secure on mobile devices.

## OAuth 2.0

In 2012, OAuth 2.0 was released. It was a big improvement over OAuth 1.0. It was simpler, more flexible, and more secure. It was also designed to work better on mobile devices.

## OAuth and OpenID Connect

OAuth and OpenId Connect are two different protocols that are often used together. OAuth is used to give an application permission to access a user's data, while OpenID Connect is used to authenticate a user.

OAuth was originally designed for authorization, not authentication. All the user needs is a token that the application can use to access their data. If the application wants to know who the user is, it has to ask the user and there's where OpenID Connect comes in.

OpenID Connect is built on top of OAuth. It adds a few extra steps to the OAuth process to allow the application to get information about the user, such as their name and email address.
 
OAuth emits access tokens to the apps, while OpenID Connect emits ID (identity) tokens to the apps.

## Roles in OAuth

- Users (Resource owner) - person with the account
- Device (User Agent) - the device that the user is using to access the application (phone, pc, ...)
- The Application (Oauth client) - the application that the user wants to access the server 
- Authorization server - the authentication server that the user logs in to
- Resource server - the server that has the user's data

The user will never give their password to the application. Instead, the application will ask the user to log in to the API and give the application a token that the application can use to access the user's data.

## Client types

- Confidential clients - can keep their client secret confidential
- Public clients - cannot keep their client secret confidential

Confidental clients have a client secret that they use to authenticate with the authorization server. Public clients do not have a client secret, so they use a different method to authenticate with the authorization server.

In single page applications, the client is public because the client secret can be easily extracted from the code. So the client uses the implicit flow to get the access token.

## OAuth flows

- Abstract Protocol Flow
- Implicit flow
- Resource owner password credentials flow (Password grant)

## OAuth 2.0 Abstract Protocol Flow

The OAuth 2.0 protocol flow has the following steps:

1. The application redirects the user to the authorization server.
2. The user logs in to the authorization server.
3. The authorization server redirects the user back to the application with an authorization code.
4. The application sends the authorization code to the authorization server.
5. The authorization server sends the access token to the application.

## OAuth 2.0 Implicit Flow

The Implicit flow is used by single page applications that are hosted on a client. The flow has the following steps:

1. The application redirects the user to the authorization server.
2. The user logs in to the authorization server.
3. The authorization server redirects the user back to the application with an access token.
4. The application uses the access token to access the user's data.

## OAuth 2.0 Resource Owner Password Credentials Flow

The Resource Owner Password Credentials flow is used by applications that have a high level of trust with the user. Was a real need in the past where CORS was not a thing and the application was the only one that could access the server. The flow has the following steps:

- The application asks the user for their username and password.
- The application sends the username and password to the authorization server.
- The authorization server sends the access token to the application.
- The application uses the access token to access the user's data.

### Security note

The Implicit flow is not as secure as the Abstract Protocol Flow because the access token is sent to the application in the URL. This means that the access token can be intercepted and used by an attacker.

The password grant flow is also highly discouraged because the application has access to the user's password and needs to communicate it to the authorization server via the URL.

## OAuth 2.0 Tokens

- Access token - used by the application to access the user's data
- Refresh token - used by the application to get a new access token

The access token is a short-lived token that the application uses to access the user's data. The refresh token is a long-lived token that the application uses to get a new access token when the access token expires.

## OAuth 2.0 Scopes

Scopes are used to limit the access that the application has to the user's data. The application can request one or more scopes when it redirects the user to the authorization server. The authorization server will only give the application access to the user's data if the user has granted the application the requested scopes.

## Steps to implement OAuth

### Register the application with the authorization server (developers application)

The first step is to register the application with the authorization server. This involves creating an account with the authorization server and creating an application with the authorization server. The application will be given a client ID and a client secret that it can use to authenticate with the authorization server.

### Redirect the user to the authorization server

The next step is to redirect the user to the authorization server. This involves sending the user to a URL that the authorization server provides. The URL will include the client ID, the scopes that the application is requesting, and a redirect URI that the authorization server will redirect the user back to after they have logged in.

### The user logs in to the authorization server

The user will be asked to log in to the authorization server. This involves entering their username and password.

### The authorization server redirects the user back to the application

After the user has logged in, the authorization server will redirect the user back to the application with an authorization code.

### The application sends the authorization code to the authorization server

The application will send the authorization code to the authorization server. The authorization server will verify the authorization code and send the access token to the application.

### The application uses the access token to access the user's data

The application will use the access token to access the user's data. The access token will be included in the HTTP headers of the request that the application sends to the resource server.

### The application uses the refresh token to get a new access token

When the access token expires, the application will use the refresh token to get a new access token. The refresh token will be included in the request that the application sends to the authorization server to get a new access token.




## Pratical example with nextJS passport and facebook login returning jwt token

### Install the dependencies

```bash
npm install assport passport-facebook jsonwebtoken
```

```javascript
const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const jwt = require('jsonwebtoken');

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL,
  profileFields: ['email']
}, function(accessToken, refreshToken, profile, done) {
    // this function is called when the user logs in with Facebook and the user's profile is returned

    const {
        email,
    } = profile;

    // find the user in the database
    const user Users.find({ email });

    const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    done(null, user);
}));

routes.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

routes.get('/auth/facebook/callback', passport.authenticate('facebook', { session: false }), (req, res) => {
    res.json({ token: req.user });
});
```





