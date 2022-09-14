import React, { useEffect } from 'react';
import { userInfoState } from 'store';
import styles from './Chatting.module.css';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState } from 'store';
import user from 'api/userInfo';
import { ProfileImageUploader, Chatting_drop } from 'components';
import userimg from 'assets/image/userimg.png';
import Fab from '@mui/material/Fab';
import { Link } from 'react-router-dom';

const Chatting = () => {
  const userAuth = useRecoilValue(authState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const email = userAuth.email;

  //   var selected_date = new Date(chat.updated_at);
  //   const updated_time = timeForToday(selected_date);

  const getUser = async () => {
    await user.getUserInfo(email).then((res) => {
      console.log(res.data);
      setUserInfo({
        nickname: res.data.nickname,
        social_profile: res.data.social_profile,
      });
      console.log(userInfo);
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  const userProfileImg = userInfo.social_profile;

  return (
    <div className={styles.chattingbox}>
      <div className={styles.opponentInfobox}>
        <div className={styles.Mypage_profileImgbox}>
          {userProfileImg ? <img className={styles.Mypage_profileImg} src={userInfo.social_profile} /> : <img className={styles.Mypage_profileImg} src={userimg} />}
        </div>
        <div className={styles.Chatting_Nicknamebox}>
          {userInfo.nickname}[닉넴]
          <Link to="/Review_Write">
            <Fab variant="extended" sx={{ width: '8rem', bgcolor: '#f8bbd0', ml: '1rem', mr: '1rem', fontWeight: 'bolder' }}>
              거래완료
            </Fab>
          </Link>
        </div>

        <Chatting_drop />
      </div>

      <div className={styles.userchattingbox}>
        <div className={styles.userchatting}>아 채팅 눈물나는데요</div>
      </div>

      <div className={styles.opponentchattingbox}>
        <div className={styles.opponentchatting}>으으상대방</div>
      </div>

      <div className={styles.chat_inputbox}>
        <input className={styles.chat_input} placeholder="메세지를 입력하세요" type="text" />
        <div className={styles.image_uploader_wrap}>{/* <ProfileImageUploader /> */}</div>
      </div>
    </div>
  );
};

export default Chatting;
