import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getYogaList } from "../stores/commonSlice";
import { changeSelectedCategory, getStudioLectureList, getStudioSelectedLectureList } from "../stores/studioSlice";


const StudioLectureListCategorySelectBox = () => {

  const dispatch = useDispatch();
  
  const userId = useSelector(state => state.studio.studioDetail.userId);

  const yogaCategory = useSelector(state => state.common.yogaCategory);
  
  const [selected, setSelected] = useState("default");

  const handleSelected = (e) => {
    let yogaId = e.target.value;
    setSelected(yogaId);
    if(yogaId === "default") {
      dispatch(getStudioLectureList(userId));
    } else {
      dispatch(getStudioSelectedLectureList({userId, yogaId}));
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
