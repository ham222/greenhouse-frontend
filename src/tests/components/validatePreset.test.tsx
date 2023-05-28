import Preset from 'src/domain/Preset';
import Threshold from 'src/domain/Threshold';
import ValidatePreset from 'src/utils/validatePreset';

describe('Preset Validation', () => {
  it('should return false if preset name is empty', () => {
    const preset = new Preset('', [new Threshold("type1", 0, 100)]);
    expect(ValidatePreset(preset)).toBe(false);
  });

  it('should return false if thresholds min or max are NaN', () => {
    const preset = new Preset('Preset1', [new Threshold("type1", NaN, 100)]);
    expect(ValidatePreset(preset)).toBe(false);
  });

  it('should return false if thresholds min is larger than max', () => {
    const preset = new Preset('Preset1', [new Threshold("type1", 100, 0)]);
    expect(ValidatePreset(preset)).toBe(false);
  });

  it('should return true if preset and thresholds are valid', () => {
    const preset = new Preset('Preset1', [new Threshold("type1", 0, 100)]);
    expect(ValidatePreset(preset)).toBe(true);
  });
});