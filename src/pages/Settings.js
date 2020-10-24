import React from "react";

import EditableList from "../components/EditableList";

const Settings = () => {
  const items = ["item1", "item2", "item3"];

  const handleDelete = () => console.log("delete clicked");
  const handleAdd = () => console.log("add clicked");

  return (
    <div>
      <EditableList
        items={items}
        onDelete={handleDelete}
        onAdd={handleAdd}
        addLabel="Add a new item"
        listStyle={{ width: "384px" }}
      />
    </div>
  );
};

export default Settings;
