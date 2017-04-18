import { YourFoodPage } from './app.po';

describe('your-food App', () => {
  let page: YourFoodPage;

  beforeEach(() => {
    page = new YourFoodPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
