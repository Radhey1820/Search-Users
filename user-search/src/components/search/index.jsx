import { useState, useEffect } from "react";

function UserCard({ user }) {
  return (
    <div className="card">
      <div>ID: {user.id}</div>
      <div>Name: {user.name}</div>
      <div>Items: {user.items.join(', ')}</div>
      <div>Address: {user.address}</div>
      <div>Pincode: {user.pincode}</div>
    </div>
  );
}

export default function SearchUsers() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    fetch('/api/search')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error('Error fetching users: ', error);
      });
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredUsers([]);
      setShowResults(false);
      return;
    }

    const filtered = users.filter((user) => {
      const searchValue = searchQuery.toLowerCase();
      return (
        user.name.toLowerCase().includes(searchValue) ||
        user.items.join(', ').toLowerCase().includes(searchValue) ||
        user.address.toLowerCase().includes(searchValue) ||
        user.pincode.toString().includes(searchValue)
      );
    });

    setFilteredUsers(filtered);
    setShowResults(true);
  }, [searchQuery, users]);

  function handleSearchChange(event) {
    setSearchQuery(event.target.value);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search by ID, name, items, address, or pincode"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      {showResults ? (
        <div className="card-container">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      ) : <div className="card-container">
              <p>No users found</p>
        </div>}
    </div>
  );
}


