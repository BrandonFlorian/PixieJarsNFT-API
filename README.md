# PixieJarsNFT-API

Created with the Graph Protocol

This is a subgraph that enables the indexing and querying of data from the PixieJarsNFT collection / smart contracts using [The Graph](https://thegraph.com/)

You can perform relational queries, full text search, sorting, and filtering using this API.

### Using the subgraph

The subgraph was previously located in the Graph Explorer at [https://thegraph.com/hosted-service/subgraph/brandonflorian/pixiejarsnftapi](https://thegraph.com/hosted-service/subgraph/brandonflorian/pixiejarsnftapi) but has been inactive for some time.

If you have a use for this and would like it reactivated, feel free to contact me. 

You could use it in your app by accessing this API endpoint:

```markdown
https://api.thegraph.com/subgraphs/name/brandonflorian/pixiejarsnftapi
```

### Queries

#### Basic query

```graphql
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
```


#### Mushroom Floor query

```graphql
{
  tokens(where: {floor: "Mushrooms"}) {
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
}
```
