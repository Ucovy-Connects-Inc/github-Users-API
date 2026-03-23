import { APIRequestContext, APIResponse } from '@playwright/test';

const baseURL = 'https://api.github.com';

export async function getAPI(
  request: APIRequestContext,
  endpoint: string
): Promise<APIResponse> {

  const response = await request.get(`${baseURL}${endpoint}`);

  return response; // 🔥 IMPORTANT
}