export class App {
  public message: string = 'Hello World!';
  public model?: any;

  constructor() {
    this.loadModelA();
  }

  loadModelA() {
    this.model = {
      line1: "model-a.line1",
      line2: "model-a.line2"
    }
  }

  loadModelB() {
    this.model = {
      line1: "model-b.line1",
    }
  }
}
