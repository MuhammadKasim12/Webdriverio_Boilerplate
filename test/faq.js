describe("Home Page FAQ Accordion", function () {
    beforeEach(function () {
        browser.url("/");
    });
    it("should show first section on page load", function () {
        var firstHeight = browser.getCssProperty(".accordion .accordion-item:first-child .accordion-content", "height");
        console.log(firstHeight);
        expect(firstHeight.parsed.value).to.be.greaterThan(0);
    });
    it("should not show other content", function () {
        var secondDisplay = browser.getCssProperty(".accordion .accordion-item:nth-of-type(2) .accordion-content", "display");
        console.log(secondDisplay);
        expect(secondDisplay.value).to.be.equal("none");
    });
    it("should expand/hide content on click", function () {
        browser.click(".accordion .accordion-item:nth-of-type(2) a");
        browser.pause(500);
        var secondHeight = browser.getCssProperty(".accordion .accordion-item:nth-of-type(2) .accordion-content", "height");
        console.log(secondHeight);
        expect(secondHeight.parsed.value).to.be.greaterThan(0);
        var firstDisplay = browser.getCssProperty(".accordion .accordion-item:first-child .accordion-content", "display");
        console.log(firstDisplay);
        expect(firstDisplay.value).to.be.equal("none");
    });

});