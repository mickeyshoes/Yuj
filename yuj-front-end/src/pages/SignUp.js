import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profileImg, setProfileImg] = useState(null);
  const [isTeacher, setIsTeacher] = useState(false);

  const handleRadioChange = (event) => {
    setIsTeacher(event.target.value === "teacher");

    console.log("isTeacher = " + isTeacher);
  };

  const handleSubmit = (event) => {
    let role = "";

    event.preventDefault();
    // Submit the form data to the server here
    console.log("userId = " + userId);
    console.log("password = " + password);
    console.log("username = " + username);

    if(isTeacher)
      role = "ROLE_TEACHER";
    else
      role = "ROLE_USER";
    
    if(gender === 'male') {
      console.log("남자!!!!!!");
      setGender("남자");
    } else {
      console.log("여자");
      setGender("여자");
    }
    
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

    axios.post('https://i8a504.p.ssafy.io/api/users', sendData, config)
    // axios.post('http://localhost:5000/users', sendData, config)
      .then(response => {
      console.log("OK!!!!");
      console.log(response.data);
      window.location.replace("/"); //  로그인 성공 시 화면 이동
    })
    .catch(error => {
      console.log("Error!!!!!!!!!!!!!");
      console.error(error);
    });
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="userId">ID:</label>
      <input
        type="text"
        id="userId"
        value={userId}
        onChange={(event) => setUserId(event.target.value)}
      />
      <br />
      <br />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <br />
      <br />

      <label htmlFor="username">이름:</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <br />
      <br />

      <label htmlFor="gender">성별:</label>
      <input
        type="radio"
        id="male"
        name="gender"
        value="male"
        checked={gender === 'male'}
        onChange={(event) => setGender(event.target.value)}
      />
      <label htmlFor="male">남성</label>
      <input
        type="radio"
        id="female"
        name="gender"
        value="female"
        checked={gender === 'female'}
        onChange={(event) => setGender(event.target.value)}
      />
      <label htmlFor="female">여성</label>
      <br />
      <br />

      <label htmlFor="birthday">생년월일:</label>
      <input
        type="date"
        id="birthday"
        value={birthday}
        onChange={(event) => setBirthday(event.target.value)}
      />
      <br />
      <br />

      <label htmlFor="nickname">닉네임:</label>
      <input
        type="text"
        id="nickname"
        value={nickname}
        onChange={(event) => setNickname(event.target.value)}
      />
      <br />
      <br />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <br />
      <br />

      <label htmlFor="phone">Phone:</label>
      <input
        type="tel"
        id="phone"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
      />
      <br />
      <br />

      <label htmlFor="profileImg">Profile Image:</label>
      <input
        type="file"
        id="profileImg"
        onChange={(event) => setProfileImg(event.target.files[0])}
      />
      <br />
      <br />

      <div>
<label>
<input
         type="radio"
         name="role"
         value="student"
         checked={!isTeacher}
         onChange={handleRadioChange}
       />
수강생
</label>
<label>
<input
         type="radio"
         name="role"
         value="teacher"
         checked={isTeacher}
         onChange={handleRadioChange}
       />
강사
</label>
</div>
       <br/>
       <br/>

      <button type="submit">Submit</button>
    </form>
  );
};

export default SignUp;