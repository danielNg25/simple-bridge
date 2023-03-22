import * as hre from "hardhat";
import * as bnbContract from "../contractsBNB.json";

async function main() {
    try {
        await hre.run("verify:verify", {
            address: bnbContract.bridgeBNBSide,
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
