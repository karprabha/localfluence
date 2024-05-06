const { googleOAuthOptions } = require('../../../../config');

const getAccessToken = async (code) => {
  const response = await fetch('https://oauth2.googleapis.com/token?', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      ...googleOAuthOptions,
      code,
    }),
  });

  if (response.ok) {
    const { access_token } = await response.json();
    return access_token;
  } else {
    const err = await response.json();
    throw new Error(
      `Request failed with status ${response.status}: ${err.error_description}`,
    );
  }
};

const getUser = async (access_token) => {
  const response = await fetch(
    'https://www.googleapis.com/oauth2/v2/userinfo',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );

  if (response.ok) {
    const { given_name, family_name, email, picture } = await response.json();

    const user = {
      first_name: given_name,
      family_name,
      username: email,
      avatar_url: picture,
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
