import React from 'react';
import Commenta from '../../Assets/enviar.svg';
import useFetch from './../../Hooks/useFetch';
import { COMMENT_POST } from '../../api';
import Error from '../../Helpers/Error';
import styles from './PhotoCommentsForm.module.css';

const PhotoCommentsForm = ({ id, SetComments }) => {
  const [comment, setComment] = React.useState('');
  const { request, error } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();
    const { url, options } = COMMENT_POST(id, { comment });
    const { response, json } = await request(url, options);
    if (response.ok) {
      SetComments('');
      SetComments(comments => [...comments, json]);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        className={styles.textarea}
        id="comment"
        name="comment"
        placeholder="Comente"
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <button className={styles.button}>
        <img src={Commenta} alt="Comentarios" />
      </button>
      <Error error={error} />
    </form>
  );
};

export default PhotoCommentsForm;
