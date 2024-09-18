import { ethers } from 'ethers';

declare const window: Window &
    typeof globalThis & {
        ethereum: any;
    };

export const isMetaMaskInstalled = () => {
    if (window === undefined) return false;
    let { ethereum } = window;
    return Boolean(ethereum?.isMetaMask);
};

export const getAddress = async () => {
    let provider = new ethers.BrowserProvider(window.ethereum);
    if (!provider) return null;
    try {
        let accounts = await provider.listAccounts();
        return accounts.length > 0 ? accounts[0] : null;
    } catch {
        return null;
    }
};

export const isAddressValid = (address: string) => {
    return ethers.isAddress(address);
}

export const connectMetamask = async () => {
    if (!isMetaMaskInstalled()) return false;
    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        return true;
    } catch {
        return false;
    }
};
