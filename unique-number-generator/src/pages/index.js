import { useState } from "react";

export default function Home() {
  const [numItems, setNumItems] = useState(1);
  const [generatedItems, setGeneratedItems] = useState([]);
  const [userNumbers45, setUserNumbers45] = useState("");
  const [userNumbers12, setUserNumbers12] = useState("");

  const generateUniqueNumbers = () => {
    const uniqueNumbers = new Set();

    while (uniqueNumbers.size < 5) {
      uniqueNumbers.add(Math.floor(Math.random() * 50) + 1);
    }

    const uniqueNumbers12 = new Set();
    while (uniqueNumbers12.size < 2) {
      uniqueNumbers12.add(Math.floor(Math.random() * 12) + 1);
    }

    return {
      numbers45: [...uniqueNumbers].sort((a, b) => a - b),
      numbers12: [...uniqueNumbers12].sort((a, b) => a - b),
    };
  };

  const isUniqueCombination = (newItem, items) => {
    return !items.some(
      (item) =>
        item.numbers45.join(",") === newItem.numbers45.join(",") &&
        item.numbers12.join(",") === newItem.numbers12.join(",")
    );
  };

  const handleAutoGenerate = () => {
    let items = [...generatedItems];
    while (items.length < numItems) {
      const newItem = generateUniqueNumbers();
      if (isUniqueCombination(newItem, items)) {
        items.push(newItem);
      }
    }
    setGeneratedItems(items);
  };

  const handleAddUserItem = () => {
    const numbers45 = userNumbers45
      .split(",")
      .map((num) => parseInt(num.trim()))
      .filter((num) => num >= 1 && num <= 50);

    const numbers12 = userNumbers12
      .split(",")
      .map((num) => parseInt(num.trim()))
      .filter((num) => num >= 1 && num <= 12);

    if (numbers45.length === 5 && numbers12.length === 2) {
      const userItem = { numbers45, numbers12 };
      if (isUniqueCombination(userItem, generatedItems)) {
        setGeneratedItems([...generatedItems, userItem]);
      } else {
        alert("The set you entered is not unique.");
      }
    } else {
      alert("Please enter exactly 5 numbers (1-45) and 2 numbers (1-12).");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Unique Number Generator</h1>

      <div>
        <label>How many items to generate:</label>
        <input
          type="number"
          value={numItems}
          onChange={(e) =>
            setNumItems(Math.max(1, parseInt(e.target.value) || 1))
          }
          style={{ margin: "0 10px", width: "50px" }}
        />
      </div>

      <button onClick={handleAutoGenerate} style={{ margin: "10px 0" }}>
        Auto Generate
      </button>

      <div style={{ margin: "20px 0" }}>
        <h3>Add Your Own Set</h3>
        <input
          type="text"
          placeholder="5 numbers between 1-45"
          value={userNumbers45}
          onChange={(e) => setUserNumbers45(e.target.value)}
          style={{ marginRight: "10px", width: "200px" }}
        />
        <input
          type="text"
          placeholder="2 numbers between 1-12"
          value={userNumbers12}
          onChange={(e) => setUserNumbers12(e.target.value)}
          style={{ marginRight: "10px", width: "150px" }}
        />
        <button onClick={handleAddUserItem}>Add</button>
      </div>

      <div>
        <h3>Generated Items</h3>
        <ul>
          {generatedItems.map((item, index) => (
            <li key={index}>
              {item.numbers45.join(", ")} | {item.numbers12.join(", ")}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
