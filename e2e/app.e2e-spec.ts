import { FinalDec2017UiPage } from './app.po';

describe('final-dec2017-ui App', () => {
  let page: FinalDec2017UiPage;

  beforeEach(() => {
    page = new FinalDec2017UiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
