import './index.css';
import Menu from '../../../Menu';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setMapButtonActive, setMenuActive } from '../../../../Redux/Menu/Menu.slice';
import { useEffect, useRef } from 'react';

export default function HeaderAuthorized() {
  const headerRef = useRef();
  const { messageCompleted } = useSelector((state) => state.VerificationCode);
  const messageCompletedActiveReselve = useSelector((state) => state.ActiveReselve.messageCompleted);
  const dispatch = useDispatch();
  const { infoUser } = useSelector((state) => state.ProfileInfo);

  const onClickNickName = () => {
    dispatch(setMenuActive(0));
    dispatch(setMapButtonActive(false));
  };

  useEffect(() => {
    if (messageCompleted.message || messageCompletedActiveReselve) {
      headerRef.current.scrollIntoView({behavior: 'smooth'})
    }
  }, [messageCompleted, messageCompletedActiveReselve])


  return (
    <header ref={headerRef} className="bg-white h-[80px] border-b-[3px] flex items-center flex-wrap z-[999]">
      <div className="flex justify-between items-center w-full max-w-[1530px] mx-auto px-[20px] flex-wrap">
        <Menu />
        <Link onClick={onClickNickName} to="/profile">
          <div className="flex items-center gap-[10px]">
            <div className="rounded-[50%] overflow-hidden w-[50px] h-[50px] border-[2px] border-red flex justify-center items-center ">
              <img
                className="w-full h-auto block"
                src={`http://localhost:8000${infoUser.image}`}
                alt=""
              />
            </div>
            <p className="text-purple-color font-[500]">{infoUser.first_name}</p>
          </div>
        </Link>
      </div>
    </header>
  );
}
