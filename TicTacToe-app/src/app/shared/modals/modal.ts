interface IModalArgs {
  enemyUserName?: string;
  hasWon?: boolean;
}

export interface IModal {
  name: string,
  args: IModalArgs;
}

export class Modal implements IModal {
  constructor(public name: string, public args: IModalArgs) {

  }
}
