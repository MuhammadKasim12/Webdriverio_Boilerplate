describe('Shop CTA Button', function () {
    it('Should link to the product page', function () {
        browser.url('./');

        var title = browser.getTitle()
        console.log('Title is: ' + title);

        // assert.equal(title, 'Robot Parts Emporium');
        // title.should.equal('Robot Parts Emporium');
        expect(title).to.be.equal('Robot Parts Emporium');

        browser.click('.shop-callout a');
        productTitle = browser.getTitle();
        // assert.equal(productTitle,'Totally Not Evil Sentient Robot - Robot Parts Emporium')
        // productTitle.should.equal('Totally Not Evil Sentient Robot - Robot Parts Emporium!');
        expect(productTitle).to.be.equal('Totally Not Evil Sentient Robot - Robot Parts Emporium!');

        var url =browser.getUrl();
        // assert.include(url, "product-page.html")
        // url.should.include( "product-page.html", "url mismatch");
        expect(url).to.include( "product-page.html", "url mismatch");
    })
});



