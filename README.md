# Hello and welcome to my Performance Test, My name is Kevin Uribe.

## Technologies

### Frontend

-- I use HTML, CSS and JavaScript. --

### Backend 

-- For the backend I used nodejs with express and I used MySQL and MongoDB with polyglot principles --

## Use the proyect

1. **Clone the repository**
   ```bash
   git clone <repo-url> && MegaStoreGlobal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure databases**
   - Adjust MySQL credentials and MongoDB URI in `config/db.js`.
   - Run `database.sql` on your MySQL server to create the necessary tables.
   - Upload it with this command or copy everything inside the database.sql file
   ```Bash
   mysql -u root -p <database.sql
   ```
   -Connect with the MongoURI In MongoAtlas or Compass
   

4. **Start the server**
   ```bash
   npm run dev
   ```
   The server will be running at `http://localhost:3000` (or another configured port).

 ## Aditional Notes 

- Use multer and CSV-parser For upload the files CSV 

- With a single button, it performs a mass population update to the database.

- MongoDB stores records of purchases made by users

- MySQL stores all user data