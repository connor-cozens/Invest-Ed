# Invest-Ed Data Visualization Application

## Description

Platform visualizing data pertaining to initiatives and actors in girls education in the Global South. Users can view data pertaining to initiatives, target funders, and implementers in the form of graphs and maps. Organization users can access detailed information about these organizations and submit change requests to add new or updated organization-specific information for analysis and visualization purposes. Research users can approve these change requests and respond to user messages.

## Documentation
See the repository [wiki](https://drive.google.com/drive/folders/15WUivxM-EhF6RJQWcv_rD_IT9StVTMLD?usp=sharing).

[Reference for visualization data formats](https://github.com/condevcx3/Invest-Ed/blob/master/client/src/components/visualize/visDataFormats.js).

## Requirements
- NPM
- Node.js
- Git
- MySQL
- Redis

## Installation

[Get NPM](https://www.npmjs.com/get-npm). NPM is distributed with Node.js, so installing NPM will also install Node.js on your computer.

[Install MySQL server](https://www.mysqltutorial.org/install-mysql/). Includes installation guide and links for MySQL on Windows and macOS and Linux distributions.

Redis is an in-memory data store as a database cache used to store user sessions. [Windows Installer for Redis 3.2.100](https://github.com/microsoftarchive/redis/releases). This release includes:
- The redis-server.exe application that runs Redis as a service on your Windows computer.
- The redis-cli.exe to interact with Redis instances

[Installation of Redis on other Operating Systems](https://redis.io/)


## Local Development Setup

### Create the MySQL Databases

  1. Download the [SQL files](https://drive.google.com/drive/folders/1F94GavELVW6t3QTi_TZ1-gdbh-6WymjM?usp=sharing).
 
  2. Log on to the MySQL server via cmd or terminal, with the credentials set up during the installation of MySQL:
  
      ```mysql  -u yourUserName -p;```
  
  3. Enter password on subsequent prompt.
  4. Create a database and use it:
  
        ```
        mysql> create database yourDatabaseName;
        mysql> use yourDatabaseName;
        ```
    
  5. Import the SQL file into the database:
  
      ```mysql> source pathToYourSQLFile;```
      
  6. Repeat for each SQL file.

### Configure Node Packages Locally
- Node packages are not included in git, so they must be installed locally.
- Node packages for the Express backend app can be found in the root directory [package.json](https://github.com/condevcx3/Invest-Ed/blob/master/package.json) file, and can be installed by navigating to the root directory of the project in your terminal or cmd and executing npm install.
  - This will install all packages listed under ```dependencies``` (packages required for production) and all packages listed under ```devDependencies``` (packages required for local development).
			
- Similarly, node packages for the React.js client app can be found in the [package.json](https://github.com/condevcx3/Invest-Ed/blob/master/client/package.json) located within the /client directory and can be installed from that directory the same way.
	
### Setting Environment Variables
  1. Create an '.env' file in the project root directory
  2. Follow the template outlined in the [.env.example](https://github.com/condevcx3/Invest-Ed/blob/master/.env.example) file, and replace the placeholder values with the following:
		
      - Replace ```PORT``` with any available local port to run the Express app on.
			 
      - Replace ```DB_USERNAME``` with the username used to connect to your MySQL server configuration.
       
      - Replace `DB_PASSWORD` with the password used to connect to your MySQL server configuration.
   
      - Replace `DB_HOST_NAME` with the machine hosting the MySQL server (localhost).
			 
      - Replace `DB_ACCOUNTS` with the name of the database holding user accounts.
			 
      - Replace `DB_GIRLSED_MAIN` with the name of the database holding data for visualization.
			 
      - Replace `DB_GIRLSED_TEMP` with the name of the database holding change request data.
			
      
      
Set the baseURL in [axiosConfig.js](https://github.com/condevcx3/Invest-Ed/blob/master/client/src/axios/axiosConfig.js), by setting the address and port to route axios requests to the Express app endpoints.
			
			
## Running the Project Locally

To Run the Node.js Express backend app run ```npm run dev``` in cmd or terminal.
		
- Running this command will invoke nodemon, which is a tool that automatically restarts the node server when file changes are made during development. 
		
- Running this command will also preload dotenv, which will preload all environment variables.
		
		
		
To run the React.js client app run ```npm start``` in cmd or terminal. 
		
  - This will run the React.js app in development mode.
		
		
## Deployment

Manually change the port, database access keys, and database names via the [config.js](https://github.com/condevcx3/Invest-Ed/blob/master/config.js) file when deploying for production.

Manually set the baseURL in [axiosConfig.js](https://github.com/condevcx3/Invest-Ed/blob/master/client/src/axios/axiosConfig.js), by setting the address and port.


## Resources

[React docs](https://reactjs.org/docs/getting-started.html)

[Sequelize docs](https://sequelize.org/)
