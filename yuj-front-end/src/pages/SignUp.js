import React, { useState } from "react";
import axios from "axios";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Link } from "react-router-dom";
import Styles from "./LoginPage.module.css";

const SignUp = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");

  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  const [roleName, setRoleName] = useState("ROLE_USER");

  const getDaysInMonth = (year, month) => {
    if (month === 2) {
      if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
        return 29;
      } else {
        return 28;
      }
    } else if ([4, 6, 9, 11].includes(month)) {
      return 30;
    } else {
      return 31;
    }
  };

  // const handleRadioChange = (event) => {
  //   setIsTeacher(event.target.value === "teacher");

  //   console.log("isTeacher = " + isTeacher);
  // };

  const handleSubmit = (event) => {
    let birthday = year + "-" + month + "-" + day;

    event.preventDefault();
    // Submit the form data to the server here
    console.log("userId = " + userId);
    console.log("password = " + password);
    console.log("username = " + username);

    // if (isTeacher) role = "ROLE_TEACHER";
    // else role = "ROLE_USER";

    console.log("gender = " + gender);
    console.log("birthday = " + birthday);
    console.log("nickname = " + nickname);
    console.log("email = " + email);
    console.log("phone = " + phone);
    console.log("profileImg = " + profileImg);

    let signUpDto = {
      id: userId,
      password: password,
      name: username,
      gender: gender,
      birthDate: birthday,
      nickname: nickname,
      email: email,
      phone: phone,
      profileImagePath: null,
      roleName: roleName,
    };

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    const dtoString = JSON.stringify(signUpDto);

    let sendData = {
      files: profileImg,
      dto: dtoString,
    };

    console.log("sendData.files = ", sendData.files);
    console.log("sendData.dto = ", sendData.dto);
    console.log(`${process.env.REACT_APP_API_URL}/users`);

    axios
      .post(`${process.env.REACT_APP_API_URL}/users`, sendData, config)
      .then((response) => {
        console.log("OK!!!!");
        console.log(response.data);
        window.location.replace("/"); //  로그인 성공 시 화면 이동
      })
      .catch((error) => {
        console.log("Error!!!!!!!!!!!!!");
        alert('회원 가입 정보를 다시 확인해 주세요.');
        console.error(error);
      });
  };

  const daysInSelectedMonth =
    month && year ? getDaysInMonth(year, Number(month)) : null;

  return (
    <div className={"px-52 w-full"}>
      <div
        className={
          Styles[`info-background-image`] +
          " w-full flex items-center justify-center overflow-hidden"
          // "w-full"
        }
        style={{ height: "calc(100vh - 125px)" }}
      >
        <form className="w-full mt-16" onSubmit={handleSubmit}>
          <div className="flex auto">
            <span
              className={
                "py-8 px-8 rounded-xl card bg-base-200 " +
                Styles[`signin-info-container`]
              }
            >
              <p className={"text-3xl mb-3 ml-1 text-black font-bold"}>
                회원 가입
              </p>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-xs text-black font-bold">
                    아이디 :{" "}
                  </span>
                </label>
                <input
                  type="text"
                  name="id"
                  placeholder=""
                  className={"bg-opacity-50 input rounded-xl input-sm"}
                  maxLength={16}
                  onChange={(e) => setUserId(e.target.value)}
                />
                <label className="label">
                  <span className="label-text-alt"></span>
                  <span className="label-text-alt"></span>
                </label>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-xs text-black font-bold">
                    비밀번호 :{" "}
                  </span>
                </label>
                <input
                  type="password"
                  placeholder=""
                  className={"bg-opacity-50 input rounded-xl input-sm"}
                  minLength={6}
                  maxLength={16}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="label">
                  <span className="label-text-alt"></span>
                  <span className="label-text-alt"></span>
                </label>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-xs text-black font-bold">
                    이름 :{" "}
                  </span>
                </label>
                <input
                  type="text"
                  placeholder=""
                  id="username"
                  value={username}
                  className={"bg-opacity-50 input rounded-xl input-sm"}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label className="label">
                  <span className="label-text-alt"></span>
                  <span className="label-text-alt"></span>
                </label>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-xs text-black font-bold">
                    성별 :{" "}
                  </span>
                </label>
                <select
                  id="gender-select"
                  className={"bg-opacity-50 input rounded-xl input-sm"}
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option
                    className={"bg-opacity-50 input rounded-xl input-sm"}
                    value=""
                  >
                    선택해주세요
                  </option>
                  <option
                    className={"bg-opacity-50 input rounded-xl input-sm"}
                    value="남성"
                  >
                    남성
                  </option>
                  <option
                    className={"bg-opacity-50 input rounded-xl input-sm"}
                    value="여성"
                  >
                    여성
                  </option>
                </select>
                <label className="label">
                  <span className="label-text-alt"></span>
                  <span className="label-text-alt"></span>
                </label>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-xs text-black font-bold">
                    생년월일 :{" "}
                  </span>
                </label>
                <span className="flex gap-2">
                  <select
                    className={"bg-opacity-50 input rounded-xl input-sm grow"}
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  >
                    <option className={" input rounded-xl input-sm"} value="">
                      --년도--
                    </option>
                    {Array.from(
                      { length: 50 },
                      (_, i) => new Date().getFullYear() - i
                    ).map((y) => (
                      <option
                        className={" input rounded-xl input-sm"}
                        key={y}
                        value={y}
                      >
                        {y}
                      </option>
                    ))}
                  </select>
                  <select
                    className={"bg-opacity-50 input rounded-xl input-sm grow"}
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                  >
                    <option className={" input rounded-xl input-sm"} value="">
                      --월--
                    </option>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                      <option
                        className={" input rounded-xl input-sm"}
                        key={m}
                        value={m.toString().padStart(2, "0")}
                      >
                        {m.toString().padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                  {
                    <select
                      className={"bg-opacity-50 input rounded-xl input-sm grow"}
                      value={day}
                      onChange={(e) => setDay(e.target.value)}
                    >
                      <option value="">--일--</option>
                      {Array.from(
                        { length: daysInSelectedMonth },
                        (_, i) => i + 1
                      ).map((d) => (
                        <option key={d} value={d.toString().padStart(2, "0")}>
                          {d.toString().padStart(2, "0")}
                        </option>
                      ))}
                    </select>
                  }
                </span>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-xs text-black font-bold">
                    강사여부 :{" "}
                  </span>
                </label>
                <select
                  id="rolename-select"
                  className={"bg-opacity-50 input rounded-xl input-sm"}
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                >
                  <option
                    className={"bg-opacity-50 input rounded-xl input-sm"}
                    value=""
                  >
                    선택해주세요
                  </option>
                  <option
                    className={"bg-opacity-50 input rounded-xl input-sm"}
                    value="ROLE_TEACHER"
                  >
                    강사
                  </option>
                  <option
                    className={"bg-opacity-50 input rounded-xl input-sm"}
                    value="ROLE_USER"
                  >
                    수강생
                  </option>
                </select>
                <label className="label">
                  <span className="label-text-alt"></span>
                  <span className="label-text-alt"></span>
                </label>
              </div>
            </span>

            <span
              className={
                "py-8 px-8 rounded-xl card bg-base-200 " +
                Styles[`signin-info-container`]
              }
              style={{ height: "fit-content" }}
            >
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-xs text-black font-bold">
                    닉네임 :{" "}
                  </span>
                </label>
                <input
                  type="text"
                  id="nickname"
                  className={"bg-opacity-50 input rounded-xl input-sm"}
                  minLength={6}
                  maxLength={16}
                  value={nickname}
                  onChange={(event) => setNickname(event.target.value)}
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-xs text-black font-bold">
                    이메일 :{" "}
                  </span>
                </label>
                <input
                  type="email"
                  id="email"
                  className={"bg-opacity-50 input rounded-xl input-sm"}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-xs text-black font-bold">
                    연락처 :{" "}
                  </span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  className={"bg-opacity-50 input rounded-xl input-sm"}
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                />
              </div>

              {/* <label htmlFor="profileImg">Profile Image:</label>
              <input
                type="file"
                id="profileImg"
                hidden
                onChange={(event) => setProfileImg(event.target.files[0])}
              /> */}

              {/* <label htmlFor="profileImg">
                <div className={Styles.btnUpload}>
                  <AddCircleOutlineIcon style={{ fontSize: "xx-large" }} />
                </div>
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(event) => setProfileImg(event.target.files[0])}
                className="hidden"
                id="profileImg"
              /> */}

              <div className="flex flex-wrap justify-center items-center gap-3 mt-8">
                <label htmlFor="file" className="hover:cursor-pointer">
                  <div className={Styles.btnUpload}>
                    <AddCircleOutlineIcon className="text-success hover:text-accent" style={{ fontSize: "xx-large" }} />
                  </div>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(event) => setProfileImg(event.target.files[0])}
                  className="hidden"
                  id="file"
                />
              </div>

              <div className="flex flex-col justify-end items-end mt-5">
                <button
                  type="submit"
                  className={
                    "btn btn-xs btn-accent " + Styles[`mypage-save-button`]
                  }

                >
                  회원등록
                </button>
                <p className={"text-xs mt-3"}>
                  이미 가입한 회원입니까?{" "}
                  <Link to={"/login"} className={"text-black font-bold"}>
                    {" "}
                    로그인
                  </Link>
                </p>
              </div>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
