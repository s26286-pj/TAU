const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
const assert = require("node:assert");
const chrome = require('selenium-webdriver/chrome');

const page = "https://magazyn.panta.gda.pl/"
describe('magazyn.panta.gda.pl', function () {
    let driver;

    before(async function () {
        const width = 1400;
        const height = 800;

        let options = new chrome.Options();
        options.addArguments(`--window-size=${width},${height}`);
        options.addArguments('--force-dark-mode=0');
        options.addArguments('--disable-features=WebUIDarkMode');
        driver = new Builder()
          .forBrowser(Browser.CHROME)
          .setChromeOptions(options)
          .build();
        await driver.get(page);
        await driver.manage().setTimeouts({ implicit: 2000 });
    });

    this.beforeAll(async function () {
        
    })

    after(async () => await driver.quit());

    it('have a title that conains page name', async function () {
        const title = await await driver.getTitle();
        assert.ok(title.includes("Panta"), "Title should contain 'Panta'");
    });
});