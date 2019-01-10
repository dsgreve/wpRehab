import $ from 'jquery';
import waypoints from '../../../node_modules/waypoints/lib/noframework.waypoints';

class StickyHeader {
    constructor() {
        this.siteHeader = $('.site-header');
        this.headerTrigerElement = $('.wp-block-cover-text');
        this.createHeaderWaypoint();
    }

    createHeaderWaypoint() {
        const that = this;
        new Waypoint({
            element: this.headerTrigerElement[0],
            handler: function(direction) {
                if(direction == "down") {
                    that.siteHeader.addClass('site-header--dark');
                } else {
                    that.siteHeader.removeClass('site-header--dark');
                }
            }
        });
    }
}

export default StickyHeader;