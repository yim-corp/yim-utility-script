import { sayHello, asyncSayHello } from './index';

it('say hello to me', function () {
  expect(sayHello()).toBe('Hello');
});
it('say hello to me', async () => {
  await expect(asyncSayHello()).resolves.tcEqual('Hello');
});