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

    it('have a search input', async function () {
        await driver.get(page);
        const searchInput = await driver.findElement(By.css("input[type='search']"));
        assert.ok(await searchInput.isDisplayed(), "Search input should be displayed");
    });

    it('have a search button', async function () {
        await driver.get(page);
        const searchButton = await driver.findElement(By.css(".cdx-search-input__end-button"));
        assert.ok(await searchButton.isDisplayed(), "Search button should be displayed");
    });

    it('search functionality works', async function () {
        await driver.get(page);
        const searchInput = await driver.findElement(By.css("input[type='search']"));
        const searchButton = await driver.findElement(By.css(".cdx-search-input__end-button"));
        await searchInput.sendKeys("Selenium");
        await searchButton.click();
        const heading = await driver.findElement(By.id("firstHeading"));
        const headingText = await heading.getText(); // 
        assert.ok(headingText.includes("Selenium"), "Search should lead to the correct page");
    });

    it('language selector is present', async function () {
        await driver.get(page);
        const languageSelector = await driver.findElement(By.id("p-lang-btn"));
        assert.ok(await languageSelector.isDisplayed(), "Language selector should be displayed");
    });

    it('main content section exists', async function () {
        await driver.get(page);
        const mainContent = await driver.findElement(By.id("mw-content-text"));
        assert.ok(await mainContent.isDisplayed(), "Main content should be displayed");
    });

    it('footer exists', async function () {
        await driver.get(page);
        const footer = await driver.findElement(By.css("footer"));
        assert.ok(await footer.isDisplayed(), "Footer should be displayed");
    });

    it('logo is displayed', async function () {
        await driver.get(page);
        const logo = await driver.findElement(By.css(".mw-logo-icon"));
        assert.ok(await logo.isDisplayed(), "Logo should be displayed");
    });

    it('random article link works', async function () {
        await driver.get(page);
        const menu = await driver.findElement(By.id("vector-main-menu-dropdown-checkbox"));
        await menu.click();
        const randomLink = await driver.findElement(By.css("a[accesskey='x']"));

        await randomLink.click();
        
        const heading = await driver.findElement(By.id("firstHeading"));
        assert.ok(await heading.isDisplayed(), "Clicking random article should lead to a new page with a heading");
    });

    it('page has a title', async function () {
        await driver.get(page);
        const title = await driver.getTitle();
        assert.ok(title.length > 0, "Page should have a title");
    });
});
