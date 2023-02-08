import React, { useState } from 'react';
import axios from 'axios';

const Signin = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profileImg, setProfileImg] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit the form data to the server here
    console.log("userId = " + userId);
    console.log("password = " + password);
    console.log("username = " + username);
    
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
      id: "jwelyl",
      password: "1234",
      name: "허재성",
      gender: "male",
      birthDate: "1995-02-23",
      nickname: "코레이",
      email: "cork2586@naver.com",
      phone: " 010-5209-5605",
      profileImagePath: "사진경로",
      role: "ROLE_USER"
    }

    axios.post('https//i8a504.p.ssafy.io', signUpDto)
      .then(response => {
      console.log("OK!!!!");
      console.log(response.data);
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

      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <br />
      <br />

      <label htmlFor="gender">Gender:</label>
      <input
        type="radio"
        id="male"
        name="gender"
        value="male"
        checked={gender === 'male'}
        onChange={(event) => setGender(event.target.value)}
      />
      <label htmlFor="male">Male</label>
      <input
        type="radio"
        id="female"
        name="gender"
        value="female"
        checked={gender === 'female'}
        onChange={(event) => setGender(event.target.value)}
      />
      <label htmlFor="female">Female</label>
      <br />
      <br />

      <label htmlFor="birthday">Birthday:</label>
      <input
        type="date"
        id="birthday"
        value={birthday}
        onChange={(event) => setBirthday(event.target.value)}
      />
      <br />
      <br />

      <label htmlFor="nickname">Nickname:</label>
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

      <button type="submit">Submit</button>
    </form>
  );
};

export default Signin;