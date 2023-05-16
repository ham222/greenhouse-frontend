let idCount = 0;
let schedule = [
  {
    id: 0,
    startTime: "08:00:00",
    endTime: "09:45:00",
    dayOfWeek: idCount++,
  },
  {
    id: 1,
    startTime: "18:30:00",
    endTime: "20:00:00",
    dayOfWeek: idCount++,
  },
  {
    id: 2,
    startTime: "12:15:00",
    endTime: "14:20:00",
    dayOfWeek: idCount++,
  },
  {
    id: 3,
    startTime: "10:30:00",
    endTime: "16:10:00",
    dayOfWeek: idCount++,
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
            schedule = schedule.concat(
              req.body.map((interval) => {
                interval.id = idCount++;
                return interval;
              })
            );
            res.status(201);
            res.send(schedule);
          },
        },
      },
    ],
  },
  {
    id: "delete-schedule", // route id
    url: "/api/schedule/:id", // url in express format
    method: "DELETE", // HTTP method
    variants: [
      {
        id: "success",
        type: "middleware", // variant of type "middleware"
        options: {
          middleware: (req, res) => {
            const idToDelete = parseInt(req.params.id);
            const index = schedule.findIndex(
              (interval) => interval.id === idToDelete
            );
            if (index !== -1) {
              schedule.splice(index, 1);
              res.status(200).send();
            } else {
              res.status(404).send("Interval not found");
            }
          },
        },
      },
    ],
  },
  {
    id: "update-schedule", // route id
    url: "/api/schedule/:id", // url in express format
    method: "PUT", // HTTP method
    variants: [
      {
        id: "success",
        type: "middleware", // variant of type "middleware"
        options: {
          middleware: (req, res) => {
            const idToUpdate = parseInt(req.params.id);
            const index = schedule.findIndex(
              (interval) => interval.id === idToUpdate
            );

            if (index !== -1) {
              const interval = req.body;
              schedule.splice(index, 1, interval);
              res.status(200).send();
            } else {
              res.status(404).send("Interval not found");
            }
          },
        },
      },
    ],
  },
];
