const startTimestamp = Date.now() - 300000000;

function generateRandomValues({ valueMin, valueMax, startTimestamp, round }) {
  const objects = [];
  const valueRange = valueMax - valueMin;
  const now = new Date().getTime();

  for (let timestamp = startTimestamp; timestamp <= now; timestamp += 300000) {
    const value = Math.random() * valueRange + valueMin;
    const rounded = value.toFixed(round);
    objects.push({ timestamp: timestamp, value: rounded });
  }

  return objects;
}

module.exports = [
  {
    id: "get-temperature", // route id
    url: "/api/temperature", // url in express format
    method: "GET", // HTTP method
    variants: [
      {
        id: "success",
        type: "middleware", // variant of type "middleware"
        options: {
          middleware: (req, res) => {
            const temperatures = generateRandomValues({
              valueMin: 15,
              valueMax: 30,
              startTimestamp: startTimestamp,
              round: 1,
            });

            const query = req.query;
            if (query.hasOwnProperty("current")) {
              //Temperature with latest timestamp
              const toReturn = [temperatures[0]];
              res.status(200);
              res.send(toReturn);
            } else {
              let toReturn = temperatures;
              if (query.startTimestamp) {
                toReturn = toReturn.filter(
                  (h) => h.timestamp >= query.startTimestamp
                );
              }
              if (query.endTimestamp) {
                toReturn = toReturn.filter(
                  (h) => h.timestamp <= query.endTimestamp
                );
              }
              res.status(200);
              res.send(toReturn);
            }
          },
        },
      },
    ],
  },
  {
    id: "get-co2", // route id
    url: "/api/co2", // url in express format
    method: "GET", // HTTP method
    variants: [
      {
        id: "success",
        type: "middleware", // variant of type "middleware"
        options: {
          middleware: (req, res) => {
            const co2s = generateRandomValues({
              valueMin: 13,
              valueMax: 25,
              startTimestamp: startTimestamp,
              round: 1,
            });

            const query = req.query;
            if (query.hasOwnProperty("current")) {
              //Humidity with latest timestamp
              const toReturn = [co2s[0]];
              res.status(200);
              res.send(toReturn);
            } else {
              let toReturn = co2s;
              if (query.startTimestamp) {
                toReturn = toReturn.filter(
                  (h) => h.timestamp >= query.startTimestamp
                );
              }
              if (query.endTimestamp) {
                toReturn = toReturn.filter(
                  (h) => h.timestamp <= query.endTimestamp
                );
              }
              res.status(200);
              res.send(toReturn);
            }
          },
        },
      },
    ],
  },
  {
    id: "get-humidity",
    url: "/api/humidity",
    method: "GET",
    variants: [
      {
        id: "success",
        type: "middleware", // variant of type "middleware"
        options: {
          middleware: (req, res) => {
            const humidities = generateRandomValues({
              valueMin: 0,
              valueMax: 100,
              startTimestamp: startTimestamp,
              round: 0,
            });

            const query = req.query;
            if (query.hasOwnProperty("current")) {
              //Humidity with latest timestamp
              const toReturn = [humidities[0]];
              res.status(200);
              res.send(toReturn);
            } else {
              let toReturn = humidities;
              if (query.startTimestamp) {
                toReturn = toReturn.filter(
                  (h) => h.timestamp >= query.startTimestamp
                );
              }
              if (query.endTimestamp) {
                toReturn = toReturn.filter(
                  (h) => h.timestamp <= query.endTimestamp
                );
              }
              res.status(200);
              res.send(toReturn);
            }
          },
        },
      },
    ],
  },
];
