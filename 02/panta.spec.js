const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
const assert = require("node:assert");
const chrome = require('selenium-webdriver/chrome');

const page = "http://magazyn.panta.gda.pl/part/list"
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
        await driver.manage().setTimeouts({ implicit: 4000 });
    });

    after(async () => await driver.quit());

    it('have a correct header', async function () {
        const heading = await driver.findElement(By.css(".top-banner-text"));
        const headingText = await heading.getText()
        assert.ok(headingText.includes("Części używane"), "Page title should include 'Części używane'");
    });

    it('have a title that conains page name', async function () {
        const title = await await driver.getTitle();
        assert.ok(title.includes("Panta"), "Title should contain 'Panta'");
    });

    it('display the parts', async function () {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const parts = await driver.findElement(By.css("mat-grid-tile"));
        assert.ok(parts.length = 24, "24 parts should be displayed");
    });

    it('have a top banner', async function () {
        const footer = await driver.findElement(By.css(".top-banner-panta"));
        assert.ok(footer.isDisplayed(), "Top banner should be visible");
    });

    it('have a footer', async function () {
        const footer = await driver.findElement(By.css("app-footer"));
        assert.ok(footer.isDisplayed(), "Page footer should be visible");
    });

    it('have a filter section', async function () {
        const element = await driver.findElement(By.xpath("//div[text()='Filtry']"));
        assert.ok(element.isDisplayed(), "Filter section should be visible");
    });

    it('have a All Categories section', async function () {
        const element = await driver.findElement(By.xpath("//a[text()='Wszystkie kategorie']"));
        assert.ok(element.isDisplayed(), "All Categories section should be visible");
    });

    it('All Categories section should have items', async function () {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const elements = await driver.findElement(By.css(".menu-container mat-tree > mat-nested-tree-node"));
        assert.ok(elements.length > 0, "All Categories section should have items");
    });
});
