import { APIRequestContext } from '@playwright/test';

export async function getRequest(request: APIRequestContext, endpoint: string) {

  const startTime = Date.now();

  const response = await request.get(endpoint);

  const endTime = Date.now();

  const responseTime = endTime - startTime;

  console.log(`API: ${endpoint}`);
  console.log(`Status: ${response.status()}`);
  console.log(`Response Time: ${responseTime} ms`);

  return response;
}