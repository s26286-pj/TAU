import { getEgdeCoordinates } from '../game';

describe('getEdgeCoordinates', () => {
  test('should not return coordinates on empty board', () => {
    expect(getEgdeCoordinates([])).toHaveLength(0);
  });
});