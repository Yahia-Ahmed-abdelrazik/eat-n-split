import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);

  function handelAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList friends={friends} />

        {showAddFriend && <FormAddFriend onAddFriend={handelAddFriend} />}

        <Button onClick={() => setShowAddFriend((show) => !show)}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>

      <FormSplitBill />
    </div>
  );
}

function FriendList({ friends }) {
  return (
    <>
      <ul>
        {friends.map((friend) => (
          <Friend friend={friend} key={friend.id} />
        ))}
      </ul>
    </>
  );
}

function Friend({ friend }) {
  return (
    <>
      <li>
        <img src={friend.image} alt={friend.name} />
        <h3>{friend.name}</h3>

        {friend.balance < 0 && (
          <p className="red">
            You owe {friend.name} ${Math.abs(friend.balance)}
          </p>
        )}

        {friend.balance > 0 && (
          <p className="green">
            {friend.name} owes you ${Math.abs(friend.balance)}
          </p>
        )}

        {friend.balance === 0 && <p>You and {friend.name} are even</p>}

        <Button>Select</Button>
      </li>
    </>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [friendImage, setFriendImage] = useState("https://i.pravatar.cc/48");

  function ahndelSubmit(e) {
    e.preventDefault();

    if (!name || !friendImage) return;

    const id = crypto.randomUUID();
    const newFrind = {
      id,
      name,
      image: friendImage,
      balance: 0,
    };

    onAddFriend(newFrind);

    setName("");
    setFriendImage("https://i.pravatar.cc/48");
    // console.log(newFrind);
  }

  return (
    <form className="form-add-friend" onSubmit={ahndelSubmit}>
      <label>🕺Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🖼Image URL</label>
      <input
        type="text"
        value={friendImage}
        onChange={(e) => setFriendImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with x</h2>
      <label>💰Bill Value</label>
      <input type="text" />

      <label>🕴Your expense</label>
      <input type="text" />

      <label>👫x's expense</label>
      <input type="text" disabled />

      <label>🤑Who is paying the bill</label>
      <select name="" id="">
        <option value="user">You</option>
        <option value="friend">x</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}

export default App;
