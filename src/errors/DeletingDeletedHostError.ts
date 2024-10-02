export class DeletingDeletedHostError extends Error {
  constructor() {
    super("Domain Error. Trying delete deleted Host");
  }
}
