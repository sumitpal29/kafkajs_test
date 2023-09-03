// responsibility of admin - create topics

const { kafka } = require("./client");

async function init() {
  const admin = kafka.admin();
  console.log("connecting to admin");
  admin.connect();
  console.log("Connection successful");

  console.log("creating topic - CATCH_USER_INTERACTION");
  await admin.createTopics({
    topics: [
      {
        topic: "CATCH_USER_INTERACTION",
        numPartitions: 3,
      },
    ],
  });

  // another way of creating kafka topics
  // await admin.createTopics({
  //   topics: topics.map((topic) => ({ topic, numPartitions: 6 })),
  // });

  console.log("topic creation - Success!! - CATCH_USER_INTERACTION");

  console.log("disconnecting Admin");
  await admin.disconnect();
  console.log("disconnected");
}

init();
