import { Box }from "./boxes.interface";

export class Boxes {
  public boxes: Box[];

  constructor() {
    this.boxes = this.setBoxes();
  }

  getState(tileId: string) {
    return this.boxes.filter(x => x.id === tileId)[0].state;
  }

  setState(tileId: string, state: string) {
    this.boxes.filter(x => x.id === tileId)[0].state = state;
  }

  getLocked(tileId: string) {
    return this.boxes.filter(x => x.id === tileId)[0].locked;
  }

  setLocked(tileId: string, locked: boolean) {
    this.findById(tileId).locked = locked;
  }

  setAllLocked(){
    this.boxes.forEach(box => box.locked = true);
  }

  hasColumnWon() {

  }

  findById(tileId: string): Box {
    return this.boxes.filter(x => x.id === tileId)[0];
  }

  private setBoxes(): Box[] {
    return [{
        id: '1-1',
        locked: false
      },
      {
        id: '1-2',
        locked: false
      },
      {
        id: '1-3',
        locked: false
      },
      {
        id: '2-1',
        locked: false
      },
      {
        id: '2-2',
        locked: false
      },
      {
        id: '2-3',
        locked: false
      },
      {
        id: '3-1',
        locked: false
      },
      {
        id: '3-2',
        locked: false
      },
      {
        id: '3-3',
        locked: false
      }
    ];
  }
}
