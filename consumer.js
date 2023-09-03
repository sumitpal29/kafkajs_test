const { kafka } = require("./client");
const group = process.argv[2];
console.log("group", group);

async function init() {
  const consumer = kafka.consumer({ groupId: group });
  await consumer.connect();
  console.log(`Consumer connected for group ${group}`);

  await consumer.subscribe({
    topics: ["CATCH_USER_INTERACTION"],
    fromBegginings: true,
  });
  // Run function on consumer gets something
  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      console.log(
        `\n group: ${group} Topic: ${topic} - Partition: ${partition}`,
        message.value.toString()
      );
    },
  });
}

init();
