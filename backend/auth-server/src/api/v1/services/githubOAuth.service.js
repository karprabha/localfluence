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

  const gitHubUserEmailsResponse = await fetch(
    'https://api.github.com/user/emails',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );

  if (response.ok && gitHubUserEmailsResponse.ok) {
    const { avatar_url, name } = await response.json();
    const gitHubUserEmails = await gitHubUserEmailsResponse.json();

    const user = {
      name,
      username: gitHubUserEmails[0].email,
      avatar_url,
    };

    return user;
  } else if (!response.ok) {
    throw Error(response.statusText);
  } else {
    throw Error(gitHubUserEmailsResponse.statusText);
  }
};

module.exports = {
  getAccessToken,
  getUser,
};
