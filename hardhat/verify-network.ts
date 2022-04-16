import { run } from 'hardhat';

const verify = async (contractAddress: string, args: any[]) => {
    try {
        console.log("verifying contract...");
        await run("verify:verify", {
            address: contractAddress,
            constructor: args,
        })
    } catch (e: any) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified");
        } else {
            console.log("ERROR: ", e);
        }
    }
}

export default verify;