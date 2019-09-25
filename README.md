# Flow Server

## Sign Up
POST: (localhost:5000)/api/users/signup
BODY: {
	"email": "cbrand@email.com",
	"password": "password",
	"first": "Cody",
	"last": "Brand"
}
RESPONSE: auth token/cookie for this user's session

## Log In
POST: (localhost:5000)/api/users/login
BODY: {
	"email": "cbrand@email.com",
	"password": "password",
}
RESPONSE: auth token/cookie for this user's new session (max 10 sessions before all deleted)

## Log Out
DELETE: (localhost:5000)/api/users/logout
AUTHORIZATION: bearer token from login/signup
RESULT: no response, this session is deleted

## Log Out All Sessions
DELETE: (localhost:5000)/api/users/logout/all
AUTHORIZATION: bearer token from login/signup
RESULT: no response, all sessions for this user are deleted