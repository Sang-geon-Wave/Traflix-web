import { useEffect } from 'react';
import useRootData from '../../hooks/useRootData';
import { useNavigate } from 'react-router-dom';

const MypageDirection = () => {
  const {} = useRootData(() => ({}));

  const navigate = useNavigate();

  useEffect(() => {
    navigate('/directions');
  }, []);

  return <div>마이 페이지로 이동 중</div>;
};

export default MypageDirection;
