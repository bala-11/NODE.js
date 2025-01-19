const { Builder, By, until, Key } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

var callReceiver;
var SIP = "12564620676"
async function callProcessor() {
  try {
    callReceiver = await new Builder().forBrowser("chrome").build();
    await callReceiver.manage().window().maximize()
    await callReceiver.get('https://meet.google.com/new');

    const email = await callReceiver.wait(until.elementIsEnabled(await callReceiver.findElement(By.id('identifierId'))),10000)
    await email.sendKeys("")

    const next2Captcha = await callReceiver.wait(until.elementIsEnabled(await callReceiver.findElement(By.xpath('//*[@id="identifierNext"]/div/button/span'))),10000)
    next2Captcha.click()

    // //Wait for the user to give the captcha  input
    // await callReceiver.sleep(15000)

    // const next2Pwd  = await callReceiver.wait(until.elementIsEnabled(await callReceiver.findElement(By.xpath('//*[@id="identifierNext"]/div/button'))),10000)
    // next2Pwd.click()

    await callReceiver.sleep(7000)

    const pwd = await callReceiver.wait(until.elementIsEnabled(await callReceiver.findElement(By.className('whsOnd zHQkBf'))),10000)
    await pwd.sendKeys("")

    const next2login = await callReceiver.wait(until.elementIsEnabled(await callReceiver.findElement(By.xpath('//*[@id="passwordNext"]/div/button'))),10000)
    next2login.click()

    /**
     * User need to Allow the Mic and enable the camera if needed to record the call
     * Currently added 40s to avoid Element not found error on add others
     */
    await callReceiver.sleep(25000);

    /**
     * call connected successfully
     * Need to click person ICON in bottom
     */
    console.log(new Date(),"GOOGLE MEET IS CONNECTED :::::::::::::::::::::::::")

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
    await callReceiver.sleep(1000).then(()=>{
      console.log(new Date(),`CALL Connected to the SIP number : ${SIP}`);
    }).catch(()=>{
      console.log(new Date(),"Error in calling the sip")
    })
  } catch (err) {
    console.log(new Date(),"Error in connecting the Call Receiver::::::::::::::::::");
    console.error(err);
  }
}

module.exports = {callProcessor}