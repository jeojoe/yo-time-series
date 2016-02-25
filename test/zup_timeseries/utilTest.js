/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import { DTW, threeDimensionDTW, getNSimilarSeries } from '../../src/zup_timeseries/util'

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

  describe('#getNSimilarSeries', () => {
    const database = [
      [{x: 0, y: 0, z: 0}],
      [{x: 0, y: 0, z: 1}],
      [{x: 0, y: 1, z: 0}],
      [{x: 1, y: 3, z: 0}],
      [{x: 32, y: 12, z: 1}],
      [{x: 31, y: 11, z: 1}]
    ];

    it('return 3 similar string if get three string and matches more than or equal 3', () => {
      expect(getNSimilarSeries([{x: 2, y: 0, z: 0}]), 3 ,database)
        .to.deep.equal([
          [{x: 0, y: 0, z: 0}],
          [{x: 0, y: 0, z: 1}],
          [{x: 0, y: 1, z: 0}]
        ]);
    });

    //it('return 2 similar string ig get 3 string and matches are just 2', () => {
    //  expect(getNSimilarSeries({x: 32, y: 12, z: 0}), 3 ,database)
    //    .to.deep.equal([
    //      [{x: 32, y: 12, z: 1}],
    //      [{x: 31, y: 11, z: 1}]
    //    ]);
    //});
  });
});
