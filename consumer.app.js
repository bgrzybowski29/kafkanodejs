const kafka = require('kafka-node');
let kafkaHost = 'localhost:9092';
const Consumer = kafka.Consumer;
const Offset = kafka.Offset;
const client = new kafka.KafkaClient({ kafkaHost: kafkaHost });
let offset = new Offset(client);
const topic = 'characters1-topic-0';

const consumer = new Consumer(
  client,
  [
    { topic: topic, partition: 0 },
  ],
  {
    autoCommit: false,
    fromOffset: 'latest'
  }
);
consumer.on('message', function (message) {
  let obj = JSON.parse(message.value);
  if (obj.event === "ADDCHARACTER") {
    console.log(obj.data);
  }
});

consumer.on('error', function (err) {
  console.log('Error:', err);
});

consumer.on('offsetOutOfRange', function (topic) {
  topic.maxNum = 2;
  offset.fetch([topic], function (err, offsets) {
    if (err) {
      return console.error(err);
    }
    var min = Math.min.apply(null, offsets[topic.topic][topic.partition]);
    consumer.setOffset(topic.topic, topic.partition, min);
  });
});

const createCharacter = async (data) => {
  console.log(`character created: ${JSON.stringify(resp.data)}`);
}
