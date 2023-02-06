import React from "react";

const StudioLectureListCategorySelectBox = (props) => {

  const yogaCategory = props.yogaCategory;

  return (
    <>
      <select
        className="select w-40 max-w-xs select-sm text-accent"
        defaultValue="0"
      >
        <option value="0">Select Category</option>
        {yogaCategory.map((menu) => {
          return (
            <option>{menu}</option>
          )
        })}
      </select>
    </>
  );
};

export default StudioLectureListCategorySelectBox;
