import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MyPageLoginCheck(user) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !user.userId) {
            navigate('/login');
        }
    }, [user, navigate]);
}

export default MyPageLoginCheck;