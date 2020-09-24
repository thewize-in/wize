export abstract class FakeRepo<T> {
  protected _model = new Map();
  async insert(key: any, value: any): Promise<void> {
    this._model.set(key, value);
  }
  async has(key: any): Promise<boolean> {
    return this._model.has(key);
  }
  async find(key: any): Promise<any> {
    return this._model.get(key);
  }
  async findAndUpdate(key: any, value: any): Promise<void> {
    this._model.set(key, value);
  }
  async remove(key: any): Promise<void> {
    this._model.delete(key);
  }
}
