import { expect, describe, test, vi } from 'vitest';
import { providers, updateProviders } from '../../../../src/use/providers';

vi.mock('firebase/firestore', async () => {
  const api = await vi.importActual('firebase/firestore');
  return {
    ...api,
    onSnapshot: vi
      .fn((source = 'foo', { next: cb = (data) => (data)}) => {
        return cb([
          {
            id: '1',
            data: () => ({
              name: 'test provider 1',
            })
          }
        ])
      }),
  };
});

describe('Providers', async () => {
  test('should return api mock', async () => {
    expect(providers.value).toEqual([{
      id: '1',
      name: 'test provider 1',
    }]);
  });
  test('update function should be works', async () => {
    updateProviders([
      {
        id: '2',
        data: () => ({
          name: 'test provider 2',
        })
      }
    ]);
    expect(providers.value).toEqual([{
      id: '2',
      name: 'test provider 2',
    }]);
  });
});
