// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat")
const { items } = require("../src/items.json")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}
 
const sendTokens = async () => {
  // Definindo as contas
  const senderAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
  const recipientAddress = "0x17eDfB8a794ec4f13190401EF7aF1c17f3cc90c5";

  // Obtendo o signer para a conta do remetente
  const sender = await ethers.provider.getSigner(senderAddress);

  // Definindo a quantidade a ser enviada (por exemplo, 1 ETH)
  const amount = ethers.utils.parseEther("1"); // Altere "1" para a quantidade desejada

  // Enviando os tokens
  const tx = await sender.sendTransaction({
      to: recipientAddress,
      value: amount
  });

  console.log(`Transaction hash: ${tx.hash}`);

  await tx.wait(); // Aguardando a transação ser confirmada

  console.log(`Tokens enviados com sucesso para ${recipientAddress}!`);
}

async function main() {
  // Setup accounts
  const [deployer] = await ethers.getSigners()

  // Deploy Dappazon
  const Dappazon = await hre.ethers.getContractFactory("Dappazon")
  const dappazon = await Dappazon.deploy()
  await dappazon.deployed()

  console.log(`Deployed Dappazon Contract at: ${dappazon.address}\n`)

  // Listing items...
  for (let i = 0; i < items.length; i++) {
    const transaction = await dappazon.connect(deployer).list(
      items[i].id,
      items[i].name,
      items[i].category,
      items[i].image,
      tokens(items[i].price),
      items[i].rating,
      items[i].stock,
    )

    await transaction.wait();

    console.log(`Listed item ${items[i].id}: ${items[i].name}`);

    await sendTokens();
  }


}



// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
