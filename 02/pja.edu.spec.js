const { Builder, Browser, By} = require('selenium-webdriver');
const assert = require("node:assert");

const page = "https://pja.edu.pl/"
describe('pja.edu.pl', function () {
    let driver;

    before(async function () {
        driver = new Builder().forBrowser(Browser.SAFARI).build();
    });

    after(async () => await driver.quit());

    it('have a header', async function () {
        await driver.get(page);
        const header = await driver.findElement(By.className("top-nav"));
        assert.ok(await header.isDisplayed(), "Header should be displayed");
    });
});
