import React from 'react';

const UserPost = () => {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSubmit(event) {
    event.preventDefault();

    fetch('https://dogsapi.origamid.dev/json/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    })
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(json => {
        console.log(json);
        return json;
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        ></input>
        <input type="text" value={email} onChange={({ target }) => setEmail(target.value)}></input>
        <input
          type="text"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        ></input>
        <button> Enviar </button>
      </form>
    </div>
  );
};

export default UserPost;
