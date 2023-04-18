let schedule = {
    intervals: [
        {
            startTime: "08:00:00",
            endTime: "09:45:00",
            dayOfWeek: 1
        },
        {
            startTime: "12:30:00",
            endTime: "14:00:00",
            dayOfWeek: 2
        },
        {
            startTime: "12:30:00",
            endTime: "14:00:00",
            dayOfWeek: 3
        },
        {
            startTime: "12:30:00",
            endTime: "14:00:00",
            dayOfWeek: 4
        }
]}

module.exports = [
    {
    id: "get-schedule", // id of the route
    url: "/api/schedule", // url in path-to-regexp format
    method: "GET", // HTTP method
    variants: [
      {
        id: "success", // id of the variant
        type: "json", // variant type
        options: {
          status: 200,
          body: schedule
        }
      },
    ]
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
                    schedule = req.body.schedule
                    res.status(201)
                    res.send(schedule)
              },
            },
          }
        ],
      },
]