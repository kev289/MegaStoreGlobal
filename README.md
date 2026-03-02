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

## STRUCTURE PROJECT
```
   /PRUEBADESEMPENO
   ├── config/
   │   ├── db.js         # Connection configuration for MySQL and MongoDB
   │   └── multer.js     # File upload configuration 
   ├── models/
   │   └── history.js    # Schema MongoDB
   ├── public/
   │   |__ index.html    
   |   |__ Style.css    
   |   |__ script.js
   |
   ├── uploads/          
   ├── index.js          # Main Node.js server file
   ├── package.json      # Dependencies and scripts
   ├── database.sql      # MySQL table creation script
   ├── AM-prueba-desempeno.csv 
   └── README.md         # Project documentation`
```

## CRUD 

1. See all Clients

```PostMan
   GET http://localhost:3000/api/clients/ 
```

2. Search the client with the ID in value put the customer_id

```PostMan
   GET http://localhost:3000/api/clients/:id
```

3. Create a new Client 

```PostMan
   POST http://localhost:3000/api/clients/
```

4. Update a Client with ID

```PostMan
   PUT http://localhost:3000/api/clients/:id
```

5. Delete a client with ID

```PostMan
   DELETE http://localhost:3000/api/clients/:id
```
