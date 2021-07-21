export class Timestamp {
  public readonly value: number;
  constructor() {
    this.value = this.generateTimeStamp();
  }
  private generateTimeStamp(): number {
    // timestamp in seconds
    return Math.floor(Date.now() / 1000);
  }
}
