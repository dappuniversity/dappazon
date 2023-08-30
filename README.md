# Dappazon

## Technology Stack & Tools

- Solidity (Writing Smart Contracts & Tests)
- Javascript (React & Testing)
- [Hardhat](https://hardhat.org/) (Development Framework)
- [Ethers.js](https://docs.ethers.io/v5/) (Blockchain Interaction)
- [React.js](https://reactjs.org/) (Frontend Framework)

## Requirements For Initial Setup
- Install [NodeJS](https://nodejs.org/en/)

## Setting Up

### 1. Clone/Download the Repository

### 2. Install Dependencies:
`$ yarn install`


### 3. Run tests
`$ yarn test`

### 4. Start Hardhat node
`$ npx hardhat node`

### 5. Run deployment script
In a separate terminal execute:
`$ npx hardhat run ./scripts/deploy.js --network localhost`

### 6. Start frontend
`$ npm run start`

### 7. Conecte sua Metamask na sua rede local

Conecte-se à Rede Local:

No canto superior direito da MetaMask, clique no menu suspenso que mostra a rede atual (por exemplo, "Main Ethereum Network").

Selecione "Custom RPC" ou "Rede Local" (dependendo da sua versão da MetaMask).

Insira as seguintes informações:
* Network Name: Hardhat (ou qualquer nome que você preferir)
* New RPC URL: http://127.0.0.1:8545 (este é o padrão para o Hardhat node)
* Chain ID: 31337 (este é o padrão para o Hardhat node)

Clique em "Save" ou "Salvar".

## 8

npx hardhat console --network localhost

## Jornadas de usuário

Jornada inicial, usuário não cadastrado

* 

```mermaid
graph TD
    A[Home] --> B[Escolher o produto]
    B --> C[Cadastro de usuário]
    C1[Metamask]
    C2[E-mail]
    C3[Rede Social]
    C --> C1
    C --> C2
    C --> C3
    C --> D[Cadastro de meio de pagamento]
    D1[Pix]
    D2[Cartão]
    D3[Bitcoin]
    D4[Cash Back]
    D5[Boleto]
    D --> D1
    D --> D2
    D --> D3
    D --> D4
    D --> D5
    D --> E[Cadastro endereço entrega]
    E --> F[Revisar carrinho]
    F1[Pagamento]
    F2[Endereço de entrega]
    F3[Meio de pagamento]
    F --> F1
    F --> F2
    F --> F3
    F --> G[Sucesso pagamento aprovado]
    F --> H[Erro no pagamento]
```