class Distance {
  private distance_: number;
  constructor(distance: string) {
    if (!/^\d{2}\.\d$/.test(distance)) {
      throw new Error("00.0形式で入力してください");
    }
    this.distance_ = Number.parseFloat(distance);
  }
}

export default Distance;
