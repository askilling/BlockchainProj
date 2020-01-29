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
                "internalType": "string",
                "name": "_fName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_lName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_major",
                "type": "string"
            }
        ],
        "name": "addCandidate",
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
            }
        ],
        "name": "apprVoters",
        "outputs": [
            {
                "internalType": "bool",
                "name": "allowVote",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "voted",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "_voter",
                "type": "address"
            }
        ],
        "name": "approverVoter",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "candidates",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "fName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "lName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "major",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "voteCount",
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
        "name": "candidatesCount",
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
        "name": "haveVoted",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "candidatesCount",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_ufName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_ulName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_umajor",
                "type": "string"
            }
        ],
        "name": "updateCandidate",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "voteAprover",
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
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_candidateId",
                "type": "uint256"
            }
        ],
        "name": "voteFor",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

//Contract address which is on the Ropsten Network
const contractaddress = '0xb62811dd541c04E514D9C428eAe18Fb789295D77';

let numOfCandidates = 2;
//This function is to create the supply of tokens which is only allowed by contract creator
function addCandidate() {
    try{
        //The variable that connects the abi to the contract address.
        let contract = web3.eth.contract(abi).at(contractaddress);

        //The variables that retrieve the values from the users.
        var fName = document.getElementById("fName").value;
        var lName = document.getElementById("lName").value;
        var major = document.getElementById("major").value;

        //Main part of the function. Calls the method from contract and supplies inputs.
        contract.addCandidate(fName, lName, major, {from: web3.eth.accounts[0]}, (error, txHash) => {
            //If there is no return value display error
            if(!txHash){
                window.alert("Oops! Something went wrong!");
            }
            //If there is a return value display success message.
            if(txHash){
                window.alert("You just added " + fName + " " + lName + " to candidates.");
                console.log(txHash);
                numOfCandidates++;
            }
        });
    }
    catch(err){
        window.alert(err);
    }
}

//This function is to create the supply of tokens which is only allowed by contract creator
function updateCandidate() {
    try{
        //The variable that connects the abi to the contract address.
        let contract = web3.eth.contract(abi).at(contractaddress);

        //The variables that retrieve the values from the users.
        var candidateID = document.getElementById("uCandID").value;
        var fName = document.getElementById("ufName").value;
        var lName = document.getElementById("ulName").value;
        var major = document.getElementById("umajor").value;

        //Main part of the function. Calls the method from contract and supplies inputs.
        contract.updateCandidate(candidateID, fName, lName, major, {from: web3.eth.accounts[0]}, (error, txHash) => {
            //If there is no return value display error
            if(!txHash){
                window.alert("Oops! Something went wrong!");
            }
            //If there is a return value display success message.
            if(txHash){
                window.alert("You just updated " + fName + " " + lName + " to the candidates.");
                console.log(txHash);
            }
        });
    }
    catch(err){
        window.alert(err);
    }
}

//This function is to transfer tokens from the default account to the specified account.
function approveVoter() {
    try{
        //The variable that connects the abi to the contract address.
        let contract = web3.eth.contract(abi).at(contractaddress);

        //The variables that retrieve the values from the users.
        let voterAddress = document.getElementById("voterReceiver").value;

        //Main part of the function. Calls the method from contract and supplies inputs.
        contract.approverVoter(voterAddress, (error, txHash) => {
            //If there is no return value display error
            if(!txHash){
                window.alert("Oops! Something went wrong!");
            }
            //If there is a return value display success message.
            if(txHash){
                window.alert("You approved " + voterAddress + " for voting!");
                console.log(txHash);
            }
        });
    }
    catch(err) {
        window.alert(err);
    }
}

//This function allows the user to transfer tokens from one specified account to another.
function voteFor() {
    try {
        //The variable that connects the abi to the contract address.
        let contract = web3.eth.contract(abi).at(contractaddress);

        //The variables that retrieve the values from the users.
        let candidateID = document.getElementById("candidateVoteID").value;

        //Main part of the function. Calls the method from contract and supplies inputs.
        contract.voteFor(candidateID, function (error, txHash){
            //If there is no return value display error
            if(!txHash){
                window.alert("Oops! Something went wrong!");
            }
            //If there is a return value display success message.
            if(txHash){
                window.alert("You voted for candiate number " + candidateID + "! \n Thank you for your vote!");
                console.log(txHash);
            }
        });
    }
    catch(err) {
        window.alert(err);
    }
}

//This function function retrieves the balance of the specified user.
function checkCandidates() {
    try {
        //The variable that connects the abi to the contract address.
        let contract = web3.eth.contract(abi).at(contractaddress);

        //The variables that retrieve the values from the users.
        let candidateID = document.getElementById("candidateID").value;

        contract.candidates(candidateID, function (err, candidate) {
            //If there is no return value display error
            if (!candidate) {
                window.alert("Oops! Something went wrong!");
            }
            //If there is a return value display success message.
            if (candidate) {
                var id = candidate[0];
                var fName = candidate[1];
                var lName = candidate[2];
                var major = candidate[3];
                var votes = candidate[4];
                 window.alert(fName + " " + lName + " has " + votes + " votes!");
            }
        });
    }
    catch(err) {
        window.alert(err);
    }
}

//This function function retrieves the balance of the specified user.
function showCandidates() {
    try {
        //The variable that connects the abi to the contract address.
        let contract = web3.eth.contract(abi).at(contractaddress);

        //The variables that retrieve the values from the users.
        document.getElementById('candidateHead').innerHTML = '<tr><th>Name: </th><th>Candidate Id: </th><th>Number of Votes: </th></tr>';
        let idVal = 1;
        var candidatesResults = document.getElementById('candidateHead');
        for(var i = 0; i <= numOfCandidates; i++){
            contract.candidates(idVal, function (err, candidate) {
            //If there is a return value display success message.
            if (candidate) {
                var id = candidate[0];
                var fName = candidate[1];
                var lName = candidate[2];
                var votes = candidate[4];

                $(candidatesResults).append('<tr><td>' + fName + ' ' + lName + '</td><td>' + id + '</td><td>' + votes + '</td></tr>');
                }
            });
            idVal++;
        }
    }
    catch(err) {
        window.alert(err);
    }
}

//This function function retrieves the balance of the specified user.
function apprVoters() {
    try {
        //The variable that connects the abi to the contract address.
        let contract = web3.eth.contract(abi).at(contractaddress);

        let addressAppr = document.getElementById("addressApproval").value;

        //Main part of the function. Calls the method from contract and supplies inputs.
        contract.apprVoters(addressAppr, function (err, approval) {
            //If there is no return value display error
            if (!approval) {
                window.alert("Oops! Something went wrong!");
            }
            //If there is a return value display success message.
            if (approval) {
                let ableVote = approval[0];
                let hasVoted = approval[1];
                window.alert(" Allowed to vote: " + ableVote + "!\n" + "Has voted: " + hasVoted + "!" );
            }
        });
    }
    catch(err) {
        window.alert(err);
    }
}

function getInformation() {
    window.alert(" Name: CSU-Pueblo Token \n Symbol: WolfieToken \n Version: Token v1.0");
}
