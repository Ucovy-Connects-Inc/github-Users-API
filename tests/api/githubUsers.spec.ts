import { test, expect } from '@playwright/test';
import { getAPI } from '../../utils/apiHelper';

test('Validate GitHub users API', async ({ request }) => {

  const response = await getAPI(request, '/users');

  expect(response.status()).toBe(200);

  const users = await response.json();

  expect(users.length).toBeGreaterThan(0);
  expect(users[0]).toHaveProperty('login');
  expect(users[0]).toHaveProperty('id');
  expect(users[0]).toHaveProperty('avatar_url');

});

test('Validate specific GitHub user', async ({ request }) => {

  const response = await getAPI(request, '/users/octocat');

  expect(response.status()).toBe(200);

  const user = await response.json();

  expect(user.login).toBe('octocat');
  expect(user).toHaveProperty('id');
  expect(user).toHaveProperty('avatar_url');

});

test('Validate invalid GitHub user returns 404', async ({ request }) => {

  const response = await getAPI(request, '/users/invalid-user-12345');

  expect(response.status()).toBe(404);

});

test('Validate GitHub rate limit headers', async ({ request }) => {

  const response = await getAPI(request, '/users');

  const headers = response.headers();

  console.log("Rate Limit:", headers['x-ratelimit-limit']);
  console.log("Remaining:", headers['x-ratelimit-remaining']);

  expect(headers['x-ratelimit-limit']).toBeDefined();

});

test('Validate user to repo flow (API chaining)', async ({ request }) => {

  const usersResponse = await getAPI(request, '/users');
  expect(usersResponse.status()).toBe(200);

  const users = await usersResponse.json();
  const username = users[0].login;

  console.log("Selected User:", username);

  const repoResponse = await getAPI(request, `/users/${username}/repos`);
  expect(repoResponse.status()).toBe(200);

  const repos = await repoResponse.json();

  console.log("Repo count:", repos.length);

  expect(repos.length).toBeGreaterThanOrEqual(0);

});