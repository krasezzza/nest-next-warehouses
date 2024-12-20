# nest-next-warehouses
Demo app for managing warehouses' stocks demonstrating fullstack implemented app

First, go to ./backend directory
```
cd backend
yarn install
cp example.env .env.dev
```

Populate .env.dev with the following values:
```
NODE_ENV=development
DB_TYPE=postgres
DB_HOST=database
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=postgres
```

When ready, start docker:
```
docker compose build
docker compose up -d
```

In case, there are no errors in the Docker console, load the Postman collection 
```
nest-next-warehouses-api.postman_collection.json
```
in a Postman client and open the request "Load Warehouses" and then execute it.
That should populate the database with needed data.

Then switch to ./frontend directory
```
cd frontend
yarn install
cp example.env .env
```

Populate .env with the following values:
```
NEXT_PUBLIC_API_URL="http://localhost:5001"
```

Then run the command:
```
yarn dev
```
