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
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "_spender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_numTokens",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "_spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_numTokens",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "_receiver",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_numTokens",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "_sender",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "_receiver",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_numTokens",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "_sender",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_receiver",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_numTokens",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_initialSupply",
                "type": "uint256"
            }
        ],
        "name": "wolfieToken",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "allowance",
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
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "balanceOf",
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
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
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
        "name": "version",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];

//Contract address which is on the Ropsten Network
const contractaddress = '0x6986f82FC31B86Fe696486Bb4efA0Fe7B04131B4';

//This function is to create the supply of tokens which is only allowed by contract creator
function mintWolfieToken() {
    try{
        //The variable that connects the abi to the contract address.
        let contract = web3.eth.contract(abi).at(contractaddress);

        //The variables that retrieve the values from the users.
        var totalSupply = document.getElementById("mintNumOfTokens").value;

        //Main part of the function. Calls the method from contract and supplies inputs.
        contract.wolfieToken(totalSupply, {from: web3.eth.accounts[0]}, (error, txHash) => {
            //If there is no return value display error
            if(!txHash){
                window.alert("Oops! Something went wrong!");
            }
            //If there is a return value display success message.
            if(txHash){
                window.alert("You just created " + totalSupply + " for circulation.");
                console.log(txHash);
            }
        });
    }
    catch(err){
        window.alert(err);
    }
}

//This function is to transfer tokens from the default account to the specified account.
function transferToken() {
    try{
        //The variable that connects the abi to the contract address.
        let contract = web3.eth.contract(abi).at(contractaddress);

        //The variables that retrieve the values from the users.
        let receiverAddress = document.getElementById("addressReceiver").value;
        let sendNumOfTokens = document.getElementById("sendNumOfTokens").value;

        //Main part of the function. Calls the method from contract and supplies inputs.
        contract.transfer(receiverAddress, sendNumOfTokens, (error, txHash) => {
            //If there is no return value display error
            if(!txHash){
                window.alert("Oops! Something went wrong!");
            }
            //If there is a return value display success message.
            if(txHash){
                window.alert("You transfered " + sendNumOfTokens + " Wolfie Token(s) to " + receiverAddress + "!");
                console.log(txHash);
            }
        });
    }
    catch(err) {
        window.alert(err);
    }
}

//This function is to transfer tokens from the default account to the specified account.
function approveTokenTransfer() {
    try{
        //The variable that connects the abi to the contract address.
        let contract = web3.eth.contract(abi).at(contractaddress);

        //The variables that retrieve the values from the users.
        let approvalAddress = document.getElementById("addressApproval").value;
        let approvalNumOfTokens = document.getElementById("approvalNumOfTokens").value;

        //Main part of the function. Calls the method from contract and supplies inputs.
        contract.approve(approvalAddress, approvalNumOfTokens, (error, txHash) => {
            //If there is no return value display error
            if(!txHash){
                window.alert("Oops! Something went wrong!");
            }
            //If there is a return value display success message.
            if(txHash){
                window.alert("You increased allowance to " + approvalNumOfTokens + " of Wolfie Token(s) for " + approvalAddress + " contract!");
                console.log(txHash);
            }
        });
    }
    catch(err) {
        window.alert(err);
    }
}

//This function allows the user to transfer tokens from one specified account to another.
function transferFromTokens() {
    try {
        //The variable that connects the abi to the contract address.
        let contract = web3.eth.contract(abi).at(contractaddress);

        //The variables that retrieve the values from the users.
        let senderAddress = document.getElementById("addressTransferSender").value;
        let receiverAddress = document.getElementById("addressTransferReceiver").value;
        let sendNumOfTokens = document.getElementById("transferNumOfTokens").value;

        //Main part of the function. Calls the method from contract and supplies inputs.
        contract.transferFrom(senderAddress, receiverAddress, sendNumOfTokens, {gasPrice: 21000000}, (error, txHash) => {
            //If there is no return value display error
            if(!txHash){
                window.alert("Oops! Something went wrong!");
            }
            //If there is a return value display success message.
            if(txHash){
                window.alert("You transfered " + sendNumOfTokens + " Wolfie Token(s) from " + senderAddress + " to " + receiverAddress + "!");
                console.log(txHash);
            }
        });
    }
    catch(err) {
        window.alert(err);
    }
}

//This function allows the user to transfer tokens from one specified account to another.
function checkAllowances() {
    try {
        //The variable that connects the abi to the contract address.
        let contract = web3.eth.contract(abi).at(contractaddress);

        //The variables that retrieve the values from the users.
        let senderAddress = document.getElementById("addressAllowSender").value;
        let receiverAddress = document.getElementById("addressAllowReceiver").value;

        //Main part of the function. Calls the method from contract and supplies inputs.
        contract.allowance(senderAddress, receiverAddress, (error, txHash) => {
            //If there is no return value display error
            if(!txHash){
                window.alert("Oops! Something went wrong!");
            }
            //If there is a return value display success message.
            if(txHash){
                window.alert("You're allowed to send " + txHash + " Wolfie Token(s) from " + senderAddress + " to " + receiverAddress + "!");
                console.log(txHash);
            }
        });
    }
    catch(err) {
        window.alert(err);
    }
}

//This function function retrieves the balance of the specified user.
function getBalance() {
    try {
        //The variable that connects the abi to the contract address.
        let contract = web3.eth.contract(abi).at(contractaddress);

        //The variables that retrieve the values from the users.
        let studentID = document.getElementById("balanceAddress").value;

        //Main part of the function. Calls the method from contract and supplies inputs.
        contract.balanceOf(studentID, function (err, balance) {
            //If there is no return value display error
            if (!balance) {
                window.alert("Oops! Something went wrong!");
            }
            //If there is a return value display success message.
            if (balance) {
                 window.alert("Your balance is: " + balance + "!");
            }
        });
    }
    catch(err) {
        window.alert(err);
    }
}
//This function function retrieves the balance of the specified user.
function getTotalSupply() {
    try {
        //The variable that connects the abi to the contract address.
        let contract = web3.eth.contract(abi).at(contractaddress);

        //Main part of the function. Calls the method from contract and supplies inputs.
        contract.totalSupply(function (err, balance) {
            //If there is no return value display error
            if (!balance) {
                window.alert("Oops! Something went wrong!");
            }
            //If there is a return value display success message.
            if (balance) {
                 window.alert("The total supply circulation is: " + balance + "!");
            }
        });
    }
    catch(err) {
        window.alert(err);
    }
}

function getInformation() {
    window.alert(" Name: CSU-Pueblo Token \n Symbol: WolfieToken \n Version: Token v1.0")
}
