describe("Cart Functionality", function () {
    var buyNowButton = "#buyNowButton";
    var qty = "#qty";

    beforeEach(function () {
        browser.url("/product-page.html");
    });
    // should only let you buy after setting a quantity

    it('should only let you buy after setting a quantity', function () {
        var isBtnEnabled = browser.isEnabled(buyNowButton)
        expect(isBtnEnabled, "buy now should be disabled to begin").to.be.false;

        //Add qty
        browser.setValue(qty, 10);

        isBtnEnabled = browser.isEnabled(buyNowButton);
        expect(isBtnEnabled, "buy Now button should be enabled").to.be.true;
    });

    describe("checkout process", function () {
        beforeEach(function () {
            //Add Qty
            browser.setValue(qty, 10);
            browser.click(buyNowButton);
        });
        it('should disable buy now button during processing', function () {
            var isBtnEnabled = browser.isEnabled(buyNowButton);
            expect(isBtnEnabled, "buy now should be disabled after clicking ").to.be.false;

            var btnText = browser.getText(buyNowButton);
            expect(btnText, "Verify buy now text has changed").to.contain("Purchasing");
        });

        // 
        it('should show thank you message with qty and type s', function () {
            var thankYou = ".callout*=Thank you human";
            browser.waitForExist(thankYou, 3000);
            var isBtnEnabled = browser.isEnabled(buyNowButton);
            expect(isBtnEnabled, "buy now should be disabled after completing purchase").to.be.false;
        });
        it('should clear input after completion', function () {
            browser.waitForValue(qty, 3000, true);
        });
        it('should hide thank you message after clicking close button', function () {
            var thankYou = ".callout*=Thank you human";

            // waitForExist "thank you message"
            browser.waitForExist(thankYou, 3000);

            // Click close button
            browser.click(".close-button");

            // use "reverse" flag to wait for it to disappear
            browser.waitForVisible(thankYou, 3000, true);
        }); 

        it.only('should reset button text after purchase completes', function(){
            browser.waitUntil(function(){
                return browser.getText(buyNowButton) !== 'Purchasing...';
            },3000);
            var btnText=browser.getText(buyNowButton);
            expect(btnText).to.equal('Buy Now');
        })
    });
});