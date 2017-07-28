import { browser, by, element } from 'protractor';

export class LudiQuizzPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('lq-root h1')).getText();
  }
}
