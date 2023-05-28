let credentials = {
  token: "",
};

module.exports = [
  {
    id: "login", // route id
    url: "/auth/login", // url in express format
    method: "POST", // HTTP method
    variants: [
      {
        id: "success",
        type: "middleware", // variant of type "middleware"
        options: {
          middleware: (req, res) => {
            credentials.token = req.body.password;
            res.status(201);
            res.send(credentials);
          },
        },
      },
    ],
  },
];
