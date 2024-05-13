# OpenId Connect

OpenID Connect is a protocol that is built on top of OAuth 2.0. It adds a few extra steps to the OAuth process to allow the application to get information about the user, such as their name and email address.

OAuth emits access tokens to the apps, while OpenID Connect emits ID (identity) tokens to the apps.

## ID Token

The ID token is a JSON Web Token (JWT) that contains information about the user. The ID token is signed by the authorization server, so the application can verify that the token is valid.

The ID token contains information such as:

- sub - The user's unique identifier
- The user's name
- The user's email address
- The issuer of the token 
- The audience of the token
- The expiration time of the token
- The time the token was issued
- The nonce value

## OpenID scopes

OpenID Connect defines a set of scopes that the application can request when it redirects the user to the authorization server. The scopes define the information that the application wants to get about the user.

The scopes are:

- openid - This scope is required for OpenID Connect
- profile - This scope requests the user's profile information, such as their name and email address
- email - This scope requests the user's email address
- address - This scope requests the user's address
- phone - This scope requests the user's phone number

