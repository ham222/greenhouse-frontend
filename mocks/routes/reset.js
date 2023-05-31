module.exports = [
  {
    id: "reset", // id of the route
    url: "/reset", // url in path-to-regexp format
    method: "GET", // HTTP method
    variants: [
      {
        id: "success", // id of the variant
        type: "middleware", // variant type
        options: {
          middleware: async (req, res, next, core) => {
            res.status(200);
            await core.files.reload();
            res.send();
          },
        },
      },
    ],
  },
];
