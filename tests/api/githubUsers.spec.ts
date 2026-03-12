import { test, expect } from '@playwright/test';
import { getRequest } from '../../utils/apiHelper';

const baseURL = 'https://api.github.com';

test('Validate GitHub users API', async ({ request }) => {

  const response = await getRequest(request, `${baseURL}/users`);

  expect(response.status()).toBe(200);

  const users = await response.json();

  expect(users.length).toBeGreaterThan(0);

  expect(users[0]).toHaveProperty('login');
  expect(users[0]).toHaveProperty('id');
  expect(users[0]).toHaveProperty('avatar_url');

});
test('Validate specific GitHub user', async ({ request }) => {

  const response = await getRequest(request, `${baseURL}/users/octocat`);

  expect(response.status()).toBe(200);

  const user = await response.json();

  expect(user.login).toBe('octocat');
  expect(user).toHaveProperty('id');
  expect(user).toHaveProperty('avatar_url');

});
test('Validate invalid GitHub user returns 404', async ({ request }) => {

  const response = await getRequest(request, `${baseURL}/users/invalid-user-12345`);

  expect(response.status()).toBe(404);

});
test('Validate GitHub rate limit headers', async ({ request }) => {

  const response = await getRequest(request, `${baseURL}/users`);

  const headers = response.headers();

  console.log("Rate Limit:", headers['x-ratelimit-limit']);
  console.log("Remaining:", headers['x-ratelimit-remaining']);

  expect(headers['x-ratelimit-limit']).toBeDefined();

});