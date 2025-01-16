const { Builder, By, until, Key } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function testWebsite() {
  let driver = await new Builder()
    .forBrowser('chrome')
    .build();

  try {
    await driver.get('https://bots.kore.ai/webclient/d5a4a8e6dc2e4701a8803ed46180182a4e836bdc0c414c06ae96e3b46a118ca4stf1');
    let link = await driver.findElement(By.className('chatInputBox'));
    await driver.sleep(1500)
    await link.sendKeys("Address relocation");
    await link.sendKeys(Key.ENTER)
    await driver.sleep(3000)

  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await driver.sleep(5000)
    driver.quit()
  }
})();
