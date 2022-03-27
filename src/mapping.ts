import {
  Token as TokenContract,
  Transfer as TransferEvent
} from "../generated/Token/Token"
import {
  Token,
  User
} from "../generated/schema"

import {json, ipfs} from '@graphprotocol/graph-ts';

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

        if(image && name && description && dna && edition && date){
          token.image = image.toString();
          token.name = name.toString();
          token.description = name.toString();
          token.dna = dna.toString();
          token.edition = edition.toBigInt();
          token.date = date.toBigInt();
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
