var request = require('sync-request');
browser.addCommand("submitReview", function (email, review) {
    if (email) {
        browser.setValue("#review-email", email);
    }
    if (review) {
        browser.setValue("#review-content", review);
    }
    browser.submitForm('#review-content');
})

describe('The product review form', function () {
    beforeEach(function () {
        browser.url("/product-page.html");
    });
    it('should add a review when submitted properly', function (done) {
        browser.submitReview("muhammadkasim@gmail.com", "This is a test review");
        //Go to the product page
        // // Enter the email address
        // browser.setValue('#review-email',"muhammadkasim@gmail.com");
        // // enter the review text
        // browser.setValue('#review-content',"This is a test review")
        // // click on the submit button
        // browser.submitForm("#review-content");
        // verify the review comment.
        var hasReview = browser.isExisting(".comment=This is a test review");
        expect(hasReview, "comment text exists").to.be.true;
    });

    // should show an error if the input is wrong
    // should hide the error whenthe input is corrected.

    it('should show an error if the input is wrong', function () {
        // verify that there is no error message appearing
        var isErrorShowing = browser.isVisible("p=There are some errors in your review.");
        expect(isErrorShowing).to.be.false;
        // submit form without any content
        browser.submitReview();
        // browser.submitForm("#review-content");
        isErrorShowing = browser.isVisible("p=There are some errors in your review.");
        expect(isErrorShowing).to.be.true;
        isErrorShowing = browser.isVisible("p=There are some errors in your review.");
        // verify the error appears.
    });
    it('should hide the error whenthe input is corrected.', function () {
        browser.submitReview();
        // browser.submitForm("#review-content");
        var isErrorShowing = browser.isVisible("p=Please enter a valid email address.");
        expect(isErrorShowing).to.be.true;
        browser.submitReview("muhammadkasim@gmail.com", null);
        // browser.setValue('#review-email',"muhammadkasim@gmail.com");
        // browser.click("#review-content");
        isErrorShowing = browser.isVisible("p=Please enter a valid email address.");
        expect(isErrorShowing).to.be.false;
        // browser.setValue('#review-content',"This is a test review")
        // browser.submitForm("#review-content");
        browser.submitReview(null, "This is a test review");
        var isMainErrorShowing = browser.isVisible("p=There are some errors in your review.");
        var isReviewContentErrorShowing = browser.isVisible("p=A review without text isn't much of a review.");
        expect(isMainErrorShowing).to.be.false;
        expect(isReviewContentErrorShowing).to.be.false;
    });
    it('should focus be set to the first field that has error in it', function () {
        var emailHasFocus = browser.hasFocus("#review-email");
        expect(emailHasFocus, "email should not have focus").to.be.false;

        browser.submitForm("form");
        emailHasFocus = browser.hasFocus("#review-email");
        expect(emailHasFocus, "email should now have focus").to.be.true;

        browser.setValue('#review-email', "muhamamdkasim@gmail.com");
        browser.submitForm("form");

        var contentHasFocus = browser.hasFocus("#review-content");
        expect(contentHasFocus, "review content field should have focus").to.be.true

    });

    it('should allow multiple reviews', function () {
        var res = request('GET', 'http://jsonplaceholder.typicode.com/posts/1/comments');

        var comments = JSON.parse(res.getBody().toString('utf8'));

        comments.forEach(function (comment, idx) {
            browser.submitReview(comment.email, comment.name);

            var email = browser.getText(".reviews > .comment:nth-of-type(" + (idx + 3) + ") .email");
            expect(email).to.equal(comment.email);

            var reviewText = browser.getText(".reviews > .comment:nth-of-type(" + (idx + 3) + ") .comment");
            expect(reviewText).to.equal(comment.name);
        })
    })
});