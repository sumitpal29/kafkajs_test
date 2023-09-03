const { kafka } = require("./client");
const { fakeId } = require("./utils");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function init() {
  const producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
  });
  console.log("connecting to producer", producer);
  await producer.connect();
  console.log("Connected!!! ");

  // asking for input
  rl.setPrompt("event region \n > ");
  rl.prompt();

  rl.on("line", async (line) => {
    const [event, region] = line.split(" ");
    const isAsiaRegionData = region.toLowerCase() === "asia";
    const messages = [
      {
        partition: isAsiaRegionData ? 0 : 1,
        key: "user_interaction_on_landing_page",
        value: JSON.stringify({ event, region }),
      },
    ];

    await producer.send({
      topic: "CATCH_USER_INTERACTION",
      messages,
    });
    console.log("Message sent", messages);
  }).on("close", async () => {
    await producer.disconnect();
  });
}

init();

// sending static messages //
/**
 await producer.send({
    topic: "CATCH_USER_INTERACTION", // topic you want to produce for - created by admin.js
    messages: [
      {
        key: fakeId(),
        value: "Tab 2 clicked",
        region: "EU",
        userId: `USER_${fakeId()}`,
      },
      {
        key: fakeId(),
        value: "Scrolled 200px from top",
        region: "US",
        userId: `USER_${fakeId()}`,
      },
      {
        key: fakeId(),
        value: "Clicked by now!!",
        region: "EU",
        userId: `USER_${fakeId()}`,
      },
    ],
    // we can also add partition where do you want to send the data
    partition: 0,
  });
 */
