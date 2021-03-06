function runTurn(gridState) {
  const gridStateCopy = [...gridState.map((arr) => [...arr])];

  const newGridState = gridStateCopy.map((gridColumn, xIndex) => {
    const newArrValues = gridColumn.map((cellValue, yIndex) => {
      const neighborhood = [
        [xIndex - 1, yIndex - 1],
        [xIndex - 1, yIndex],
        [xIndex - 1, yIndex + 1],
        [xIndex, yIndex - 1],
        [xIndex, yIndex + 1],
        [xIndex + 1, yIndex - 1],
        [xIndex + 1, yIndex],
        [xIndex + 1, yIndex + 1],
      ];

      const cellCount = neighborhood.reduce((acc, neighbor) => {
        let neighborValue;
        if (
          neighbor[0] < 0 ||
          neighbor[1] < 0 ||
          neighbor[0] > gridStateCopy.length - 1 ||
          neighbor[1] > gridStateCopy.length - 1
        ) {
          neighborValue = 0;
        } else {
          neighborValue = gridStateCopy[neighbor[0]][neighbor[1]];
        }
        const count = neighborValue + acc;
        return count;
      }, 0);

      if (cellValue === 1 && (cellCount === 2 || cellCount === 3)) {
        return 1;
      }
      if (cellValue === 0 && cellCount === 3) {
        return 1;
      }

      return 0;
    });

    return newArrValues;
  });

  return runTurn(newGridState);
}

function create2DArray(x = 10, y = 10) {
  const arr = new Array(x).fill(undefined);

  return arr.map(() => new Array(y).fill(undefined));
}

const gameGrid = create2DArray(50, 50).map((xArr) => xArr.map(() => 0));

gameGrid[10][10] = 1;
gameGrid[10][11] = 1;
gameGrid[10][12] = 1;

const turn1 = runTurn(gameGrid);
