# PixieJarsNFT-API

Created with the Graph Protocol

Deployed to https://thegraph.com/hosted-service/subgraph/brandonflorian/pixiejarsnftapi


Example

{
  tokens(first: 5) {
    id
    tokenID
    description
    image
    tokenURI
    ipfsURI
    name
    dna
    date
    background
    jar
    floor
    skin
    earrings
    faceAccessory
    outfit
    hair
    shoes
    eyes
    eyebrows
    lipstick
    jarTag
    companion
    sparkles
  }
  users(first: 5) {
    id
    tokens {
      id
    }
  }
}
