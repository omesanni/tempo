# Tempo Project
This app was built with ReactJS.

## Tech used
- Redux
- SASS
- jest, react testing library
- Typescript
- Webpack

## Description
The task required that there should be a page that showed all the teams and users can be able to navigate to individual team pages. Given this, I implemented a landing page that shows all the teams and clicking on a particular team will take you to the team page which shows all the members of that team.

I noticed some issues with the teams API. I noticed that for example when fetching all the teams, the names of the team lead aren't in the json returned just the id of the team the lead. I also noticed this issue in the api for fetching details of a particular team as well as not returning a list of all its members as part of the response. I found that the users API can be used to fetch the details of the team lead and team members.

Given these issues, it means multiple network requests will need to be made to users and teams api since all the details cant be retrieved in one go. These are my solutions to the problems:
- Teams Overview Page: On this page, I fetch all the teams and then concurrently fetch the details of the team leads using id of the team lead from the teams array. The fetching of the team lead details(e.g name) is done concurrently and so the UI doesn't have to wait for users api requests to finish before displaying the response gotten from teams api.
- Team Details Page: On this page, I fetch the team details and then to get its team members i fetch all the users from the users api. To get the members of a particular team, I filter the response returned by users api using the team id gotten from the response of the team network call. Once the team members are known, a network call is made to get the names of each team member using the /users/:id api. We need to do this because the response from /users api only provides user id and team id and not details like name of the user. Again, the fetching of the user details are done concurrently and so the UI doesn't have to wait once the team members array data is gotten.

## Start app locally
1. `Make sure you have node (v12.18.1 and above) and npm installed on your system`
2. `Clone this repo`
3. `npm install`
4. `npm start`
5. `Open browser at http://localhost:3000`
