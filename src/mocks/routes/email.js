let email = {email:"example@via.dk"}

module.exports = [
    {
    id: "get-email", // id of the route
    url: "/api/email", // url in path-to-regexp format
    method: "GET", // HTTP method
    variants: [
      {
        id: "success", // id of the variant
        type: "json", // variant type
        options: {
          status: 200,
          body: email
        }
      },
    ]
    },
    {
        id: "change-email", // route id
        url: "/api/email", // url in express format
        method: "POST", // HTTP method
        variants: [
          {
            id: "success",
            type: "middleware", // variant of type "middleware"
            options: {
              middleware: (req, res) => {
                    email.email = req.body.email
                    res.status(201)
                    res.send(email)
              },
            },
          }
        ],
      },
]