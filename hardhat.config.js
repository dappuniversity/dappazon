require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      // Configurações específicas para a rede local Hardhat, se necessário
      // Por exemplo, você pode definir o número inicial de blocos, o preço do gas, etc.
      // chainId: 1337
    },
  }
};
