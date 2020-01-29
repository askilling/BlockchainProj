//This function connects web3 to the Ropsten Infura node and without it the user will be notified
window.onload = function () {

    const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/f71e6287d414475b8dd8063b0d08c096"));

    if (typeof web3 === 'undefined') {
        document.getElementById('metamask').innerHTML = 'No web3 detected, so need <a href="https://metamask.io/">MetaMask</a> browser plugin to run this example';
    }
}
//This is the ABI from the contract.
let abi =
[
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "receiver",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "mintSimpleCoin",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "receiver",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amountsent",
                "type": "uint256"
            }
        ],
        "name": "sendCoin",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amountjustsent",
                "type": "uint256"
            }
        ],
        "name": "SentEvent",
        "type": "event"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "balances",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "minter",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];

//Contract address which is on the Ropsten Network
const contractaddress = '0x90a6E9CF70e0E8aCae4F181EB0e8291F1040cADD';

//This function is to create the supply of tokens which is only allowed by contract creator
function mintSimpleCoin() {
    try{
        //The variable that connects the abi to the contract address.
        let contract = web3.eth.contract(abi).at(contractaddress);

        //The variables that retrieve the values from the users.
        var coinReceiver = document.getElementById("coinReceiverMinted").value;
        var coinMinted = document.getElementById("coinMinted").value;

        //Main part of the function. Calls the method from contract and supplies inputs.
        contract.mintSimpleCoin(coinReceiver, coinMinted, {from: web3.eth.accounts[0]}, (error, txHash) => {
            //If there is no return value display error
            if(!txHash){
                window.alert("Oops! Something went wrong!");
            }
            //If there is a return value display success message.
            if(txHash){
                window.alert("You just minted " + coinMinted + " coin(s) for " + coinReceiver + " account!");
            }
        });
    }
    catch(err){
        window.alert(err);
    }
}

//This function is to create the supply of tokens which is only allowed by contract creator
function sendCoin() {
    try{
        //The variable that connects the abi to the contract address.
        let contract = web3.eth.contract(abi).at(contractaddress);

        //The variables that retrieve the values from the users.
        var addressReceiver = document.getElementById("addressReceiver").value;
        var sendCoinAmount = document.getElementById("sendCoinAmount").value;

        //Main part of the function. Calls the method from contract and supplies inputs.
        contract.sendCoin(addressReceiver, sendCoinAmount, {from: web3.eth.accounts[0]}, (error, txHash) => {
            //If there is no return value display error
            if(!txHash){
                window.alert("Oops! Something went wrong!");
            }
            //If there is a return value display success message.
            if(txHash){
                window.alert("You just sent " + sendCoinAmount + " to " + addressReceiver + "'s account!");
            }
        });
    }
    catch(err){
        window.alert(err);
    }
}

//This function is to transfer tokens from the default account to the specified account.
function balances() {
    try{
        //The variable that connects the abi to the contract address.
        let contract = web3.eth.contract(abi).at(contractaddress);

        //The variables that retrieve the values from the users.
        let balanceAddress = document.getElementById("balanceAddress").value;

        //Main part of the function. Calls the method from contract and supplies inputs.
        contract.balances(balanceAddress, function (error, txHash) {
            //If there is no return value display error
            if(!txHash){
                window.alert("Oops! Something went wrong!");
            }
            //If there is a return value display success message.
            if(txHash){
                window.alert("Your balance for " + balanceAddress + " is " + txHash + " coin(s)!");
            }
        });
    }
    catch(err) {
        window.alert(err);
    }
}

//This function allows the user to transfer tokens from one specified account to another.
function minter() {
    try {
        //The variable that connects the abi to the contract address.
        let contract = web3.eth.contract(abi).at(contractaddress);

        //Main part of the function. Calls the method from contract and supplies inputs.
        contract.minter(function (error, txHash){
            //If there is no return value display error
            if(!txHash){
                window.alert("Oops! Something went wrong!");
            }
            //If there is a return value display success message.
            if(txHash){
                window.alert("The minter of the coins is " + txHash + "! \n Thank you for your interest!");
            }
        });
    }
    catch(err) {
        window.alert(err);
    }
}
