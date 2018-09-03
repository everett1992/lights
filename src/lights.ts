import mh, {DC} from 'motor-hat';

export interface Lights {
  setLevel(level: number): void,
}

export class MotorLights implements Lights {
  private dc: DC;
  constructor() {
    const motors = mh({dcs: ['M1'], address: 0x60})
    motors.init();
    this.dc = motors.dcs[0];
    this.dc.run('fwd', (err) => { if (err) console.error(err) });
  }

  setLevel(level: number) {
    this.dc.setSpeed(level, (err) => { if (err) console.error(err) });
  }
}

export class MockLights implements Lights {
  setLevel(level: number) {
    console.log(`set lights to ${level}`);
  }
}
