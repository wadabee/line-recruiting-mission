class Distance {
  private distance_: number;
  constructor(distance: string) {
    if (!/^\d{1,2}\.\d$/.test(distance)) {
      throw new Error("00.0形式または、0.0形式で入力してください");
    }
    this.distance_ = Number.parseFloat(distance);
  }

  public toNumber(): number {
    return this.distance_;
  }

  public add(distance: Distance): void {
    this.distance_ += distance.toNumber();
  }
}

export default Distance;
