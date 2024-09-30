export class DeletingDeletedHost extends Error {
  constructor() {
    super("Domain Error. Trying delete deleted Host");
  }
}
