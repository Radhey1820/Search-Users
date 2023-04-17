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
