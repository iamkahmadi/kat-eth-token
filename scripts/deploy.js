const { ethers } = require("hardhat");

async function main() {
    // Get the deployer's address
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Define the token's initial supply (e.g., 1000 tokens, in wei).
    const initialSupply = ethers.parseUnits("1000", 18);  // 1000 tokens with 18 decimals
    console.log("Initial supply (in wei):", initialSupply.toString());

    // Deploy the ERC-20 contract
    const Token = await ethers.getContractFactory("KATToken");
    const token = await Token.deploy(initialSupply);

    // Wait for the deployment transaction to be mined
    await token.waitForDeployment();
    const myContractDeployedAddress = await token.getAddress();
    console.log("Contract deployed to: ", myContractDeployedAddress);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });


