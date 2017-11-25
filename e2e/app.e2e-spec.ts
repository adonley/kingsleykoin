import { KingsleykoinPage } from './app.po';

describe('kingsleykoin App', () => {
  let page: KingsleykoinPage;

  beforeEach(() => {
    page = new KingsleykoinPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
