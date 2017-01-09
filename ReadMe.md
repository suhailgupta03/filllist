# Filllist
 - Developed and tested on NodeJS version v4.4.4

Steps to run:
- Clone the repository using git clone https://github.com/suhailgupta03/filllist.git
- Import the database schema from a file named **schemadump.sql** under _/filllist/_
- Please note that importing the dump will automatically create the required database, table, stored procedures
- Update the username and password to connect to MySQL in **MPipe.js** under _/filllist/lib/db_ directory.
- After the database has been configured run index.js in the root directory
- This will start the HTTP Server, create a connection to MySQL and import the relevant data from the file named filllist into the database. (Please note that data-import operation is a sync operation)
- The HTTP server by default starts at the port numbered 8081, which could be directly configured inside index.js. Open the browser and hit http://IP:8081/
- This shall get the default view of the filllist

# API EndPoints
 - ```GET /instrument/:id``` : Show the current status of the instrument, returns 404 if instrument not found / invalid ID. ALso has a default view
 - ```GET /``` : Shows the current status of all the instruments stored in DB
 - ```GET /showAll``` : Shows the current status of all the instruments stored in DB. All this information is refreshed every 5 seconds

>There also exists a view where a user can enter a line (ex. one of the lines from fillist file) and submit. Every time data is received, the server parses the line and stores the position and status for each instrument in a database.