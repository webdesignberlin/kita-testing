import { expect, describe, test, vi } from 'vitest';
// import * as api from '../../../../src/api';
import { userId, userName, user, updateUser } from '../../../../src/use/user';

/* const onAuthStateChange = vi
  .fn()
  .mockImplementationOnce(() => false)
  .mockImplementationOnce(() => ({
    uid: 'abc',
    displayName: 'Micha',
  })); */
/* const spyApi = vi.spyOn(api, 'onAuthStateChange').mockImplementation(() => (updateUser({
  uid: 'abc',
  displayName: 'Micha',
}))); */
vi.mock('../../../../src/api', async () => {
  const api = await vi.importActual('../../../../src/api');
  return {
    ...api,
    onAuthStateChange: vi
      .fn((cb = (data) => (data)) => cb({
        uid: 'abc',
        displayName: 'Micha',
      })),
    /* onAuthStateChange: vi.fn((cb = (data) => (data)) => {
      console.log('on');
      console.log(cb);
      return cb({
        uid: 'abc',
        displayName: 'Micha',
      });
    }), */
  };
});

describe('User', async () => {
  test('should return correct data', async () => {
    // expect(user.value).toBe(null);
    // init();
    expect(user.value).toEqual({
      uid: 'abc',
      displayName: 'Micha',
    });
    expect(userId.value).toBe('abc');
    expect(userName.value).toBe('Micha');
  });
  test('updateUser should be works', () => {
    updateUser({
      uid: '123',
      displayName: 'Gismo',
    });
    expect(user.value).toEqual({
      uid: '123',
      displayName: 'Gismo',
    });
    expect(userId.value).toBe('123');
    expect(userName.value).toBe('Gismo');
  });
  /* test('should return default empty computed user data', async () => {
    expect(user.value).toBe(null);
    expect(init).toHaveBeenCalled();
    // expect(spy).toHaveBeenCalled();
    expect(userId.value).toBe('abc');
    // expect(userName.value).toBe('Micha');
  }); */
});
