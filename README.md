# JWT Service with server side client id and secret implementation

Steps:
1. Register an app while enabling Web/Mobile client channel in bots.kore.ai
2. Update the config.json file with the app client id and client secret under credentials
3. Update the port in config.json

Reuqest URL: <domain>/api/users/sts
Request Body:
{
	"identity" : "shantanu.ghorai@gmail.com",
	"isAnonymous" : true,
	"fName" : "shantanu",
	"lName" : "ghorai"
}

Response:
{
    "jwt": "<jwt token>"
}
