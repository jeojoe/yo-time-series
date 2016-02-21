/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import { DTW } from '../../src/zup_timeseries/util'

describe('util', () => {
  describe('#DTW', () => {

    it('should return 0 for same sequence', () => {
      expect(DTW([1, 2, 3], [1, 2, 3])).to.equal(0);
    });

  });
});
