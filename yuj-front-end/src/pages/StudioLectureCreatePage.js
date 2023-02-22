import React, { useState } from "react";
import StudioSidebar from "./../components/StudioSidebar";
import { useNavigate } from "react-router-dom";
import StudioLectureListCategorySelectBox from "../components/StudioLectureListCategorySelectBox";
import Styles from "../pages/StudioLectureCreatePage.module.css";
import StudioLectureCreateScheduleInput from "../components/StudioLectureCreateScheduleInput";
import StudioLectureCreateImagesInput from "../components/StudioLectureCreateImagesInput";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CheckIcon from "@mui/icons-material/Check";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getStudioDetail,
  getStudioLectureList,
  getStudioLiveLecture,
} from "../stores/studioSlice";
import axios from "axios";
import Swal from "sweetalert2";

const StudioLectureCreatePage = () => {
  // useHistory의 기능을 모두 useNavigate가 대체 -> 뒤로가기, 앞으로가기 등
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const studio = useSelector((state) => state.studio);

  // 스케줄 입력 컴포넌트 생성을 위한 카운트
  const [addScheduleCnt, setAddSchduleCnt] = useState(1);

  const plusAddSchdulecnt = (e) => {
    if (addScheduleCnt === schedules.length) {
      setAddSchduleCnt(addScheduleCnt + 1);
    } else {
      Swal.fire({
        text: "일정을 다시 확인해 주세요.",
        confirmButtonColor: "#90859A",
        confirmButtonText: "확인",
      });
    }
  };
  const minusAddSchdulecnt = (e) => {
    if (addScheduleCnt > 0) {
      setAddSchduleCnt(addScheduleCnt - 1);
      let tmpSchedules = [];
      const id = e.target.id;
      for (let i = 0; i < schedules.length; i++) {
        if (id !== i) {
          tmpSchedules.push(schedules[i]);
        }
      }
      setSchedules(tmpSchedules);
    }
  };
  // 스케줄 입력 컴포넌트 생성을 위한 함수
  function addSchedules(addScheduleCnt) {
    let addScheduleArr = [];
    for (let i = 0; i < addScheduleCnt; i++) {
      if (i !== addScheduleCnt - 1) {
        addScheduleArr.push(
          <div className="flex items-center gap-3 mb-5" key={i}>
            <div className="w-full">
              <StudioLectureCreateScheduleInput
                schedules={schedules}
                setSchedules={setSchedules}
              />
            </div>
            <CheckIcon
              id={i}
              className="text-accent"
              style={{ fontSize: "xx-large" }}
            />
          </div>
        );
      } else {
        addScheduleArr.push(
          <div className="flex items-center gap-3 mb-5" key={i}>
            <div className="w-full">
              <StudioLectureCreateScheduleInput
                schedules={schedules}
                setSchedules={setSchedules}
              />
            </div>
            <DeleteForeverIcon
              id={i}
              className="text-accent hover:cursor-pointer hover:text-success"
              style={{ fontSize: "xx-large" }}
              onClick={minusAddSchdulecnt}
            />
          </div>
        );
      }
    }
    return addScheduleArr;
  }

  //현재 날짜 계산
  const currentDate = new Date().toISOString().substring(0, 10);
  const [startDateValue, setStartDateValue] = useState(currentDate);

  //사이드바
  useEffect(() => {
    dispatch(getStudioDetail(user.userId));
    dispatch(getStudioLectureList(user.userId));
    dispatch(getStudioLiveLecture(user.userId));
  }, []);

  //데이터 전송
  const [imgFiles, setImgFiles] = useState([]); //미리보기, 이미지 데이터 전송
  const [schedules, setSchedules] = useState([]); //스케줄 데이터 전송
  const [imgTransfer, setImgTransfer] = useState([]); //이미지 데이터 전송 전용

  console.log("In StudioLectureCreatePage");
  console.log("imgTransfer = " + imgTransfer);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.persist();

    let arr = [1, 2, 3, 4];

    console.log("In StudioLectureCreatePage handleSubmit");
    console.log("imgTransfer = " + imgTransfer);
    console.log("arr = " + arr);

    let retFiles = [];

    for (let i = 0; i < imgTransfer.length; i++) {
      retFiles.push(imgTransfer[i]);
      console.log(i, "찍히나?", imgTransfer[i]);
    }

    console.log("retFiles = ", retFiles);
    console.log("typeof retFiles = ", typeof retFiles);

    // const date = new Date();
    // console.log("date!!!!!!!!!!! = " + date);

    const today = new Date();

    const year = today.getFullYear();
    const month = ("0" + (today.getMonth() + 1)).slice(-2);
    const day = ("0" + today.getDate()).slice(-2);

    const dateString = year + "-" + month + "-" + day;

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log("data = " + data);
    // let fileArr = imgFiles;

    // console.log("fileArr = " + fileArr);

    let scheduleList = schedules;
    console.log("schduleList = " + scheduleList);

    let VO = {
      userId: user.userId,
      yogaId: data.category,
      name: data.title,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      registDate: dateString,
      limitStudents: data.limitStudents,
      fee: "0",
      totalCount: "0",
    };

    console.log("VO = " + VO);

    // for(let i = 0; i < files.length; i++) {
    //     formData.append("files", files[i]);
    // }
    // formData.append("files", JSON.stringify(imgFiles));
    // formData.append("scheduleArr", JSON.stringify(scheduleList));
    // formData.append("vo", JSON.stringify(VO));

    let filesRet = [];
    for (let i = 0; i < imgTransfer.length; i++) filesRet.push(imgTransfer[0]);

    console.log("넣기 직전!!! imgTransfer", imgTransfer);
    let sendData = {
      files: [],
      vo: JSON.stringify(VO),
      scheduleArr: JSON.stringify(scheduleList),
    };

    for (let i = 0; i < imgTransfer.length; i++)
      sendData.files.push(imgTransfer[i]);

    console.log("sendData = ", sendData);
    console.log("sendData.files = ", sendData.files);
    console.log("sendData.vo = ", sendData.vo);
    console.log("sendData.scheduleArr ", sendData.scheduleArr);

    const formSendData = new FormData();

    for (let i = 0; i < imgTransfer.length; i++)
      formSendData.append("files", imgTransfer[i]);
    formSendData.append("vo", JSON.stringify(VO));
    formSendData.append("scheduleArr", JSON.stringify(scheduleList));

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/lectures`,
        /*sendData*/ formSendData,
        config
      )
      .then((response) => {
        console.log("OK!!!!");
        console.log("확인 :::",response.status);
        if(response.status !== 200) {
          Swal.fire({
            icon: "error",
            iconColor: "#EBE8DF",
            text: "강의 개설 정보를 다시 확인해 주세요.",
            confirmButtonColor: "#90859A",
            confirmButtonText: "확인",
          });
        } else {
          navigate("/studio");
        }
      })
      .catch((error) => {
        console.log("Error!!!!!!!!!!!!!");
        console.error("확인 :::", error);
        Swal.fire({
          icon: "error",
          iconColor: "#EBE8DF",
          text: "강의 개설 정보를 다시 확인해 주세요.",
          confirmButtonColor: "#90859A",
          confirmButtonText: "확인",
        });
      });

    // const postSurvey = await axios({
    //     method: "POST",
    //     url: `https://i8a504.p.ssafy.io/api/lectures`,
    //     mode: "cors",
    //     // headers: {
    //     //   "Content-Type": "multipart/form-data",
    //     // },
    //     data: sendData,
    //     config
    //   });

    //   console.log(postSurvey);
  };

  return (
    <>
      <div className="flex w-full">
        <StudioSidebar
          studioDetail={studio.studioDetail}
          userId={user.userId}
          studioLiveLecture={studio.studioLiveLecture}
        />
        <div className="px-40 flex-auto overflow-hidden">
          <form className="w-full mt-16" onSubmit={handleSubmit}>
            {/* 재활용 */}
            <div className="mb-3">
              <StudioLectureListCategorySelectBox />
            </div>

            {/* 강의 타이틀, 소개글 */}
            <div className="w-full">
              <input
                name="title"
                type="text"
                className={
                  Styles.focusNone + " input input-ghost input-lg w-full px-4"
                }
                placeholder="개설할 강좌명을 입력해 주세요."
              />
              <hr />
              <textarea
                name="description"
                className={
                  Styles.focusNone + " textarea textarea-bordered w-full my-7"
                }
                rows={7}
                placeholder="강좌에 대한 설명을 입력해 주세요."
              ></textarea>
              <hr />
            </div>

            {/* 수업 일정 */}
            <div className="my-7">
              <div className="flex items-center mb-4">
                <p className="text-lg text-success">수업 일정</p>
                <AddCircleIcon
                  className="ml-2 text-accent hover:cursor-pointer hover:text-success"
                  onClick={plusAddSchdulecnt}
                />
              </div>
              {addSchedules(addScheduleCnt)}
            </div>
            <div className="flex w-full justify-end">
              <div className="text-accent text-base mb-7">
                개설 기간 : &nbsp;{" "}
                <input
                  name="startDate"
                  type="date"
                  className="input input-primary border-2 w-40"
                  min={currentDate}
                  onChange={(e) => setStartDateValue(e.target.value)}
                  placeholder=""
                />
                &nbsp;&nbsp;-&nbsp;&nbsp;
                <input
                  name="endDate"
                  min={startDateValue}
                  type="date"
                  className="input input-primary border-2 w-40"
                  placeholder=""
                />
              </div>
            </div>
            <hr />

            {/* 수강 정원 */}
            <div className="text-accent text-lg my-7">
              총 수강 정원 &nbsp;{" "}
              <input
                name="limitStudents"
                type="number"
                max="10"
                className="input input-primary border-2 w-20 text-right"
                placeholder=""
              />{" "}
              &nbsp; 명
            </div>
            <hr />

            {/* 이미지 파일 업로드 */}
            <div className="my-7">
              <StudioLectureCreateImagesInput
                imgFiles={imgFiles}
                setImgFiles={setImgFiles}
                imgTransfer={imgTransfer}
                setImgTransfer={setImgTransfer}
              />
            </div>

            <div className="flex justify-end gap-2 pb-8">
              {/* 타입을 명확히 지정해 주지 않으면 submit과 혼동이 있을 수 있음 */}
              <button type="submit" className="btn btn-accent text-white px-12">
                개설하기
              </button>
              <button
                type="button"
                className="btn btn-primary px-12"
                onClick={() => navigate("/studioLectureListPage")}
              >
                뒤로가기
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default StudioLectureCreatePage;
