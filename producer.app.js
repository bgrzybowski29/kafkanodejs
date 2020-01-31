let kafkaHost = 'localhost:9092';
var kafka = require("kafka-node"),
  Producer = kafka.Producer,
  client = new kafka.KafkaClient({ kafkaHost: kafkaHost }),
  producer = new Producer(client);
const topic = 'characters1-topic-0';
let count = 0;

producer.on("ready", function () {
  console.log("ready");
  setInterval(function () {
    payloads = [

      { topic: topic, messages: `{ "event": "ADDCHARACTER", "data": { "name": "ben${count}","image_url": "iben","fun_fact": "fben","quote": "qben" }, "metadata": { "version": "001" }, "timestamp": "${new Date().toLocaleString()}" }`, partition: 0 }
    ];

    producer.send(payloads, function (err, data) {
      console.log(data);
      count += 1;
    });
  }, 1000);
});

producer.on("error", function (err) {
  console.log(err);
});