import React, { useState } from 'react';
import axios from 'axios';
import Styles from './LoginPage.module.css';

//  윤년, 평년 고려해서 각 월 별로 존재하는 일수 계산
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


const SignUp = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  //
  // const [birthday, setBirthday] = useState('');
  //

  //  년, 월, 일 상태
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  const daysInSelectedMonth = month && year ? getDaysInMonth(year, Number(month)) : null;

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profileImg, setProfileImg] = useState(null);
  //
  const [isTeacher, setIsTeacher] = useState(false);
  //

  const [roleName, setRoleName] = useState("ROLE_USER");

  const handleRadioChange = (event) => {
    setIsTeacher(event.target.value === "teacher");

    console.log("isTeacher = " + isTeacher);
  };

  const handleSubmit = (event) => {
    let role = "";
    let birthday = year + "-" + month + "-" + day;

    event.preventDefault();
    // Submit the form data to the server here
    console.log("userId = " + userId);
    console.log("password = " + password);
    console.log("username = " + username);

    if(isTeacher)
      role = "ROLE_TEACHER";
    else
      role = "ROLE_USER";
    
    console.log("gender = " + gender);
    console.log("birthday = " + birthday);
    console.log("nickname = " + nickname);
    console.log("email = " + email);
    console.log("phone = " + phone);
    console.log("profileImg = " + profileImg);
    console.log("roleName = " + roleName);

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
      roleName: role
    }

    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    const dtoString = JSON.stringify(signUpDto);

    let sendData = {
      files : profileImg,
      dto: dtoString
    }

    console.log("sendData.files = ", sendData.files);
    console.log("sendData.dto = ", sendData.dto);
    console.log(`${process.env.REACT_APP_API_URL}/users`);

    // axios.post('${process.env.REACT_APP_API_URL}/users', sendData, config)
    axios.post(`${process.env.REACT_APP_API_URL}/users`, sendData, config)
      .then(response => {
      console.log("OK!!!!");
      console.log(response.data);
      // window.location.replace("/"); //  로그인 성공 시 화면 이동
    })
    .catch(error => {
      console.log("Error!!!!!!!!!!!!!");
      console.error(error);
    });
    
  };

  return (
    <div className={Styles[`info-background-image`] + ' w-full flex items-center justify-center'}>
      <form onSubmit={handleSubmit}>
        <div>
        <label htmlFor="userId">아이디:</label>
        <br/>
          <input type="text" id="userId" value={userId} onChange={(event) => setUserId(event.target.value)} />
        <br />
        <label htmlFor="password">비밀번호:</label>
        <br/>
          <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <br />
        <label htmlFor="username">이름:</label>
        <br />
          <input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)} />
        <br />
        <label htmlFor="gender">성별:</label>
        <br/>
        <select id = "gender" name="gender" onChange={(event) => setGender(event.target.value)}>
          <option value="">성별 선택</option>
          <option value="남성">남성</option>
          <option value="여성">여성</option>
        </select>
        <br />
        <label htmlFor="birthday">생년월일:</label>
        <br />
        <div>
        <select id = "year_select_id" name="year_select_name" onChange={(event) => setYear(event.target.value)}>
          <option value="">--년도--</option>
          {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        <select id = "month_select_id" name="month_select_name" onChange={(event) => setMonth(event.target.value)}>
          <option value="">--월--</option>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
            <option key={m} value={m.toString().padStart(2, '0')}>
              {m.toString().padStart(2, '0')}
            </option>
          ))}
        </select>
          <select value={day} onChange={(event) => setDay(event.target.value)}>
            <option value="">--일--</option>
            {Array.from({ length: daysInSelectedMonth }, (_, i) => i + 1).map((d) => (
              <option key={d} value={d.toString().padStart(2, '0')}>
                {d.toString().padStart(2, '0')}
              </option>
            ))}
          </select>
          </div>
          <label htmlFor="rolename">강사 여부:</label>
          <br />
          <select id = "gender" name="gender" onChange={(event) => setRoleName(event.target.value)}>
            <option value="">강사 여부</option>
            <option value="ROLE_TEACHER">강사</option>
            <option value="ROLE_USER">수강생</option>
          </select>    
          </div>
        <br />
        <br />

        <div>
        <label htmlFor="nickname">닉네임:</label>
        <br />
          <input type="text" id="nickname" value={nickname} onChange={(event) => setNickname(event.target.value)} />
        <br />
        <br />

        <label htmlFor="email">이메일:</label>
        <br />
          <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        <br />
        <br />

        <label htmlFor="phone">연락처:</label>
        <br />
          <input type="tel" id="phone" value={phone} onChange={(event) => setPhone(event.target.value)} />
        <br />
        <br />

        <label htmlFor="profileImg">Profile Image:</label>
          <input type="file" id="profileImg" onChange={(event) => setProfileImg(event.target.files[0])} />
        <br />
        <br />

        <br/>
        <br/>

        <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;