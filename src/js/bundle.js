import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';
import StickyHeader from './modules/StickyHeader';
import $ from 'jquery';

new RevealOnScroll($(".large-headline"), "90%");
new RevealOnScroll($(".slide-right"), "60%");
new RevealOnScroll($(".slide-left"), "60%");
new RevealOnScroll($(".service-item"), "85%");
new RevealOnScroll($(".wp-block-quote"), "75%");
new RevealOnScroll($(".home-contact"), "60%");

const mobileMenu = new MobileMenu();
const stickyHeader = new StickyHeader();
