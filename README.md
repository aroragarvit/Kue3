# Starting the project

### Staring a local chain

```yarn hardhat node```

### Deploying the smart contract

```yarn hardhat run ./src/hardhat/scripts/deploy.js --network localhost```

### Updating .env

Add the smart contract address into .env by
```NEXT_PUBLIC_CONTRACT_ADDRESS=<Address of contract>```

### Starting Next Server

```yarn dev```

### Running the Application

Go to ```https://localhost:3000```