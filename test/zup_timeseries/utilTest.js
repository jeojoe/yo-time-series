/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import { DTW, threeDimensionDTW } from '../../src/zup_timeseries/util'

describe('util', () => {
  describe('#DTW', () => {

    it('should return 0 for same sequence', () => {
      expect(DTW([1, 2, 3], [1, 2, 3])).to.equal(0);
    });

  });

  describe('#threeDimensionDTW', () => {
    it('should return total sum of each dimension DTW', () => {
      expect(threeDimensionDTW([], [ { x: 1, y: 1, z: 1 } ])).to.equal(0);
      expect(threeDimensionDTW([ { x: 1, y: 1, z: 1 } ], [])).to.equal(0);

      expect(threeDimensionDTW(
        [ { x: 1, y: 1, z: 1 }, { x: 2, y: 2, z: 2 } ],
        [ { x: 1, y: 1, z: 1 }, { x: 2, y: 2, z: 2 } ]
      )).to.equal(0);

      expect(threeDimensionDTW(
        [ { x: 1, y: 1, z: 1 }, { x: 2, y: 2, z: 2 } ],
        [ { x: 1, y: 1, z: 0 }, { x: 2, y: 1, z: 2 } ]
      )).to.equal(2);
    });
  });
});
