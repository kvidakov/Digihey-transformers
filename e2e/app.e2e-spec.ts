import { DigiheyTransformersPage } from './app.po';

describe('digihey-transformers App', () => {
  let page: DigiheyTransformersPage;

  beforeEach(() => {
    page = new DigiheyTransformersPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
