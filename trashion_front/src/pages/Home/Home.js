import React, { useState, useEffect } from 'react';
import { Navbar, Footer, Category, ProductList, LocationCategory, PostButton, LocationProductList } from 'components';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import hangjungdong from 'utils/hangjungdong';
import locationApi from 'api/locationApi';
import styles from './Home.module.css';
import { useRecoilValue, useResetRecoilState, useRecoilState } from 'recoil';
import { locationState, categoryState } from 'store';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function Home() {
  const [chipIndex, setChipIndex] = useState(0);
  const [locationIndex, setLocationIndex] = useState(0);
  const [locationList, setLocationList] = useState({});
  const [cityInfo, setCityInfo] = useRecoilState(locationState);
  const categoryInfo = useRecoilValue(categoryState);
  const { sido, sigugun, dong } = hangjungdong;
  const [chipData, setChipData] = useState([]);
  const [productList, setProductList] = useState([]);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    setCityInfo({ city: '', dong: '', gu: '' });
    setLocationList([]);
    setLocationIndex(0);
  };

  const getProductList = async (item) => {
    await locationApi.getfilteredItem(item.cityInfo.city, item.cityInfo.gu, item.cityInfo.dong, item.big_category, item.small_category).then((res) => {
      setProductList(res.data.results);
      console.log('res: ', res);
    });
  };

  const addLocation = () => {
    let city =
      sido.filter((el) => el.sido === cityInfo.city)[0]?.codeNm +
      ' ' +
      sigugun.filter((el) => el.sido === cityInfo.city && el.sigugun === cityInfo.gu)[0]?.codeNm +
      ' ' +
      dong.filter((el) => el.sido === cityInfo.city && el.sigugun === cityInfo.gu && el.dong === cityInfo.dong)[0]?.codeNm;
    if (!cityInfo.city || !cityInfo.gu || !cityInfo.dong) {
      alert('지역을 선택 해 주세요!');
      return;
    }
    if (locationIndex < 1) {
      setLocationList([]);
      setLocationList({ key: locationIndex, cityInfo, big_category: categoryInfo.bigCategory, small_category: categoryInfo.smallCategory });
      setChipData([...chipData, { key: chipIndex, label: city }]);
      setChipIndex(() => chipIndex + 1);
      setLocationIndex(() => locationIndex + 1);
    } else {
      alert('지역은 최대 한 곳만 설정 가능합니다!');
      return;
    }
  };

  useEffect(() => {
    getProductList(locationList);
    console.log(locationList);
  }, [locationList]);

  useEffect(() => {
    setLocationList({ key: locationIndex, cityInfo, big_category: categoryInfo.bigCategory, small_category: categoryInfo.smallCategory });
    getProductList(locationList);
    console.log(categoryInfo);
  }, [categoryInfo]);

  useEffect(() => {
    setLocationList([]);
    setLocationIndex(0);
    setChipIndex(0);
    setChipData([]);
    console.log(chipData);
  }, []);

  return (
    <div>
      <Navbar />

      <div className={styles.main}>
        <div className={styles.category}>
          <Category />
        </div>
        <div className={styles.wrap_content}>
          <div className={styles.locationWrap}>
            <LocationCategory />
            <div className={styles.buttonWrap}>
              <div>
                <PostButton text={'추가하기'} onClick={addLocation} />
              </div>
            </div>
          </div>
          <div className={styles.locationChipWrap}>
            <Paper
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0.5,
                ml: 14,
                width: 1300,
              }}
              component="ul"
            >
              {chipData.map((data) => {
                let icon;
                if (data.label === 'React') {
                  icon = <TagFacesIcon />;
                }
                return (
                  <ListItem key={data.key}>
                    <Chip icon={icon} label={data.label} onDelete={handleDelete(data)} />
                  </ListItem>
                );
              })}
            </Paper>
          </div>

          <ul className={styles.contents}>{chipData.length || categoryInfo.bigCategory ? <LocationProductList productList={productList} /> : <ProductList />}</ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}
