import * as hre from "hardhat";
import * as polygonContract from "../contractsPolygon.json";

async function main() {
    try {
        await hre.run("verify:verify", {
            address: polygonContract.bridgePolygonSide,
            constructorArguments: [polygonContract.wBNB],
            hre,
        });
    } catch (err) {
        console.log("err >>", err);
    }

    try {
        await hre.run("verify:verify", {
            address: polygonContract.wBNB,
            constructorArguments: [],
            hre,
        });
    } catch (err) {
        console.log("err >>", err);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
