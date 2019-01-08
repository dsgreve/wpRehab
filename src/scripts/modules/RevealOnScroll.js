import $ from 'jquery';
import waypoints from '../../../node_modules/waypoints/lib/noframework.waypoints';

class RevealOnScroll {
    constructor() {
        this.itemsToReveal = $(".service-item .wp-block-column");
        this.hideInitially();
        this.createWaypoints();
    }

    hideInitially() {
        this.itemsToReveal.addClass("reveal-item");
    }

    createWaypoints() {
        this.itemsToReveal.each(function(){
            const currentItem = this;
            new Waypoint({
                element: currentItem, //dom element we watch
                handler: function() {
                    $(currentItem).addClass("reveal-item--is-visible")
                }, //what we want to run
                offset: "86%"
            });
        });
    }
}

export default RevealOnScroll;