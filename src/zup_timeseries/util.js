export const DTW = (seriesA, seriesB) => {
  const d = (x, y) => Math.abs(x - y);
  let DTWMatrix = Array.apply(null, Array(seriesA.length)).map(_ => []);
  DTWMatrix[-1] = [];
  DTWMatrix[-1][-1] = 0;

  for(let a = 0; a < seriesA.length; a++) {
    DTWMatrix[a][-1] = Infinity;
  }

  for(let b = 0; b < seriesB.length; b++) {
    DTWMatrix[-1][b] = Infinity;
  }

  for(let a = 0; a < seriesA.length; a++) {
    for(let b = 0; b < seriesB.length; b++) {
      DTWMatrix[a][b] = d(seriesA[a], seriesB[b]) + Math.min(
          DTWMatrix[a-1][b  ],
          DTWMatrix[a  ][b-1],
          DTWMatrix[a-1][b-1]
        );
    }
  }

  return DTWMatrix[seriesA.length - 1][seriesB.length - 1];
};


