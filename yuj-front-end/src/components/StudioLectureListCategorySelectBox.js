import React, { useState } from "react";
import { useSelector } from 'react-redux';


const StudioLectureListCategorySelectBox = () => {
  const yogaCategory = useSelector(state => state.common.yogaCategory)
  
  const [selected, setSelected] = useState("default");

  const handleSelected = (e) => {
    setSelected(e.target.value);
  };

  return (
    <>
      <select
        className="select w-40 max-w-xs select-sm text-accent"
        onChange={handleSelected}
        value={selected}
      >
        <option value="default" disabled className="bg-info">
          Select Category
        </option>
        {yogaCategory.map((category) => (
          <option value={category} key={category}>
            {category}
          </option>
        ))}
      </select>
    </>
  );
};

export default StudioLectureListCategorySelectBox;
