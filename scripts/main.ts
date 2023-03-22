import { BigNumber, ethers, providers } from "ethers";
import {
    BridgePolygonSide,
    BridgePolygonSide__factory,
    BridgeBNBSide,
    BridgeBNBSide__factory,
} from "../typechain-types";
import * as dotenv from "dotenv";
import * as polygonContract from "../contractsPolygon.json";
import * as bnbContract from "../contractsBNB.json";
import { formatEther } from "ethers/lib/utils";

dotenv.config();
async function main() {
    const bnbProvider = new providers.JsonRpcProvider(
        "https://data-seed-prebsc-1-s1.binance.org:8545/`",
    );

    const bnbSigner = new ethers.Wallet(
        `${process.env.PRIVATE_KEY}`,
        bnbProvider,
    );

    const polygonProvider = new providers.JsonRpcProvider(
        "https://matic-mumbai.chainstacklabs.com/",
    );

    const BridgeBNBSide: BridgeBNBSide__factory = new BridgeBNBSide__factory(
        bnbSigner,
    );

    const bnbSideBridge: BridgeBNBSide = BridgeBNBSide.attach(
        bnbContract.bridgeBNBSide,
    );

    const polygonSigner = new ethers.Wallet(
        `${process.env.PRIVATE_KEY}`,
        polygonProvider,
    );
    const BridgePolygonSide: BridgePolygonSide__factory =
        new BridgePolygonSide__factory(polygonSigner);

    const polygonSideBridge: BridgePolygonSide = BridgePolygonSide.attach(
        polygonContract.bridgePolygonSide,
    );
    console.log("Listening to Locked event on BNB side");
    bnbSideBridge.on("Locked", async (user, amount) => {
        const amountBNB = (amount as BigNumber).toString();
        console.log(
            user,
            "has requested to bridge",
            formatEther((amount as BigNumber).toString()),
            "BNB",
        );

        try {
            await polygonSideBridge.mint(amountBNB, user);
            console.log(
                "Unlocked",
                formatEther((amount as BigNumber).toString()),
                "Wrapped BNB to",
                user,
            );
        } catch (e) {
            console.log("Error in minting", e);
        }
    });
}

main();
