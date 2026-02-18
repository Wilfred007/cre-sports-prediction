import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { abi } from "./abi";

export const client = createThirdwebClient({
    clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
});

export const NETWORK = defineChain(11155111);
export const CONTRACT_ADDRESS = "0x8E33E3d7210FE64Add5e13aA9E84032f6756D65d";

export const contract = getContract({
    client: client,
    chain: NETWORK,
    address: CONTRACT_ADDRESS,
    abi: abi,
});
