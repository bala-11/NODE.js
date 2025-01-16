const { Builder, By, until, Key } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function testWebsite() {
  let driver = await new Builder()
    .forBrowser('chrome')
    .build();

  try {
    await driver.get('http://localhost:3000/');
    let link = await driver.findElement(By.id('#text'));
    await driver.sleep(1500)
    await link.sendKeys("Address relocation");
    const button = await driver.findElement(By.id('#button'))
    button.click()
    await driver.sleep(1000)

  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await driver.sleep(5000)
    driver.quit()
  }
};


module.exports = {testWebsite}