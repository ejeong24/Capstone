# Capstone Project Pitch: FutHut

1. A one sentence description of the app  
   - FutHut revolutionizes FIFA Ultimate Team by providing users with a socially-driven web app that simplifies squad building, testing, and sharing for a more convenient and engaging experience.

2. A link to the GitHub repo  
   - [https://github.com/ejeong24/Capstone](https://github.com/ejeong24/Capstone)

3. User Stories
   - As a user, I want to have the ability to:
      - Register an account with my username, email, and password.
      - Log in to my account using my username and password.
      - View a list of available players, including their names, price, attributes, clubs, and ratings. This list can be filtered by league.
      - View detailed information about a specific player, including their names, price, attributes, clubs, and ratings. This can be done through search or by clicking on a player.
      - Create a new squad by providing a squad name.
      - View a list of my squads.
      - Edit the information of a specific ("Active") squad, including changing the name and removing players.
      - Delete a specific squad from my account.
      - Add and edit my profile information, such as username, profile picture, gaming platform, and bio.
      - Receive appropriate error messages in case of any issues during registration, login, or other operations.
      - Benefit from data validations to ensure the provided data is valid and consistent.
      - Log out of my account easily.

4. Wireframe (Figma)  
![Wireframe - Home](https://github.com/ejeong24/Capstone/raw/main/FutHut%20Home.PNG)
![Wireframe - Leagues](https://github.com/ejeong24/Capstone/raw/main/FutHut%20Leagues.PNG)
![Wireframe - My FutHut](https://github.com/ejeong24/Capstone/raw/main/FutHut%20My%20FutHut.PNG)
![Wireframe - Player by ID](https://github.com/ejeong24/Capstone/raw/main/FutHut%20Player%20by%20ID.PNG)
![Wireframe - Players (All or by League)](https://github.com/ejeong24/Capstone/raw/main/FutHut%20Players%20and%20by%20League.PNG)
![Wireframe - Sign In](https://github.com/ejeong24/Capstone/raw/main/FutHut%20Sign%20In.PNG)
![Wireframe - Sign Out](https://github.com/ejeong24/Capstone/raw/main/FutHut%20Sign%20Out.PNG)


6. Diagram of React components
   ![React Components Tree](https://github.com/ejeong24/Capstone/blob/main/images/FutHut%20React%20Components%20Tree.PNG)

7. Screenshot of Schema (Figma)
![Schema](https://github.com/ejeong24/Capstone/blob/main/images/FutHut%20Schema.PNG)

8. A list of the app's API routes, including:
| Route                                      | Method | Params                                                | Response                                                          |
|--------------------------------------------|--------|-------------------------------------------------------|-------------------------------------------------------------------|
| /api/users/register                        | POST   | username (string), email (string), password (string) | `[{id, username, bio, email}]`                                    |
| /api/users/login                           | POST   | username (string), password (string)                  | `[{token}]`                                                       |
| /api/players                               | GET    | None                                                  | `[{id, name, price, attributes, clubs, ratings}]`                  |
| /api/players?leagueId={leagueId}           | GET    | leagueId (string)                                     | Filtered list of player objects based on the specified league      |
| /api/players/:playerId                     | GET    | playerId (string)                                     | `[{id, name, price, attributes, clubs, ratings}]`                  |
| /api/squads                                | POST   | userId (string), name (string)                        | `[{id, name, players}]`                                            |
| /api/users/:userId/squads                  | GET    | userId (string)                                       | List of user's squad objects                                       |
| /api/squads/:squadId                       | PATCH  | squadId (string)                                      | `[{id, name, players}]`                                            |
| /api/squads/:squadId                       | DELETE | squadId (string)                                      | Success message or status code                                     |
| /api/users/:userId/profile                 | PATCH  | userId (string), username (string), profilePicture (file), gamingPlatform (string), bio (string) | `[{id, username, bio, profilePicture, gamingPlatform}]` |
| /api/users/logout                          | POST   | None                                                  | Success message or status code                                      |


9. Three stretch goals
   - Let users filter players by additional attributes
   - Render graphs showing market price trends for a given player
   - Implement a drag-and-drop feature for adding players to a squad

11. A Kanban board
![Kanban Board - Page 1](https://github.com/ejeong24/Capstone/blob/main/images/FutHut%20Kanban%201.PNG)
![Kanban Board - Page 1](https://github.com/ejeong24/Capstone/blob/main/images/FutHut%20Kanban%202.PNG)
