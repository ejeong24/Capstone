# ⚽️ FutHut

## 💻 Description 
   - FutHut revolutionizes FIFA Ultimate Team by providing users with a web app that simplifies squad building for a more convenient and engaging experience.

## 📂 GitHub Repository  
   - [https://github.com/ejeong24/Capstone](https://github.com/ejeong24/Capstone)

## 📚 User Stories
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
      - Log out of my account.

## 🎨 Wireframe (Figma)  
![Wireframe - Home](https://github.com/ejeong24/Capstone/blob/main/images/FutHut%20Home.PNG)
![Wireframe - My FutHut](https://github.com/ejeong24/Capstone/blob/main/images/FutHut%20My%20FutHut.PNG)
![Wireframe - Player by ID](https://github.com/ejeong24/Capstone/blob/main/images/FutHut%20Player%20by%20ID.PNG)
![Wireframe - Players](https://github.com/ejeong24/Capstone/blob/main/images/FutHut%20Players%20and%20by%20League.PNG)
![Wireframe - Leagues](https://github.com/ejeong24/Capstone/blob/main/images/FutHut%20Leagues.PNG)
![Wireframe - Sign In](https://github.com/ejeong24/Capstone/blob/main/images/FutHut%20Sign%20In.PNG)
![Wireframe - Sign Out](https://github.com/ejeong24/Capstone/blob/main/images/FutHut%20Sign%20Out.PNG)


## 🌳 React Components Tree  
![React Components Tree](https://github.com/ejeong24/Capstone/blob/main/images/FutHut%20React%20Components%20Tree.PNG)

## ↔️ Schema
- Diagram  
![Schema](https://github.com/ejeong24/Capstone/blob/main/images/FutHut%20Schema.PNG)

- React Routes
   - **Home:** Renders the Home component.
      - Route: /
      - Component: Home
      
   - **Players:** Renders the Players component, displaying a list of available players.
      - Route: /players
      - Component: Players
      
   - **Player by ID:** Renders the PlayerByID component, showing detailed information about a specific player.
      - Route: /player/:playerId
      - Component: PlayerByID

   - **Leagues:** Renders the Leagues component, displaying a list of available leagues and the ability to filter players by league.
      - Route: /leagues
      - Component: Leagues
   
   - **My FutHut:** Renders the MyFutHut component, displaying the user's profile, active squad, and squad list.
      - Route: /myfuthut
      - Component: MyFutHut
        
   - **Sign In:** Renders the SignIn component, allowing users to log in to their accounts.
      - Route: /signin
      - Component: SignIn
        
   - **Sign Up:** Renders the SignUp component, allowing users to register a new account.
      - Route: /signup
      - Component: SignUp

## 🛠️ API Routes  
![API Routes](https://github.com/ejeong24/Capstone/blob/main/images/FutHut%20API%20Routes.PNG)

## 🎯 Stretch Goals
- Let users filter players by additional attributes
- Render graphs showing market price trends for a given player
- Implement a drag-and-drop feature for adding players to a squad

## 📌 Kanban Board
![Kanban Board - Page 1](https://github.com/ejeong24/Capstone/blob/main/images/FutHut%20Kanban%201.PNG)
![Kanban Board - Page 1](https://github.com/ejeong24/Capstone/blob/main/images/FutHut%20Kanban%202.PNG)
