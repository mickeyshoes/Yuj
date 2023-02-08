import React, { useState } from "react";

//시작, 끝 시간 셀렉트 박스를 위한 시간 옵션 만들기
let hour = [];
for (let i = 1; i < 25; i++) {
  let op = {};

  //시간을 00:00로 나타내기
  op.value = ("0" + i).slice(-2);
  op.label = ("0" + i).slice(-2) + ":00";

  hour.push(op);
}

const StudioLectureCreateScheduleInput = () => {
  const [dayOfWeek, setDayOfWeek] = useState("default");
  const [startTimeValue, setStartTimeValue] = useState("default");
  const [endTimeValue, setEndTimeValue] = useState("default");

  const handleDayOfWeek = (e) => {
    setDayOfWeek(e.target.value);
  };
  const handleSelectStartTime = (e) => {
    setStartTimeValue(e.target.value);
  };
  const handleSelectEndTime = (e) => {
    setEndTimeValue(e.target.value);
  };

  const addSchedule = (
    <div className="flex gap-3 items-center">
      {/* 요일 */}
      <select className="select flex-auto max-w-xs bg-primary" onChange={handleDayOfWeek} value={dayOfWeek}>
        <option value="default" disabled className="bg-info">요일</option>
        <option value='1'>일요일</option>
        <option value='2'>월요일</option>
        <option value='3'>화요일</option>
        <option value='4'>수요일</option>
        <option value='5'>목요일</option>
        <option value='6'>금요일</option>
        <option value='7'>토요일</option>
      </select>
      {/* 시작 시간 */}
      <select
        className="select flex-auto max-w-xs bg-primary"
        onChange={handleSelectStartTime}
        value={startTimeValue}
      >
        <option value="default" disabled  className="bg-info">
          시작
        </option>
        {hour.map((time) => (
          <option value={time.value} key={time.value}>
            {time.label}
          </option>
        ))}
      </select>
      {/* 종료 시간 */}
      <select
        className="select flex-auto max-w-xs bg-primary"
        onChange={handleSelectEndTime}
        value={endTimeValue}
      >
        <option value="default" disabled  className="bg-info">
          종료
        </option>
        {hour.map((time) => (
          <option value={time.value} key={time.value}>
            {time.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <>
      {addSchedule}
    </>
  );
};

export default StudioLectureCreateScheduleInput;
