import {useState} from 'react'
import { Navigate } from 'react-router-dom'

const Home = () => {
  const [a ,sa] = useState(false)
  const mySessionId = '20';
  const myUserName = '황아영';
  const myUserType = '강사';


  return (
    <div>
      <div>
        Home
      </div>
      <button onClick={() => sa(true)}>go Live</button>
      {
        a ? <Navigate to='/vidu' state={{mySessionId : mySessionId, myUserName : myUserName, myUserType : myUserType}}/> : null
      }
    </div>
  )
}

export default Home


