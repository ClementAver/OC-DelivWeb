# OlympicGamesStarter

<div>
<img alt="Static Badge" src="https://img.shields.io/badge/Angular-%23F44336">
<img alt="Static Badge" src="https://img.shields.io/badge/TypeScript-3178c6">
</div>

This project consists of a home page showing the number of medals won by a list of nations at previous Olympic Games.
This information is presented in the form of a pie chart, displaying the exact number of medals on mouse-over.

The slices of this pie chart can be clicked, taking us to a dynamic page dedicated to the selected nation. 
On this page, you can find a second graph detailing the number of medals obtained per Olympic Games,
as well as the total number of athletes lined up by the chosen nation.

Each page makes a single call to retrieve the data required for its operation.
This data is then dispatched to the different variables used in the templates.

When the page is loaded, a loader is first displayed to warn the user of the current behaviour.
If the data has been successfully retrieved, it is then displayed.
If not, the user is warned that an error has occurred.

For the dynamic page dedicated to a country, if the country entered in the access path does not allow data to be retrieved,
then a redirection message appears with a countdown before redirecting the user to the home page.

The project is correctly typed, and types and interfaces have been created for this purpose.

## Setup

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.3.

To launch the project locally :
- `npm install`
- `npm run start`




