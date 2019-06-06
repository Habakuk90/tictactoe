export interface IModalArgs {
  enemyUserName?: string;
  hasWon?: boolean;
}

export interface IModal {
  name: Modals,
  args: IModalArgs;
}

export enum Modals {
  empty = '',
  challenged = 'challenged',
  waiting = 'waiting',
  declined = 'declined',
  gameover = 'gameover'
}

export class Modal implements IModal {
  constructor(public name: Modals, public args: IModalArgs) {

  }
}
