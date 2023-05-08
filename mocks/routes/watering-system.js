let state = { state: true };
let duration = { duration: 0 };

module.exports = [
  {
    id: "get-toggle", // id of the route
    url: "/api/watering-system/toggle", // url in path-to-regexp format
    method: "GET", // HTTP method
    variants: [
      {
        id: "success", // id of the variant
        type: "json", // variant type
        options: {
          status: 200,
          body: state,
        },
      },
    ],
  },
  {
    id: "change-toggle", // route id
    url: "/api/watering-system/toggle", // url in express format
    method: "POST", // HTTP method
    variants: [
      {
        id: "success",
        type: "middleware", // variant of type "middleware"
        options: {
          middleware: (req, res) => {
            console.log(req.body);
            state.state = req.body.state;
            duration.duration = req.body.duration;
            res.status(201);
            res.send(state);
          },
        },
      },
    ],
  },
];
