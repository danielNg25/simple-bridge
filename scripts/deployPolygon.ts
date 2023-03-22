import * as hre from "hardhat";
import * as fs from "fs";
import { Signer } from "ethers";
const ethers = hre.ethers;

import {
    TestWrappedBNB__factory,
    TestWrappedBNB,
    BridgePolygonSide,
    BridgePolygonSide__factory,
} from "../typechain-types";

async function main() {
    //Loading accounts
    const accounts: Signer[] = await ethers.getSigners();
    const admin = await accounts[0].getAddress();
    //Loading contracts' factory

    const WBNB: TestWrappedBNB__factory = await ethers.getContractFactory(
        "TestWrappedBNB",
    );

    const BridgePolygonSide: BridgePolygonSide__factory =
        await ethers.getContractFactory("BridgePolygonSide");

    // Deploy contracts
    console.log(
        "==================================================================",
    );
    console.log("DEPLOY CONTRACTS ON POLYGON SIDE");
    console.log(
        "==================================================================",
    );

    console.log("ACCOUNT: " + admin);

    const wBNB: TestWrappedBNB = await WBNB.deploy();

    console.log("wBNB deployed at: ", wBNB.address);

    const bridgePolygonSide: BridgePolygonSide = await BridgePolygonSide.deploy(
        wBNB.address,
    );

    await wBNB.transferOwnership(bridgePolygonSide.address);

    console.log("bridgePolygonSide deployed at: ", bridgePolygonSide.address);

    const contractAddress = {
        wBNB: wBNB.address,
        bridgePolygonSide: bridgePolygonSide.address,
    };

    fs.writeFileSync("contractsPolygon.json", JSON.stringify(contractAddress));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
