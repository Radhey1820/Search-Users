import { useState, useEffect } from "react";

function UserCard({  user, handleKeyDown, handleMouseEnter, handleMouseLeave, focused, highlightedUser, highlightMatch } ) {

  const isHighlighted = user.id === highlightedUser;
  const name = highlightMatch(user.name);
  const address = highlightMatch(user.address);
  
  return (
    <div className={`card${focused ? ' focused' : ''} card${highlightedUser && highlightedUser.id === user.id ? "highlighted" : null}`} 
    tabIndex="0"
    onKeyDown={(e) => handleKeyDown(e, user)}
    onMouseEnter={() => handleMouseEnter(user)}
    onMouseLeave={() => handleMouseLeave(user)}
  >
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
  const [focusedUser, setFocusedUser] = useState(null);
  const [highlightedUser, setHighlightedUser] = useState(null);
  const [hoveredUser, setHoveredUser] = useState(null);
  const [isMouseActive, setIsMouseActive] = useState(false);
  const [isUsingKeyboard, setIsUsingKeyboard] = useState(false)

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

  function highlightMatch(text) {
    if (!searchQuery) {
      return text;
    }
  
    const regex = new RegExp(searchQuery, "gi");
    const matches = text.match(regex);
  
    if (!matches) {
      return text;
    }
  
    return text.split(regex).map((part, index) => {
      if (index === 0) {
        return part;
      }
      return (
        <span key={index} className="highlight">
          {matches[index - 1]}
        </span>
      );
    });
  }

  const handleSearchChange = (event) =>  {
    setSearchQuery(event.target.value);
  }

  function handleKeyDown(event, user) {
    setIsUsingKeyboard(true);
    if (event.key === 'Enter') {
      console.log('User selected:', user);
    } else if (event.key === 'ArrowDown') {
      const index = users.findIndex((u) => u.id === user.id);
      setFocusedUser(users[index + 1] || users[0]);
      setIsMouseActive(false);
    } else if (event.key === 'ArrowUp') {
      const index = users.findIndex((u) => u.id === user.id);
      setFocusedUser(users[index - 1] || users[users.length - 1]);
      setIsMouseActive(false);
    }
  }
  

  const handleMouseEnter = (user) => {
    setIsUsingKeyboard(false);
    if(!isMouseActive) {
      setFocusedUser(user);
    }
    if(!isUsingKeyboard){
      setHighlightedUser(user.id)
    }
    setHoveredUser(user);
  }

  const handleMouseLeave = (user) => {
    if(!isMouseActive) {
      setFocusedUser(null);
    }
    if(!isUsingKeyboard){
      setHighlightedUser(null)
    }
    setHoveredUser(null);
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
            <UserCard key={user.id} user={user} 
            handleKeyDown={handleKeyDown} 
            handleMouseEnter={handleMouseEnter} 
            handleMouseLeave={handleMouseLeave} 
            focused={isMouseActive ? hoveredUser?.id === user.id : focusedUser?.id === user.id} 
            highlightedUser={highlightedUser}
            highlightMatch={highlightMatch}/>
          ))}
        </div>
      ) : <div className="card-container">
              <p>No users found</p>
        </div>}
    </div>
  );
}


