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
    /*This test suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', () => {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. 
         */
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('have URLs defined', () => {
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            })
         });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have names defined', () => {
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            })
        });
    });


    /* This test suite is all about the menu in our application */

    describe('The menu', () => {

        const body = $('body');
        const event = 'click';
        const menu = $('.menu-icon-link');
        
        /* This test ensures the menu element is
         * hidden by default. 
         */
        it('is hidden by default', () => {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

         /* This test ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * checks if the menu is displayed when
          * clicked and is hidden when clicked again.
          */
        it('changes visibility when menu icon is clicked', () => {
            menu.trigger(event);
            expect(body.hasClass('menu-hidden')).toBe(false);               
            menu.trigger(event);
            expect(body.hasClass('menu-hidden')).toBe(true);   
        });

    });

    /* This test suite all about the Initial Entries in our application */

    describe('Initial Entries', () => {
 
        beforeEach(function(done){
            loadFeed(0,() => {
                done();
            });
        });

        /* This test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */

        it('should have atleast a single entry element within the feed container', function(done){
            const feed = $('.feed .entry');
            expect(feed.length).not.toEqual(0);
            done();
        });
    });

    /* This test suite is all about the Feed Selection in our application
     */

    describe('New Feed Selection', () => {

        let existingFeedEntry, newFeedEntry;

        beforeEach(function(done){
            loadFeed(1, () => {
                newFeedEntry = document.querySelector('.feed').innerHTML;
                loadFeed(0, () => {
                    existingFeedEntry = document.querySelector('.feed').innerHTML;   
                    done();
                });
            });
        });

        /* This test ensures that when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * It changes the feed selection to load the second feed and stores the first link in the Feed under newFeedEntry
         * It then changes the feed selection to load the first feed and stores the first link in the Feed under newFeedEntry
         * It then checks to make sure that the links provided by the two feeds are different
         * hence verifying that the content has changed.
         */

        it('ensures that the content actually changes when a new feed is loaded', function(done){
            expect(existingFeedEntry).not.toEqual(newFeedEntry);
            done();
        });

    });

}());
