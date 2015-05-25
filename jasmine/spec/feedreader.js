/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        it('have a URL', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
        });

        it('have a name', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });
    });


    describe('The menu', function () {
        /*
         * The menu is hidden using CSS translate. If the body has the class
         * 'menu-hidden' the menu is translated 12em to the left and thus
         * becomes invisible. It would be possible to check the position
         * using jQuery, but I'd rather not check for the specific method
         * of hiding the menu.
         */
        it('should be hidden by default', function () {
            expect(document.querySelector('.menu-hidden')).not.toBeNull();
        });

        /*
         * For the same reason mentioned above this test only checks that the
         * relevant CSS class is switched off and on again
         */
        it('should become visible/invisible when the icon is clicked', function () {
            var icon = document.querySelector('.menu-icon-link');
            icon.click();
            expect(document.querySelector('.menu-hidden')).toBeNull();
            icon.click();
            expect(document.querySelector('.menu-hidden')).not.toBeNull();
        });
    });

    describe('Intial Entries', function () {

        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        it('should contain at least one entry', function (done) {
            expect(document.querySelectorAll('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
    });

    describe('New Feed Selection', function () {
        var initialTitles = [];

        function getTitles() {
            var entries = document.querySelectorAll('.feed .entry h2');
            entries = Array.prototype.slice.call(entries);
            return entries.map(function (entry) {
                return entry.textContent;
            });
        }

        beforeEach(function (done) {
            loadFeed(0, function () {
                // remember titles of entries loaded by first feed
                initialTitles = getTitles();
                loadFeed(1, function () {
                    // signal test framework to continue only when second feed is loaded
                    done();
                });
            });
        });

        it('should load new entries', function (done) {
            expect(getTitles()).not.toEqual(initialTitles);
            done();
        });
    });
}());
