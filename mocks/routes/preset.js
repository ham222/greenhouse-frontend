let presets = [
        {
        id: 1,
        name: "default preset",
        thresholds: [
            {
                type: "temperature",
                min: 27.5,
                max: 32.2
            },
            {
                type: "humidity",
                min: 60.5,
                max: 87.5
            },
            {
                type: "co2",
                min: 12,
                max: 20
            },
        ]
    },
        {
        id: 2,
        name: "fallback preset",
        thresholds: [
            {
                type: "temperature",
                min: 25.0,
                max: 35.0
            },
            {
                type: "humidity",
                min: 30.0,
                max: 90.0
            },
            {
                type: "co2",
                min: 10,
                max: 30
            },
        ]
    }
]

module.exports = [
    {
    id: "get-presets", // id of the route
    url: "/api/preset", // url in path-to-regexp format
    method: "GET", // HTTP method
    variants: [
      {
        id: "success", // id of the variant
        type: "json", // variant type
        options: {
          status: 200,
          body: presets
        }
      },
    ]
    },
    {
        id: "add-presets", // route id
        url: "/api/preset", // url in express format
        method: "POST", // HTTP method
        variants: [
          {
            id: "success",
            type: "middleware", // variant of type "middleware"
            options: {
              middleware: (req, res) => {
                    presets.push(req.body.preset)
                    res.status(201)
                    res.send(presets)
              },
            },
          }
        ],
      },
      {
        id: "get-one-preset", // route id
        url: "/api/preset/:id", // url in express format
        method: "GET", // HTTP method
        variants: [
          {
            id: "success",
            type: "middleware", // variant of type "middleware"
            options: {
              middleware: (req, res) => {
                    let toReturn = presets.filter(preset=>preset.id==req.params.id)
                    if (toReturn) {
                        res.status(201)
                        res.send(toReturn)
                    } else {
                        res.status(404)
                        res.send()
                    }
              },
            },
          }
        ],
    },
    {
        id: "delete-one-preset", // route id
        url: "/api/preset/:id", // url in express format
        method: "DELETE", // HTTP method
        variants: [
          {
            id: "success",
            type: "middleware", // variant of type "middleware"
            options: {
              middleware: (req, res) => {
                    let index=-1
                    presets.forEach(p => {
                        if (p.id == req.params.id) {
                            index = presets.indexOf(p)
                            presets.splice(index, 1)
                            res.status(200)
                            res.send(req.params.id)
                        }
                    });
                    res.status(404)
                    res.send()
              },
            },
          }
        ],
    },
    {
        id: "update-one-preset", // route id
        url: "/api/preset/:id", // url in express format
        method: "PUT", // HTTP method
        variants: [
          {
            id: "success",
            type: "middleware", // variant of type "middleware"
            options: {
              middleware: (req, res) => {
                presets.forEach(p => {
                    if (p.id == req.params.id) {
                        p = req.params.preset
                        res.status(200)
                        res.send(p)
                    }
                });
                res.status(404)
                res.send()
              },
            },
          }
        ],
    },
]