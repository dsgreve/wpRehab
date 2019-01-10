import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';
import $ from 'jquery';

const mobileMenu = new MobileMenu();
new RevealOnScroll($(".service-item"), "85%");
new RevealOnScroll($(".wp-block-quote"), "75%");
new RevealOnScroll($(".home-contact"), "60%");