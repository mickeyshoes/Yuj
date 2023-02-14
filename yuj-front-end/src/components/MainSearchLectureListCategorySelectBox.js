import React, {useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { searchLectures, getSelectedLectureList } from "../stores/lectureSlice";


const StudioLectureListCategorySelectBox = ({keyword = 'keyword not set' }) => {

  const dispatch = useDispatch();

  const yogaCategory = useSelector(state => state.common.yogaCategory);
  
  const [selected, setSelected] = useState("default");

  const handleSelected = (e) => {
    let yogaId = e.target.value;
    setSelected(yogaId);
    if(yogaId === "default") {
      dispatch(searchLectures(keyword));
    } else {
      dispatch(getSelectedLectureList({keyword, yogaId}));
    }
  };

  return (
    <>
      <select
        className="select w-40 max-w-xs select-sm text-accent"
        onChange={handleSelected}
        value={selected}
      >
        <option value="default" className="bg-info">
          Select Category
        </option>
        {yogaCategory.map((category) => (
          <option value={category.yogaId} key={category.yogaId}>
            {category.name + "(" + category.englishName + ")"}
          </option>
        ))}
      </select>
    </>
  );
};

export default StudioLectureListCategorySelectBox;
