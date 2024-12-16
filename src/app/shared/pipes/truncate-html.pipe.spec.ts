import { TruncateHtmlPipe } from './truncate-html.pipe';

describe('TruncateHtmlPipe', () => {
  it('create an instance', () => {
    const pipe = new TruncateHtmlPipe();
    expect(pipe).toBeTruthy();
  });
});
