const { Builder, By, until, Key } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

var driver;
var callReceiver;
async function loadWebsite() {
  try {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.get("http://localhost:3001/");
    console.log(
      new Date(),
      "TEST DRIVE STARTED ::::::::::::::::::::::::::"
    );
  } catch (error) {
    console.error("Test failed:", error);
    // } finally {
    //   await driver.sleep(5000)
    //   driver.quit()
  }
}

async function callProcessor() {
  try {
    callReceiver = await new Builder().forBrowser("chrome").build();
    const url = ''
    console.log(typeof url);
    await callReceiver.get(url);
    await callReceiver.sleep(3000);

    const signIn = await callReceiver.get(By.className('btn__text'))
    signIn.click()
    await callReceiver.sleep(3000);

    // const email = await callReceiver.get(By.className('whsOnd zHQkBf'))
    // email.sendKeys("")
    // // await callReceiver.sleep(3000);

    // const next2Pwd  = await callReceiver.get(By.className('VfPpkd-vQzf8d'))
    // next2Pwd.click()
    // // await callReceiver.sleep(3000);

    // const pwd = await callReceiver.get(By.className("whsOnd zHQkBf"))
    // pwd.sendKeys("")
    // // await callReceiver.sleep(3000);

    // const next2login = await callReceiver.get(By.className('VfPpkd-vQzf8d'))
    // next2login.click()
    // // await callReceiver.sleep(3000);

    // const meet = await callReceiver.get(By.className('V6 CL Xj'))
    // meet.click()
    // // await callReceiver.sleep(3000);

    // const newMeet = await callReceiver.get(By.className('VfPpkd-vQzf8d'))
    // newMeet.click()
    // // await callReceiver.sleep(3000);

  } catch (err) {
    console.error(err);
  }
}

async function giveInputs(givenUtterences) {
  try {
    var utterences = givenUtterences;
    var link = await driver.findElement(By.id("#text"));
    var button = await driver.findElement(By.id("#button"));
    for (const value of utterences) {
      await link.clear();
      await driver.sleep(3000);
      await link.sendKeys(value);
      button.click();
      await driver.sleep(3000);
    }
    // await button.clear()
    // await driver.sleep(2000)
  } catch (error) {
    console.error(error);
  }
}

module.exports = { loadWebsite, callProcessor, giveInputs };
