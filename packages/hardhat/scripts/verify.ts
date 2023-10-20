import { run } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const contractAddress = "";
  const contractPathName = "contracts/BTN.sol:BTN";

  const owner = process.env.ALCHEMY_API_KEY;

  await run("verify:verify", {
    address: contractAddress,
    contract: contractPathName,
    constructorArguments: [owner],
  });
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
