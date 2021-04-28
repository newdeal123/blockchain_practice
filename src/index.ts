import * as CryptoJS from "crypto-js";

class Block{
    public index:number;
    public hash:string;
    public previousHash:string;
    public data:string;
    public timestamp:number;

    static calculateBlockhash = (
        index:number, 
        previousHash:string, 
        timestamp:number, 
        data:string
        ) :string => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

    static validateStructure = (aBlock : Block) : boolean =>
     typeof aBlock.index === "number" && typeof aBlock.hash === "string" && typeof aBlock.previousHash === "string";
    
    
    constructor (index:number,hash:string,previousHash:string,data:string,timestamp:number){
        this.index=index;
        this.hash=hash;
        this.previousHash=previousHash;
        this.data=data;
        this.timestamp=timestamp;
    }
}

const genesisBlock: Block = new Block(0, "2020202020202", "", "Hello", 123456);

let blockchain: Block[] = [genesisBlock];
const getBlockchain = () : Block[] => blockchain;
const getLatesBlock = () : Block => blockchain[blockchain.length-1];
const getNewTimeStamp = () : number => Math.round(new Date().getDate() / 1000);

const addBlock = (candidateBlock : Block) : void => {
    if(isBlockValid(candidateBlock,getLatesBlock())){
        blockchain.push(candidateBlock);
    }
}
const createNewBlock=(data:string) : Block =>{
    const previousBlock: Block = getLatesBlock();
    const newIndex: number = previousBlock.index + 1;
    const newTimeStamp : number = getNewTimeStamp();
    const newHash : string = Block.calculateBlockhash(newIndex,previousBlock.hash,newTimeStamp,data);
    const newBlock : Block = new Block(newIndex,newHash,previousBlock.hash,data,newTimeStamp);
    addBlock(newBlock);
    return newBlock;
}

const getHashforBlock = (aBlock : Block) : string => 
    Block.calculateBlockhash(aBlock.index,aBlock.previousHash,aBlock.timestamp,aBlock.data);

const isBlockValid = (candidateBlock : Block, previousBlock : Block) : boolean =>{
    if(!Block.validateStructure(candidateBlock))return false;
    if(previousBlock.index+1 !== candidateBlock.index)return false;
    if(previousBlock.hash !== candidateBlock.previousHash)return false;
    if(getHashforBlock(candidateBlock) !== candidateBlock.hash)return false;
    return true;
}

createNewBlock("second Block");
createNewBlock("third Block");
createNewBlock("fourth Block");

console.log(blockchain);

export {}; 