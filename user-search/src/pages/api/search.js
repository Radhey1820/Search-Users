// import { Client } from "elasticsearch";
// import express from "express";
// import bodyParser from "body-parser";

// //Adding sample user data
// const users = [
//   {
//     id: 1,
//     name: "John Doe",
//     items: ["Item 1", "Item 2", "Item 3"],
//     address: "123 Main St",
//     pincode: "12345",
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     items: ["Item 4", "Item 5"],
//     address: "456 Oak St",
//     pincode: "67890",
//   },
//   {
//     id: 3,
//     name: "Bob Johnson",
//     items: ["Item 6", "Item 7", "Item 8"],
//     address: "789 Maple St",
//     pincode: "23456",
//   },
// ];

// const app = express();
// const port = process.env.PORT || 3000;

// // Elasticsearch client initialization
// const esClient = new Client({
//   host: "localhost:9200",
//   log: "error",
// });

// // Body parser middleware to parse JSON payloads
// app.use(bodyParser.json());

// // Search endpoint
// app.get("/api/search", async (req, res) => {
//   const { q } = req.query;

//   try {
//     // Elasticsearch search query to search for the query term in all fields of the user object
//     const results = await esClient.search({
//       index: "users",
//       body: users,
//     });

//     res.json(results.hits.hits.map((hit) => hit._source));
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.listen(port, () => console.log(`Server started on port ${port}`));

// export function handler(req, res) {
//   const { q } = req.query;

//   // Filter the users based on the query parameter
//   const filteredUsers = users.filter((user) =>
//     Object.values(user).some(
//       (value) =>
//         typeof value === "string" &&
//         value.toLowerCase().includes(q.toLowerCase())
//     )
//   );

//   res.status(200).json(filteredUsers);
// }

// export default app;

const users = [
  {
    id: 1,
    name: "John",
    items: ["item1", "item2"],
    address: "123 Main St",
    pincode: "12345",
  },
  {
    id: 2,
    name: "Jane",
    items: ["item3", "item4"],
    address: "456 Oak Ave",
    pincode: "67890",
  },
  {
    id: 3,
    name: "Bob",
    items: ["item5", "item6"],
    address: "789 Elm St",
    pincode: "54321",
  },
];

export default function handler(req, res) {
  res.status(200).json(users);
}
