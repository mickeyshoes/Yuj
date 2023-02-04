import { useLocation } from 'react-router-dom';
import Vidu from '../pages/ViduTeacher';
const FunctionalizedVidu = ({...rest}) => {
    const { state } = useLocation();
    
    return <>
        <Vidu navigationState={state} {...rest} />
    </>
};

export default FunctionalizedVidu