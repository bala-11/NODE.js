const { Builder, By, until, Key } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

var driver;
var callReceiver;
var SIP = "12564620676"
async function loadWebsite() {
  try {
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get("http://localhost:3001/");
    await driver.manage().window().minimize();
    console.log(
      new Date(),
      "TTS ENGINE STARTED :::::::::::::::::::::::::::::::::::::::::"
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

    let options = new chrome.Options();
    options.addArguments(
    '--use-fake-ui-for-media-stream',
    '--disable-notifications'
  );
    callReceiver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();
    await callReceiver.manage().window().maximize();
    await callReceiver.get("https://meet.google.com/new");

    const email = await callReceiver.wait(
      until.elementIsEnabled(
        await callReceiver.findElement(By.id("identifierId"))
      ),
      10000
    );
    await email.sendKeys("balaji.kalimuthu-e@kore.com");

    const next2Captcha = await callReceiver.wait(
      until.elementIsEnabled(
        await callReceiver.findElement(
          By.xpath('//*[@id="identifierNext"]/div/button/span')
        )
      ),
      10000
    );
    next2Captcha.click();

    //Wait for the user to give the captcha  input
    await callReceiver.sleep(15000);

    const next2Pwd = await callReceiver.wait(
      until.elementIsEnabled(
        await callReceiver.findElement(
          By.xpath('//*[@id="identifierNext"]/div/button')
        )
      ),
      10000
    );
    next2Pwd.click();

    await callReceiver.sleep(3000);

    const pwd = await callReceiver.wait(
      until.elementIsEnabled(
        await callReceiver.findElement(By.className("whsOnd zHQkBf"))
      ),
      10000
    );
    await pwd.sendKeys("Durgairaj@1131");

    const next2login = await callReceiver.wait(
      until.elementIsEnabled(
        await callReceiver.findElement(
          By.xpath('//*[@id="passwordNext"]/div/button')
        )
      ),
      10000
    );
    next2login.click();

    /**
     * User need to Allow the Mic and enable the camera if needed to record the call
     * Currently added 40s to avoid Element not found error on add others
     */
    await callReceiver.sleep(20000);

    //*[@id="yDmH0d"]/c-wiz/div/div/div[35]/div[4]/div[10]/div/div/div[3]/nav/div[2]/div/span/button/div
        const clickPerson = await callReceiver.wait(until.elementIsEnabled(await callReceiver.findElement(By.xpath('//*[@id="yDmH0d"]/c-wiz/div/div/div[35]/div[4]/div[10]/div/div/div[3]/nav/div[2]/div/span/button/div'))),30000)
        clickPerson.click()
        await callReceiver.sleep(3000);
        /**
         * After add others
         */
        //*[@id="yDmH0d"]/c-wiz/div[1]/div/div[35]/div[4]/div[4]/div[2]/div/div[2]/div[1]/div/div/div/button/span[6]
    
        const addPersons = await callReceiver.wait(until.elementIsEnabled(await callReceiver.findElement(By.className('FOBRw-vQzf8d'))),10000)
        addPersons.click()
        await callReceiver.sleep(3000)
    
        /**
         * 
         */

        const addCall = await callReceiver.wait(until.elementIsEnabled(await callReceiver.findElement(By.xpath('//*[@id="Call"]'))),10000)
        addCall.click()
        // await callReceiver.sleep(5000)
    
        const sipNumber = await callReceiver.wait(until.elementIsEnabled(await callReceiver.findElement(By.className('whsOnd zHQkBf'))),10000)
        sipNumber.sendKeys(SIP)
        // await callReceiver.sleep(5000)
    
        const makeCall = await callReceiver.wait(until.elementIsEnabled(await callReceiver.findElement(By.className('VfPpkd-Bz112c-LgbsSe yHy1rc eT1oJ tWDL4c B155Lc julaX'))),10000)
        makeCall.click()
    
        console.log(new Date(),"Calling SIP number :::::::::::::::::::::;")


    /**
     * Added a custom delay to sync the call and ttsEngine
     */
    await callReceiver.sleep().then(()=>{
      console.log(new Date(),`CALL Connected to the SIP number : ${SIP}`);
    }).catch(()=>{
      console.log(new Date(),"Error in calling the sip")
    })
  } catch (err) {
    console.error(err);
  }
}


/**
 * T ratio 8000 : 6000     -> most stable configuration
 * Prosody rate level : medium     #SID  678c3ee5108a6228e5636ba7
 * Try to load the ttsEngine once is running on server 3001 (need to check)
 */

async function giveInputs(givenUtterences) {
  try {
    var utterences = givenUtterences;
    var initThreshold = 7000;
    var count = 0;
    var link = await driver.findElement(By.id("#text"));
    var button = await driver.findElement(By.id("#button"));

    for (const value of utterences) {
      await link.clear();
      await driver.sleep(initThreshold);
      await link.sendKeys(value)
      button.click();
      // console.log(new Date(),`button clicked`);
      await driver.sleep(3000);
      initThreshold = 6000;
      count++;
      console.log(new Date(), `utterence spoke : ${count}`);
    }
    // await button.clear()
    // await driver.sleep(2000)
  } catch (error) {
    console.error(error);
  }
}

module.exports = { loadWebsite, callProcessor, giveInputs };
