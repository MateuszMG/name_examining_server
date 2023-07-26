## Name examining - server

# Before start

1. Create .env file
2. Copy everything from .env.example file to your new created .env file
3. Replace database uri

### Start project

1. Install dependencies ( enter 'yarn' command in your console )
2. Run server ( enter 'yarn start' command in your console )

# Docs http://localhost:4000/docs

# Metrics http://localhost:4000/metrics

## Available scripts

- "start": "ts-node-dev src/server.ts -e js,ts,json,ejs",
- "format": "prettier --write 'src/\*_/_.{ts,tsx,js,json}' --config ./.prettierrc",
- "release": "release-it",
- "prepare": "husky install"

### Other

- Node requirements: "^14.18.0 || ^16.14.0 || >=18.0.0".
