import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setMenuActive } from '../../Redux/Menu/Menu.slice';
import './Menu.css';
import { useState } from 'react';

export default function Menu() {
  const dispatch = useDispatch();
  const { menuActive } = useSelector((state) => state.Menu);

  const [burger, setBurger] = useState(false);

  const menu = ['Профиль', 'Активная бронь', 'История брони', 'Карта'];

  const getIndexMenu = (index) => {
    dispatch(setMenuActive(index));
  };

  return (
    <>
      <div className="gap-[15px] flex items-center">
        <div onClick={() => setBurger(!burger)} className="burger hidden">
          <span className={burger === true ? 'active' : ''}></span>
          <span className={burger === true ? 'active' : ''}></span>
          <span className={burger === true ? 'active' : ''}></span>
        </div>
        <Link to="/home" onClick={() => dispatch(setMenuActive(-1))}>
          <img height={40} width={120} src="/img/icons/logo.png" alt="logo" />
        </Link>
      </div>
      <div className={burger == true ? 'menu-block active' : 'menu-block'}>
        <nav className="flex gap-[20px] flex-wrap z-[999] menu">
          {menu.map((value, index) => (
            <Link
              key={value}
              to={index === 0 ? '/profile' : index === 1 ? '/active' : index === 2 ? '/history' : '/map'}>
              <button
                onClick={() => getIndexMenu(index)}
                className={
                  menuActive === index
                    ? 'w-[135px] h-[35px] bg-purple-color text-white rounded-[5px] text-[14px] font-medium'
                    : 'w-[135px] h-[35px] bg-[#D9D9D9] text-purple-color rounded-[5px] text-[14px] font-medium'
                }>
                {value}
              </button>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
