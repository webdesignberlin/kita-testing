import { expect, describe, test } from 'vitest';
import { providers } from '../../../../src/use/providers';

describe('Providers', async () => {
  test('should return default empty list', async () => {
    expect(providers.value).toEqual([]);
  });
});
