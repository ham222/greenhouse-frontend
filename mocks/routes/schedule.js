let schedule = [
  {
    id: 0,
    startTime: "08:00:00",
    endTime: "09:45:00",
    dayOfWeek: 1,
  },
  {
    id: 1,
    startTime: "18:30:00",
    endTime: "20:00:00",
    dayOfWeek: 2,
  },
  {
    id: 2,
    startTime: "12:15:00",
    endTime: "14:20:00",
    dayOfWeek: 3,
  },
  {
    id: 3,
    startTime: "10:30:00",
    endTime: "16:10:00",
    dayOfWeek: 4,
  },
];
module.exports = [
  {
    id: "get-schedule", // id of the route
    url: "/api/schedule", // url in path-to-regexp format
    method: "GET", // HTTP method
    variants: [
      {
        id: "success", // id of the variant
        type: "middleware", // variant type
        options: {
          middleware: (req, res) => {
            res.status(200);
            res.send(schedule);
          },
        },
      },
    ],
  },
  {
    id: "set-schedule", // route id
    url: "/api/schedule", // url in express format
    method: "POST", // HTTP method
    variants: [
      {
        id: "success",
        type: "middleware", // variant of type "middleware"
        options: {
          middleware: (req, res) => {
            schedule = schedule.concat(req.body);
            res.status(201);
            res.send(schedule);
          },
        },
      },
    ],
  },
];
