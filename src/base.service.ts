export class BaseService<T> {
  protected items: T[] = [];

  findAll(): T[] {
    return this.items;
  }

  findOne(index: number): T {
    return this.items[index];
  }

  delete(index: number): string {
    this.items.splice(index, 1);
    return 'Deleted successfully';
  }
  log(message: string) {
    console.log('LOG:', message);
  }
}
