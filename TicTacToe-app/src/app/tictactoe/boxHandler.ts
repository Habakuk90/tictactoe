import { Box } from './box';

export class BoxHandler {
  boxes: Box[];
  winningLine: string;
  constructor() {
    this.boxes = this.createBoxes();
  }

  public findById(tileId: string): Box {
    return this.boxes.filter(x => x.id === tileId)[0];
  }

  public setAllLocked(): void {
    this.boxes.forEach(box => box.locked = true);
  }

  public checkWin(box: Box): any {
    const columns = [];
    const rows = [];
    const diagonalTopLeft = [];
    const diagonalBottomLeft = [];
    // based on x-y e.g. 1-2 => first Row, second column
    const tileClickedRow = box.id.substring(0, 1);
    const tileClickedColumn = box.id.substring(2);

    for (let i = 1; i <= 3; i++) {
      this.boxes.forEach(x => {
        if (x.id.endsWith(tileClickedColumn) && x.id.startsWith(i.toString()) &&
          x.state === box.state) {
          columns.push(x);
        }
        if (x.id.startsWith(tileClickedRow) && x.id.endsWith(i.toString()) &&
          x.state === box.state) {
          rows.push(x);
        }
        if (x.id.startsWith(i.toString()) && x.state === box.state &&
          x.id.endsWith(i.toString())) {
          diagonalTopLeft.push(x);
        }
        if (x.id.startsWith(i.toString()) && x.id.endsWith((4 - i).toString()) &&
          x.state === box.state) {
          diagonalBottomLeft.push(x);
        }
      });
    }

    // set winning line in svg for winning row/column/diagonal
    if (columns.length > 2) {
      this.winningLine = 'column';
    } else if (rows.length > 2) {
      this.winningLine = 'row';
    } else if (diagonalTopLeft.length > 2) {
      this.winningLine = 'diagonalTopLeft';
    } else if (diagonalBottomLeft.length > 2) {
      this.winningLine = 'diagonalBottomLeft';
    }

    if (columns.length > 2 || rows.length > 2 || diagonalTopLeft.length > 2 || diagonalBottomLeft.length > 2) {
      // this.winningTileId = tileId;
      return true;
    }
    return false;

  }

  public createBoxes(): Box[] {
    const boxArray: Box[] = [];
    for (let i = 1; i <= 3; i++) {
      for (let y = 1; y <= 3; y++) {
        boxArray.push(new Box(i + '-' + y));
      }
    }
    return boxArray;
  }
}
