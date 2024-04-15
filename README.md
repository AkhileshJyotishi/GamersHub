# [GamersHub](https://gamers-hub-lovat.vercel.app)

Platform designed to empower game creators by providing them with the tools and resources needed to showcase, sell, and market their games effectively. 

## Introduction

THe platform is a hub where game creators can upload their game's details . They can post news about the games. Create new posts related to upcoming games etc. 
The game Enthusiasts like share and comment about the game in and outside the platform  as well . 

## Configuration & Installation

To get started with GamersHub, ensure you have the following dependencies and tools installed:

1. Node.js: Make sure you have Node.js installed on your system. You can download and install it from [here](https://nodejs.org/en/download).
2. Next.js: GamersHub is built using Next.js, a React framework for server-rendered applications . Install it globally using npm :

   ```
   yarn install -g next
   ```

Once you have installed the necessary dependencies, follow these steps to set up the development environment:

1. Clone the GamersHub repository from GitHub:
   ```
   git clone https://github.com/AkhileshJyotishi/GamersHub.git
   ```
2. Navigate to the project directory:
   ```
   cd GamersHub/frontend
   ```
3. Install project dependencies:
   ```
   yarn install
   ```
4. Create a .env file in the root directory and add all environment variables.
   ```
    # Port number
   PORT=5000
   
   # Postgres URL
   # DATABASE_URL=<YOUR_DATABASE_URL>
   
   # JWT
    Generate JWT using the following command
    node -e "console.log(require('crypto').randomBytes(48).toString('hex'))
    # JWT secret key
    JWT_SECRET=<JWT_SECRET>
    # Number of minutes after which an access token expires
    JWT_ACCESS_EXPIRATION_MINUTES=30
    # Number of days after which a refresh token expires
    JWT_REFRESH_EXPIRATION_DAYS=30
    # Number of minutes after which a reset password token expires
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES=10
    # Number of minutes after which a verify email token expires
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES=10
   
    # SMTP configuration options for the email service
    SMTP_HOST=<SMTP_SERVER_URL>
    SMTP_PORT=<SMTP_PORT>
    SMTP_USERNAME=<SMTP_USERNAME>
    SMTP_PASSWORD=<SMTP_PASSWORD>
    EMAIL_FROM=<Enter_YOUR_EMAIL>
   
    # AWS S3 configuration
    BACKBLAZE_ACCESS_KEY_ID=<S3_ACCESS_KEY>
    BACKBLAZE_SECRET_ACCESS_KEY=<S3_SECRET_ACCESS_KEY>
    BACKBLAZE_REGION=<BUCKET_REGION>
    BACKBLAZE_BUCKET_NAME=<BUCKET_NAME>
    BACKBLAZE_ENDPOINT_URL=<BUCKET_ENDPOINT_URL>
    MESSAGING_FILES_S3_FOLDER_NAME=
   
    #Frontend Configuration
    FRONTEND_BASE_URL=<FRONTEND DEPloyed LINK>
   ```
5. Start the development server:
   ```
   yarn run dev
   ```
6. For Backend use environment variables:
   ```
   #Enter backend url
   NEXT_PUBLIC_API_BASE_URL=<API_BACKEND_URL> 
   NEXTAUTH_URL=<YOUR_FRONTEND_BASE_URL>
   #Login credentials
   Follow this to setup your CLIENT details at https://support.google.com/cloud/answer/6158849?hl=en
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=<CLIENT_ID>
   NEXT_PUBLIC_GOOGLE_CLIENT_SECRET=<CLIENT_ID_SECRET>
   ```
7. Install dependencies and Start the backend development server
 ```
  yarn install
  yarn run dev
 ```
  
6. Open your browser and navigate to FRONTEND_BASE_URL to access GAMERSHUB.



# Features

## Frontend

### 1. Game Create Update and Delete :
  - Game creators can create games , update it  .
  - Users can see changes made by others instantly, facilitating seamless collaboration and teamwork.

### 2. Create and Update Editor:
  - Platform includes a comprehensive  Rich Text Editor where creators can design whatever content they want according to their choice .It features AI based content generation.


### 3. Jobs Creation and Application:
  - Platform also supports jobs posting by Games Organization,
    so that artists , designers and game developers can apply to it.
  - They can apply through the resume uploaded by them in the settings panel or else they can choose to fill the form from scratch.
  - These applications are reviewable through the admin panel.

### 4. Games News Section :
  - In this section Gamers and Creators can post about the latest updates in the games world.
  - The most recent news are featured on the homepage of platform which gives them a boost in publicity.

### 5. Filter in Games,News and  Users Section :
- This allows users to filter games based on their choice.
- People can filter other important news and creators and save them in their account.

### 6. SEO optimization & Accessebility :
- The SEO of the platform is optimized and accessible by crawlers thanks to the modularity of  code. 

### 7. Help Section :
- The categories and the question can be edited and ordered through admin panel.

- It features search functionality based on fuzzy search

# Documentation 
- Frontend Documentation done through jsdocs.
- Backend Documentation is through swagger which has been completed partially.
- All the apis have been documented thoroughly using [postman](https://grey-sunset-776886.postman.co/workspace/New-Team-Workspace~c6471bf7-7d1c-4797-9c46-606791e20345/collection/30959444-343d222c-c6ce-4787-a574-47b98e492e66?action=share&creator=30959444)



## Contributors
The following individuals have contributed to the GamersHub project:

### 1. [Akhilesh Jyotishi](https://github.com/AkhileshJyotishi)
 - Role: Full Stack Developer
 - Responsibilities: Refining frontend components, optimizing performance, ensuring responsive design, maintaining code consistency across the application, and ensuring smooth integration with the backend.

### 2. [Yash Agarwal](https://github.com/Yash7426)
 - Role: Backend Developer
 - Responsibilities: Development of backend functionalities.

