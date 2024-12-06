const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
const assert = require("node:assert");
const chrome = require('selenium-webdriver/chrome');

const page = "https://wykop.pl/"
describe('wykop.pl', function () {
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

    after(async () => await driver.quit());

    it('have a header', async function () {
        const header = await driver.findElement(By.className("header"));
        assert.ok(await header.isDisplayed(), "Header should be displayed");
    });

    it('have a title that conains page name', async function () {
        const title = await await driver.getTitle();
        assert.ok(title.includes("Wykop.pl"), "Title should contain 'Wykop.pl'");
    });

    it('display the login button', async function () {
        await driver.get(page);

        const loginButton = await driver.findElement(By.css("a[href='/logowanie']"));
        assert.ok(await loginButton.isDisplayed(), "Login button should be visible");
    });

    it('display the login modal', async function () {
        await driver.get(page);

        const loginButton = await driver.findElement(By.css("a[href='/logowanie']"));
        await loginButton.click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        const loginModal = await driver.findElement(By.css(`div[data-modal="login"]`));
        assert.ok(await loginModal.isDisplayed(), "Login modal should be visible");
    });

    it('allow navigation to Mirko', async function () {
        await driver.get(page);

        const mirkoLink = await driver.findElement(By.css("a[href='/mikroblog']"));
        await mirkoLink.click();

        const heading = await driver.wait(
            async () => await driver.findElement(By.css("h1")),
            5000,
            "Heading not found"
        );
        const isDisplayed = await heading.isDisplayed();
        if (!isDisplayed) {
            throw new Error("Heading is not visible");
        }
        const headingText = await heading.getText();

        assert.ok(headingText.includes("Mikroblog"), "Should navigate to the Mikroblog page");
    });

    it('display tags', async function () {
        await driver.get(page);

        const tagsSection = await driver.findElement(By.css(".tags"));
        assert.ok(await tagsSection.isDisplayed(), "Tags section should be displayed");

        const tagLinks = await driver.findElements(By.css(".tags a[href^='/tag']"));
        assert.ok(tagLinks.length > 0, "Tags section should contain tags");
    });

    it('display the footer', async function () {
        await driver.get(page);

        const footer = await driver.findElement(By.css("footer"));
        assert.ok(await footer.isDisplayed(), "Footer should be visible");
    });
});