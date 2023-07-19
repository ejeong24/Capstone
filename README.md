# ⚽️ FutHut

## 💻 Description 
   - FutHut revolutionizes FIFA Ultimate Team by providing users with a web app that simplifies squad building for a more convenient and engaging experience.

## 📂 GitHub Repository  
   - [https://github.com/ejeong24/Capstone](https://github.com/ejeong24/Capstone)

## 📚 User Stories
   - **As a user, I want to have the ability to:**
      - Register, sign in, and sign out.
      - View a list of all players, including their names, position, and stats.
      - View a list of leagues, and filter players by league.
      - Create, view, edit, or delete squads.
      - Add or delete players from a given squad.
      - Add and edit my profile information, such as username and e-mail.

## 🎨 Wireframe (Figma)  
![Wireframe - Home](https://github.com/ejeong24/Capstone/blob/main/images/FutHut%20Home.PNG)
![Wireframe - My FutHut](https://github.com/ejeong24/Capstone/blob/main/images/FutHut%20My%20FutHut.PNG)
![Wireframe - Player by ID](https://github.com/ejeong24/Capstone/blob/main/images/FutHut%20Player%20by%20ID.PNG)
![Wireframe - Players](https://github.com/ejeong24/Capstone/blob/main/images/FutHut%20Players%20and%20by%20League.PNG)
![Wireframe - Leagues](https://github.com/ejeong24/Capstone/blob/main/images/FutHut%20Leagues.PNG)
![Wireframe - Sign In](https://github.com/ejeong24/Capstone/blob/main/images/FutHut%20Sign%20In.PNG)
![Wireframe - Sign Out](https://github.com/ejeong24/Capstone/blob/main/images/FutHut%20Sign%20Out.PNG)


## 🌳 React Components Tree  
![React Components Tree](https://github.com/ejeong24/Capstone/blob/main/images/FutHut%20React%20Tree.PNG)

## ↔️ Schema
![Schema](https://github.com/ejeong24/Capstone/blob/main/images/FutHut%20Schema%20Diagram.PNG)

## 🗺️ React Routes

| Route Path | Component |
| ---------- | --------- |
| `/`        | Home      |
| `/players` | Players   |
| `/leagues` | Leagues   |
| `/myfuthut` | MyFutHut |
| `/signin`  | SignIn    |
| `/signout` | SignOut   |

## 🛠️ API Routes  
| Route                                          | Request Method | Body                                   | Response                                 |
| ---------------------------------------------- | -------------- | -------------------------------------- | ---------------------------------------- |
| `/squad_players/<int:squadID>`                  | GET            | N/A                                    | List of squad players                    |
| `/users/register`                               | POST           | `{ "username": "...", "firstName": "...", "lastName": "...", "email": "...", "password": "..." }` | Success message and user ID              |
| `/leagues`                                      | GET            | N/A                                    | List of leagues and pagination data       |
| `/users/login`                                  | POST           | `{ "username": "...", "password": "..." }` | Success message and user data            |
| `/users/logout`                                 | POST           | N/A                                    | Success message                          |
| `/players`                                      | GET            | N/A                                    | List of players and pagination data       |
| `/players/<string:playerId>`                    | GET            | N/A                                    | Player information                       |
| `/players/<string:playerId>/image`              | GET            | N/A                                    | Player image                             |
| `/rarities/<int:rarityId>/image`                | GET            | N/A                                    | Rarity image                             |
| `/users/<int:user_id>/squads/activeSquad`        | GET            | N/A                                    | Active squad information                 |
| `/users/<int:user_id>/squads/<int:squad_id>/setActive` | POST      | N/A                                    | Success message                          |
| `/users/<int:user_id>/squads/<int:squad_id>/add-player` | POST   | `{ "player_id": "..." }`               | Success message                          |
| `/users/squads/<int:squad_id>/delete-player`    | POST           | `{ "player_id": "..." }`               | Success message                          |
| `/squads`                                       | POST           | `{ "squad_name": "...", "user_id": "..." }` | Success message                          |
| `/users/<int:userID>/squads`                    | GET            | N/A                                    | List of user squads                       |
| `/squads/<int:squadID>/edit`                    | PATCH          | `{ "new_squad_name": "..." }`          | Success message                          |
| `/squads/<int:squadID>/delete`                  | DELETE         | N/A                                    | Success message or error                  |
| `/users/<int:userID>/profile`                   | DELETE         | N/A                                    | Success message                          |
| `/users/<int:userID>/profile`                   | GET            | N/A                                    | User profile information                  |
| `/users/<int:userID>/profile`                   | PATCH          | `{ "username": "...", "firstName": "...", "lastName": "...", "email": "...", "password": "..." }` | Updated user profile information          |
| `/`                                              | GET            | N/A                                    | Welcome message                          |

## 🎯 Stretch Goals
- Let users filter players by additional attributes
- Render graphs showing market price trends for a given player
- Implement a drag-and-drop feature for squad-building
- Calculate and visualize player chemistry

## 📌 Kanban Board
![Kanban Board - Page 1](https://github.com/ejeong24/Capstone/blob/main/images/FutHut%20Kanban%201.PNG)
![Kanban Board - Page 1](https://github.com/ejeong24/Capstone/blob/main/images/FutHut%20Kanban%202.PNG)
