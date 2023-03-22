import * as hre from "hardhat";
import * as fs from "fs";
import { Signer } from "ethers";
const ethers = hre.ethers;

import { BridgeBNBSide, BridgeBNBSide__factory } from "../typechain-types";

async function main() {
    //Loading accounts
    const accounts: Signer[] = await ethers.getSigners();
    const admin = await accounts[0].getAddress();
    //Loading contracts' factory

    const BridgeBNBSide: BridgeBNBSide__factory =
        await ethers.getContractFactory("BridgeBNBSide");

    // Deploy contracts
    console.log(
        "==================================================================",
    );
    console.log("DEPLOY CONTRACTS ON BNB SIDE");
    console.log(
        "==================================================================",
    );

    console.log("ACCOUNT: " + admin);

    const bridgeBNBSide: BridgeBNBSide = await BridgeBNBSide.deploy();

    console.log("bridgeBNBSide deployed at: ", bridgeBNBSide.address);

    const contractAddress = {
        bridgeBNBSide: bridgeBNBSide.address,
    };

    fs.writeFileSync("contractsBNB.json", JSON.stringify(contractAddress));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
