import {
  PauseCall,
  Token as TokenContract,
  Transfer as TransferEvent
} from "../generated/Token/Token"
import {
  Token,
  User
} from "../generated/schema"

import {json, ipfs, JSONValue} from '@graphprotocol/graph-ts';

const ipfshash = "QmWYzPGcmo5iTdmaqp7mitAaxWa9Rq6tGucqYkPjFvdpQm";

export function handleTransfer(event: TransferEvent): void {
  let token = Token.load(event.params.tokenId.toString());

  if(!token){
    token = new Token(event.params.tokenId.toString());
    token.tokenID = event.params.tokenId;
    token.tokenURI = "/" + event.params.tokenId.toString() + ".json";

    let metadata = ipfs.cat(ipfshash + token.tokenURI);

    if(metadata){
      const value = json.fromBytes(metadata).toObject();
      if(value){
        const image = value.get('image');
        const name = value.get('name');
        const description = value.get('description');
        const dna = value.get('dna');
        const edition = value.get('edition');
        const date = value.get('date');
        const attributes = value.get('attributes');
        if(image && name && description && dna && edition && date && attributes){
          token.image = image.toString();
          token.name = name.toString();
          token.description = description.toString();
          token.dna = dna.toString();
          token.edition = edition.toBigInt();
          token.date = date.toBigInt();
          token.ipfsURI = 'ipfs.io/ipfs/' + ipfshash + token.tokenURI;
          
          let attributeData: JSONValue[];
          attributeData = attributes.toArray();

          for(let i = 0; i < attributeData.length; i++){
            let item = attributeData[i].toObject();
            //get trait
            let trait:string = '';
            let trait_type = item.get('trait_type');
            if(trait_type){
              trait = trait_type.toString();
            }
            //get value
            let value:string = '';
            let attributeValue = item.get('value');
            if(attributeValue){
              value = attributeValue.toString();
            }
            if(trait !== '' && value !== ''){
                //determine trait type
              if (trait == "Background") {
                token.background = value
              }
              if (trait == "Jar") {
                token.jar = value
              }
              if (trait == "Floor") {
                token.floor = value
              }
              if (trait == "Skin") {
                token.skin = value
              }
              if (trait == "Earrings") {
                token.earrings = value
              }
              if (trait == "Face Acc") {
                token.faceAccessory = value
              }   
              if (trait == "Outfit") {
                token.outfit = value
              }
              if (trait == "Hair") {
                token.hair = value
              }
              if (trait == "Shoes") {
                token.shoes = value
              }
              if (trait == "Eyes") {
                token.eyes = value
              }
              if (trait == "Eyebrows") {
                token.eyebrows = value
              }
              if (trait == "Lipstick") {
                token.lipstick = value
              }
              if (trait == "Jar Tag") {
                token.jarTag = value
              }
              if (trait == "Companion") {
                token.companion = value
              }
              if (trait == "Sparkles") {
                token.sparkles = value
              }
            }
          }
        } 
      }
    }
  }

  token.updatedAtTimeStamp = event.block.timestamp;
  token.owner = event.params.to.toHexString();
  token.save();
 
  let user = User.load(event.params.to.toHexString());
  if (!user) {
    user = new User(event.params.to.toHexString());
    user.save();
  }
}
