import { AvailablePipe } from './available.pipe';
import { ConditionalPipe } from './conditional.pipe';
import { FractionPipe } from './fraction.pipe';

describe('AvailablePipe', () => {
  it('create an instance', () => {
    const pipe = new AvailablePipe();
    expect(pipe).toBeTruthy();
  });
  it('teting "null" value', () => {
    const pipe = new AvailablePipe();
    expect(pipe.transform(null)).toEqual('N/A');
  });
  it('teting "undefined" value', () => {
    const pipe = new AvailablePipe();
    expect(pipe.transform(undefined)).toEqual('N/A');
  });
  it('teting "empty" string and using arguments', () => {
    const pipe = new AvailablePipe();
    expect(pipe.transform('  ', 'Nothing')).toEqual('Nothing');
  });
  it('teting "0" value', () => {
    const pipe = new AvailablePipe();
    expect(pipe.transform(0)).toEqual(0);
  });
  it('teting "false" value', () => {
    const pipe = new AvailablePipe();
    expect(pipe.transform(false)).toEqual(false);
  });
});

describe('ConditionalPipe', () => {
  it('create an instance', () => {
    const pipe = new ConditionalPipe();
    expect(pipe).toBeTruthy();
  });
  it('teting "true" value', () => {
    const pipe = new ConditionalPipe();
    expect(pipe.transform(true)).toEqual('Yes');
  });
  it('teting "false" value', () => {
    const pipe = new ConditionalPipe();
    expect(pipe.transform(false)).toEqual('No');
  });
  it('teting "string" using arguments', () => {
    const pipe = new ConditionalPipe();
    expect(pipe.transform('TEST', 'yeap', 'nope', 'MATCH')).toEqual('nope');
  });
});

describe('FractionPipe', () => {
  it('create an instance', () => {
    const pipe = new FractionPipe();
    expect(pipe).toBeTruthy();
  });
  it('transform "2.5"', () => {
    const pipe = new FractionPipe();
    expect(pipe.transform(2.5)).toEqual('2 1/2');
  });
  it('transform "null"', () => {
    const pipe = new FractionPipe();
    expect(pipe.transform(null)).toEqual('0');
  });
  it('transform "string"', () => {
    const pipe = new FractionPipe();
    expect(pipe.transform('string')).toEqual('0');
  });
  it('transform "true"', () => {
    const pipe = new FractionPipe();
    expect(pipe.transform(true)).toEqual('0');
  });
});
