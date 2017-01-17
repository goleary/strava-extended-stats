import { StravaExtendedStatsPage } from './app.po';

describe('strava-extended-stats App', function() {
  let page: StravaExtendedStatsPage;

  beforeEach(() => {
    page = new StravaExtendedStatsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
