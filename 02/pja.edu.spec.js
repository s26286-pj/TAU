const { Builder, Browser, By} = require('selenium-webdriver');
const assert = require("node:assert");

const page = "https://pja.edu.pl/"
describe('pja.edu.pl', function () {
    let driver;

    before(async function () {
        driver = new Builder().forBrowser(Browser.SAFARI).build();
    });

    after(async () => await driver.quit());

    it('should display a visible cookie banner', async function () {
        await driver.get(page);
        await new Promise(resolve => setTimeout(resolve, 2000));
        const banner = await driver.findElement(By.css(".popup--cookies"));
        assert.ok(await banner.isDisplayed(), "Cookie banner should be displayed");
    });

    it('should close a cookie banner', async function () {
        await driver.get(page); 
        await new Promise(resolve => setTimeout(resolve, 2000));
        const button = await driver.findElement(By.css(".popup-button"));
        await button.click();
        await new Promise(resolve => setTimeout(resolve, 2000));
        const banner = await driver.findElement(By.css(".popup--cookies"));
        assert.ok(!await banner.isDisplayed(), "Cookie banner should be not displayed");
    });

    // it('should navigate to the about page', async function () {
    //     await driver.get(page);
    //     driver.manage().addCookie("cookies_setup", "W3RydWUsdHJ1ZSx0cnVlXQ%3D%3D");

    //     const aboutLink = await driver.findElement(By.css("a[href='https://pja.edu.pl/o-uczelni/']"));
    //     const linkt = await aboutLink.getHref()
    //     console.log(linkt)
    //     await aboutLink.click();
    //     // await new Promise(resolve => setTimeout(resolve, 2000));
    //     const heading = await driver.findElement(By.css("h2"));
    //     const headingText = await heading.getText();
    //     console.log(headingText)
    //     assert.ok(headingText.includes("O Uczelni"), "About page should load with the correct heading");
    // });

    it('have a header', async function () {
        await driver.get(page);
        const header = await driver.findElement(By.className("top-nav"));
        assert.ok(await header.isDisplayed(), "Header should be displayed");
    });

    it('have footer', async function () {
        await driver.get(page);
        const footer = await driver.findElement(By.css("footer"));
        assert.ok(await footer.isDisplayed(), "Footer should be displayed");
    });

    it('have social media links in the footer', async function () {
        await driver.get(page);
        const socialLinks = await driver.findElements(By.css("#menu-all-social-media > li > a"));
        assert.ok(socialLinks.length = 5, "Footer should contain 5 social media links");
    });
});
