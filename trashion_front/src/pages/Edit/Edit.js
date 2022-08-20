import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductStateContext } from '../../App';
import { ProductEditor } from 'components';

const Edit = () => {
  const [originData, setOriginData] = useState();

  const navigate = useNavigate();
  const { id } = useParams();

  const productList = useContext(ProductStateContext);

  useEffect(() => {
    if (productList.length >= 1) {
      const targetProduct = productList.find((it) => parseInt(it.id) === parseInt(id));

      if (targetProduct) {
        setOriginData(targetProduct);
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [id, productList]);

  return (
    <div>
      <div>{originData && <ProductEditor isEdit={true} originData={originData} />}</div>
    </div>
  );
};

export default Edit;
