import React from 'react';
import useFetch from '../../Hooks/useFetch';
import { PHOTOS_GET } from '../../api';
import Error from '../Helper/Error';

import Loading from '../Helper/Loading';
import styles from './FeedPhotos.module.css';
import FeedPhotosItems from './FeedPhotosItems';

const FeedPhotos = ({ page, user, setModalPhoto, setInfinite }) => {
  const { data, loading, error, request } = useFetch();

  React.useEffect(() => {
    async function fetchPhotos() {
      const total = 6;
      const { url, options } = PHOTOS_GET({ page, total, user });
      const { response, json } = await request(url, options);
      console.log('Request:', json);
      if (response && response.ok && json.length < total) setInfinite(false);
    }
    fetchPhotos();
  }, [request, user, page, setInfinite]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data)
    return (
      <ul className={`${styles.feed} animeLeft`}>
        {data.map(photo => (
          <FeedPhotosItems key={photo.id} photo={photo} setModalPhoto={setModalPhoto} />
        ))}
      </ul>
    );
  else return null;
};

export default FeedPhotos;
