import mh, {DC} from 'motor-hat';

export interface Lights {
  setLevel(level: number): void,
}

export class MotorLights implements Lights {
  private dc: DC;
  constructor() {
    const motors = mh({dcs: ['M1']})
    motors.init();
    this.dc = motors.dcs[0];
    this.dc.run('fwd', (err) => console.error(err));
  }

  setLevel(level: number) {
    console.log(`set lights to ${level}`);
    this.dc.setSpeed(level, (err) => console.error(err));
  }
}

export class MockLights implements Lights {
  setLevel(level: number) {
    console.log(`set lights to ${level}`);
  }
}
