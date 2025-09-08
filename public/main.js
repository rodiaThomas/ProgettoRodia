import { createNavigator } from "./assets/component/navigator.js";
import { createTitle } from "./assets/component/titleComponent.js";
import { createInfo } from "./assets/component/infoComponent.js";
import { createEndPage } from "./assets/component/endPageComponent.js";
import { createCarusel } from "./assets/component/cauruselComponent.js";
import { createNavbar } from "./assets/component/navbarComponet.js";
import { createNews } from "./assets/component/newsComponent.js";
const navigator = createNavigator(document.querySelector("#container"));

let title = document.getElementById("title");
let navbar = document.getElementById("navbar");
let info = document.getElementById("info");
let news = document.getElementById("news");
let carusel = document.getElementById("carusel");
let endpage = document.getElementById("endpage");

let createtitle=createTitle(title);
createtitle.build();
createtitle.render();

let createinfo=createInfo(info);
createinfo.build();
createinfo.render();

let createendpage=createEndPage(endpage);
createendpage.build();
createendpage.render();

let createcarusel=createCarusel(carusel);
createcarusel.build();
createcarusel.render();

let createnavbar=createNavbar(navbar);
createnavbar.build();
createnavbar.render();

let createnews=createNews(news);
createnews.build();
createnews.render();