# pubsubhubbub-node-publisher
A node publisher for the PubSubHub protocol

## Installing
To install

```bash
npm install pubsubhubbub-node-publisher --save
```

## Example
A simple example pushing an update to `alert-hub`

```javascript
const HubbubPublisher = require("pubsubhubbub-node-publisher");

const publisher = HubbubPublisher({
    hubURL: "https://alert-hub.appspot.com/"
});

publisher.publishUpdate("https://example.com/rss.xml").then( ()=> console.log("OK") )
```
