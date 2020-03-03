import mh, {DC} from 'motor-hat';
import fs from 'fs';
import path from 'path';

const STATEFILE  = path.join(__dirname, '.state');

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

    const level = this.readLevelSync();
    this.dc.setSpeed(level, (err) => { if (err) console.error(err) });
  }

  setLevel(level: number) {
    this.dc.setSpeed(level, (err) => { if (err) console.error(err) });
    this.writeLevel(level);
  }

  private writeLevel(level: number) {
    return fs.writeFileSync(STATEFILE, level.toString(), {encoding: 'utf8'});
  }

  private readLevelSync(): number {
    try {
      return parseInt(fs.readFileSync(STATEFILE, {encoding: 'utf8'}));
    } catch {
      return 0;
    }
  }
}

export class MockLights implements Lights {
  setLevel(level: number) {
    console.log(`set lights to ${level}`);
  }
}
