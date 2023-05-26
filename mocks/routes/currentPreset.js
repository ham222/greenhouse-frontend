let currentPreset = {
  id: 1,
  name: "default preset",
  thresholds: [
    {
      type: "temperature",
      min: 27.5,
      max: 32.2,
    },
    {
      type: "humidity",
      min: 60.5,
      max: 87.5,
    },
    {
      type: "co2",
      min: 12,
      max: 20,
    },
  ],
};

module.exports = [
  {
    id: "get-current-preset", // id of the route
    url: "/current-preset", // url in path-to-regexp format
    method: "GET", // HTTP method
    variants: [
      {
        id: "success", // id of the variant
        type: "json", // variant type
        options: {
          status: 200,
          body: currentPreset,
        },
      },
    ],
  },
  {
    id: "set-current-preset", // route id
    url: "/current-preset", // url in express format
    method: "POST", // HTTP method
    variants: [
      {
        id: "success",
        type: "middleware", // variant of type "middleware"
        options: {
          middleware: (req, res) => {
            currentPreset.id = req.body.Id;
            res.status(201);
            res.send(currentPreset);
          },
        },
      },
    ],
  },
];
