// Use this file only as a guide for first steps using routes. Delete it when you have added your own route files.
// For a detailed explanation regarding each routes property, visit:
// https://mocks-server.org/docs/usage/routes

const humidities = [
  { timestamp: 1, humidity: 30 },
  { timestamp: 2, humidity: 40 },
  { timestamp: 3, humidity: 50 },
  { timestamp: 4, humidity: 42 },
  { timestamp: 5, humidity: 38 },
]

const temperatures = [
  { timestamp: 1, temperature: 10.1 },
  { timestamp: 2, temperature: 12.3 },
  { timestamp: 3, temperature: 14.8 },
  { timestamp: 4, temperature: 27.2 },
  { timestamp: 5, temperature: 29.2 },
]

const co2s = [
  { timestamp: 1, co2: 36 },
  { timestamp: 2, co2: 81 },
  { timestamp: 3, co2: 30 },
  { timestamp: 4, co2: 64 },
  { timestamp: 5, co2: 76 },
]

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
            const query = req.query 
            if (query.hasOwnProperty("current")) {
              //Temperature with latest timestamp
              const toReturn = temperatures.reduce((prev, current) => {
                return prev.timestamp > current.timestamp ? prev : current
              })
              res.status(200);
              res.send(toReturn);
            } else {
              let toReturn = temperatures
              if (query.startTimestamp) {
                toReturn = toReturn.filter(h=>h.timestamp>=query.startTimestamp)
              }
              if (query.endTimestamp) {
                toReturn = toReturn.filter(h=>h.timestamp<=query.endTimestamp)
              }
              res.status(200)
              res.send(toReturn)
            }
          },
        },
      }
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
            const query = req.query 
            if (query.hasOwnProperty("current")) {
              //Humidity with latest timestamp
              const toReturn = co2s.reduce((prev, current) => {
                return prev.timestamp > current.timestamp ? prev : current
              })
              res.status(200);
              res.send(toReturn);
            } else {
              let toReturn = co2s
              if (query.startTimestamp) {
                toReturn = toReturn.filter(h=>h.timestamp>=query.startTimestamp)
              }
              if (query.endTimestamp) {
                toReturn = toReturn.filter(h=>h.timestamp<=query.endTimestamp)
              }
              res.status(200)
              res.send(toReturn)
            }
          },
        },
      }
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
            const query = req.query 
            if (query.current==true) {
              //Humidity with latest timestamp
              const toReturn = humidities.reduce((prev, current) => {
                return prev.timestamp > current.timestamp ? prev : current
              })
              res.status(200);
              res.send(toReturn);
            } else {
              let toReturn = humidities
              if (query.startTimestamp) {
                toReturn = toReturn.filter(h=>h.timestamp>=query.startTimestamp)
              }
              if (query.endTimestamp) {
                toReturn = toReturn.filter(h=>h.timestamp<=query.endTimestamp)
              }
              res.status(200)
              res.send(toReturn)
            }
          },
        },
      }
    ]
  },
];
