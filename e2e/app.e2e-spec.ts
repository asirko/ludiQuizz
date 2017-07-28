import { LudiQuizzPage } from './app.po';

describe('ludi-quizz App', () => {
  let page: LudiQuizzPage;

  beforeEach(() => {
    page = new LudiQuizzPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to lq!!');
  });
});
