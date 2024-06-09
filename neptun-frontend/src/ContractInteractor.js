import { ethers } from "ethers";
import { abi } from "./abi";

const contractAddress = "0x208F061f0b321B74e4D71549C50283C70eb56B0b"; // Replace with your actual contract address

export async function fetchBalance(provider, address) {
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const balance = await contract.balanceOf(address);
    return balance.toString();
}

export async function transferTokens(provider, signer, to, amount) {
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const tx = await contract.transfer(to, amount);
    await tx.wait();
    return tx;
}

export async function stakeTokens(provider, signer, amount) {
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const tx = await contract.stake(amount);
    await tx.wait();
    return tx;
}

