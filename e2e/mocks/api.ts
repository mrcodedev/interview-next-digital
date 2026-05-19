import type { Page } from "@playwright/test";

export const MOCK_USER = {
  id: 1,
  name: "Leanne Graham",
  username: "Bret",
  email: "Sincere@april.biz",
  phone: "1-770-736-0988 x56442",
  website: "hildegard.org",
  address: {
    street: "Kulas Light",
    suite: "Apt. 556",
    city: "Gwenborough",
    zipcode: "92998-3874",
    geo: { lat: "-37.3159", lng: "81.1496" },
  },
  company: {
    name: "Romaguera-Crona",
    catchPhrase: "Multi-layered client-server neural-net",
    bs: "harness real-time e-markets",
  },
};

export const MOCK_USERS = [MOCK_USER];

export const MOCK_ALBUMS = [
  { id: 1, userId: 1, title: "quidem molestiae enim" },
  { id: 2, userId: 1, title: "sunt qui excepturi placeat culpa" },
];

export const MOCK_TODOS = [
  { id: 1, userId: 1, title: "delectus aut autem", completed: false },
  { id: 2, userId: 1, title: "quis ut nam facilis et officiis", completed: true },
];

export async function setupApiMocks(page: Page) {
  await page.route("https://jsonplaceholder.typicode.com/users", (route) =>
    route.fulfill({ json: MOCK_USERS })
  );
  await page.route("https://jsonplaceholder.typicode.com/users/1", (route) =>
    route.fulfill({ json: MOCK_USER })
  );
  await page.route("https://jsonplaceholder.typicode.com/users/1/albums", (route) =>
    route.fulfill({ json: MOCK_ALBUMS })
  );
  await page.route(/todos\?userId=/, (route) => route.fulfill({ json: MOCK_TODOS }));
  await page.route(/photos\?albumId=/, (route) => route.fulfill({ json: [] }));
}
