import { Gpio } from 'onoff';

type Fn = () => void;

export interface Buttons {
  whenOff(fn: Fn): void;
  whenDim(fn: Fn): void;
  whenBright(fn: Fn): void;
}

export class RealButtons implements Buttons{
  private readonly off: Gpio;
  private readonly dim: Gpio;
  private readonly bright: Gpio;

  constructor(off_pin: number, dim_pin: number, bright_pin: number) {
    this.off = new Gpio(off_pin, 'in', 'rising', {debounceTimeout: 10});
    this.dim = new Gpio(dim_pin, 'in', 'rising', {debounceTimeout: 10});
    this.bright = new Gpio(bright_pin, 'in', 'rising', {debounceTimeout: 10});
    process.on('SIGINT', () => {
      this.off.unexport();
      this.dim.unexport();
      this.bright.unexport();
    });
  }
  whenOff(fn: Fn) { this.off.watch(fn); }
  whenDim(fn: Fn) { this.dim.watch(fn); }
  whenBright(fn: Fn) { this.bright.watch(fn); }
}

export class MockButtons implements Buttons {
  whenOff(fn: Fn) {}
  whenDim(fn: Fn) {}
  whenBright(fn: Fn) {}
}
