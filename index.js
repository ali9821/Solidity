var Web3 = require("web3");
const web3 = new Web3("https://polygon-rpc.com");
const NumBetABI = require("./NumbetABI.json");

const fetch = require("node-fetch");

const NUMBET_ADDRESS = "0xf5cbdc38c5c5f5d157f509300ea672ea0c32f2f9";
const numBet = new web3.eth.Contract(NumBetABI, NUMBET_ADDRESS);
const privateKey =
  "ed34ad16596a17f97de80646c2a6a6c3d6caa55fb24a15373f945ebefeafc179";


  const typesArray = [
    {type: 'string', name: 'messanger'}
];


async function set() {
  const account = web3.eth.accounts.privateKeyToAccount(privateKey).address;
  const transaction = numBet.methods.setAndget(4);

  // fetch("https://gasstation-mainnet.matic.network/v2")
  //   .then((response) => response.json())
  //   .then((JSON) => console.log(JSON));

  const options = {
    to: transaction._parent._address,
    data: transaction.encodeABI(),
    gas: await transaction.estimateGas({ from: account }),
    gasPrice: 80000000000,
  };
  const signed = await web3.eth.accounts.signTransaction(options, privateKey);
  const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);

  let data = receipt.logs[0].data;

  const decodedParameters = web3.eth.abi.decodeParameters(typesArray,data );

  const ms = decodedParameters[0]
 console.log(ms)

}

set();
