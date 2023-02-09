import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getYogaList } from "../stores/commonSlice";


const StudioLectureListCategorySelectBox = () => {
  
  //컴포넌트가 마운트 될 때 yoga category를 데이터베이스에서 불러와 셀렉트 박스에 띄우기
  const distpatch = useDispatch();
  //아래의 빈 [] 배열을 넣어주어야 화면이 첫 렌더링 될 때 한번만 실행됨.
  useEffect(() => {
    distpatch(getYogaList());
    return () =>{
    };
  }, []);

  const yogaCategory = useSelector(state => state.common.yogaCategory);
  
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
          <option value={category.yogaId} key={category.yogaId}>
            {category.name + "(" + category.englishName + ")"}
          </option>
        ))}
      </select>
    </>
  );
};

export default StudioLectureListCategorySelectBox;
