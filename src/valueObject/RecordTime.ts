class RecordTime {
  private time_: Date;

  constructor(time: string) {
    if (!/^\d{2}:[0-5]\d:[0-5]\d.\d{3}$/.test(time)) {
      throw new Error("hh:mm:ss.fff形式で入力してください");
    }

    this.time_ = new Date(time);
  }
}

export default RecordTime;
