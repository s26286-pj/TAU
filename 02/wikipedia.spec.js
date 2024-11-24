const { Builder, Browser, By} = require('selenium-webdriver');
const assert = require("node:assert");

const page = "https://pl.wikipedia.org"
describe('pl.wikipedia.org', function () {
    let driver;

    before(async function () {
        driver = new Builder().forBrowser(Browser.FIREFOX).build();
    });

    after(async () => await driver.quit());

    it('have a header', async function () {
        await driver.get(page);
        const header = await driver.findElement(By.css("header"));
        assert.ok(await header.isDisplayed(), "Header should be displayed");
    });
});
