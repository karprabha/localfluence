const { githubOAuthOptions } = require('../../../../config');

const getAccessToken = async (code) => {
  const response = await fetch('https://github.com/login/oauth/access_token?', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      ...githubOAuthOptions,
      code,
    }),
  });

  if (response.ok) {
    const { access_token } = await response.json();
    return access_token;
  } else {
    throw Error(response.statusText);
  }
};

const getUser = async (access_token) => {
  const response = await fetch('https://api.github.com/user', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (response.ok) {
    const { login, avatar_url, name } = await response.json();

    const user = {
      first_name: name.split(' ')[0] || '',
      family_name: name.split(' ').slice(1).join(' ') || '',
      username: login,
      avatar_url,
    };

    return user;
  } else {
    throw Error(response.statusText);
  }
};

module.exports = {
  getAccessToken,
  getUser,
};
