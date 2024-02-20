import ProfileInfo from '../../components/Profile/ProfileInfo';
import ProfileContacts from '../../components/Profile/ProfileContacts';
import PersonalDate from '../../components/Profile/PersonalDate';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setInfoUser,
  setLoaded,
  setTextEmail,
  setTextNumber,
} from '../../Redux/Profile/ProfileInfo.slice';
import { setIsAuth } from '../../Redux/Login/Login.slice';
import { $profile } from '../../Api/http';
import Loading from '../../components/Loading';
import { setLoadedProfile } from '../../Redux/Profile/LoadedProfile.slice';
import { useNavigate } from 'react-router-dom';
import { setMessageCompleted } from '../../Redux/Profile/VerificationCode/VerificationCode.slice';


export default function Profile() {
  const navigate = useNavigate();
  const loaded = useSelector((state) => state.ProfileInfo.loaded);
  const { loadingChangeEmail } = useSelector((state) => state.VerificationCode);
  const loadedProfile = useSelector((state) => state.LoadedProfile.loadedProfile);
  const dispatch = useDispatch();

  const onClickExit = () => {
    localStorage.removeItem('access');
    dispatch(setIsAuth(false));
    dispatch(setLoaded(true));
    navigate('/login');
    dispatch(setLoaded(false));
    dispatch(setMessageCompleted({}))
    dispatch(setLoadedProfile(true));
  };

  useEffect(() => {
    const fetchProfile = async () => {
      dispatch(setLoaded(true));
      try {
        const response = await $profile.get('profile', {
          headers: {
            Authorization: `JWT ${localStorage.getItem('access')}`,
          },
        });
        dispatch(setInfoUser(response.data));
        console.log(response.data);
        dispatch(setTextEmail(response.data.email));
        dispatch(setTextNumber(response.data.phone));
        dispatch(setLoaded(false));

      } catch (error) {
        console.log(error);
        dispatch(setLoaded(false));
      }
    };
    if (loadedProfile) {
      fetchProfile();
    }
    dispatch(setMessageCompleted({}))
    dispatch(setLoadedProfile(false));
  }, [loadedProfile]);

  return (
    <div className="w-full flex items-center justify-center mt-[40px]">
      <div className="bg-purple-color h-[820px] w-full max-w-[1330px] rounded-[8px] px-[60px] pb-[60px] pt-[20px] overflow-hidden relative">
        {loaded || loadingChangeEmail ? (
          <Loading />
        ) : (
          <>
            <h3 className="text-center font-bold text-[26px] mb-[40px]">ПРОФИЛЬ</h3>
            <ProfileInfo />
            <ProfileContacts />
            <PersonalDate />
            <div className="flex justify-center">
              <button onClick={onClickExit} className="w-[100px] bg-red h-[35px] rounded-[6px]">
                Выйти
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
