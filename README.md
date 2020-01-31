1. Download kafka:
  https://www.apache.org/dyn/closer.cgi?path=/kafka/2.4.0/kafka_2.12-2.4.0.tgz

2. Unzip the kafka download and copy the config files from this repo(kafkaconfig) to unzip location/config. This will set up zookeeper and a 3 broker kafka instance with a replication factor of 2.(aka. Say X,Y and Z are our kafka brokers. With replication factor 2, the data in X will be copied to both Y & Z, the data in Y will be copied to X & Z and the data of Z is copied to X & Y.)

* Steps 3 & 4 require a new command window for each
3. Start Zookeeper:
bin/zookeeper-server-start.sh config/zookeeper.properties

4. Start each kafka brokers
Start Kafka nodes:
bin/kafka-server-start.sh config/server.b1.properties
bin/kafka-server-start.sh config/server.b2.properties
bin/kafka-server-start.sh config/server.b3.properties

5. Set up consumer and producer. You can clone(& run npm i) this repo or do it your way!
run producer and consumer:
node producer.app.js
node consumer.app.js