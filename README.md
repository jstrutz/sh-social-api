# SH Social API Exercise

## Running it

```
git clone https://github.com/jstrutz/sh-social-api.git
cd sh-social-api
npm i
echo "CLEARBIT_API_KEY=xxxxxx" > .env
npm run dev
```

Runs by default at [http://localhost:8000](http://localhost:8000)

## Routes

#### Searching for a user - `GET /profiles`

With a single query-string `email` argument

Example: [http://localhost:8000/profiles?email=rahul@superhuman.com](http://localhost:8000/profiles?email=rahul@superhuman.com)

#### Fetch view counts - `GET /views`

Example: [http://localhost:8000/views](http://localhost:8000/views)
