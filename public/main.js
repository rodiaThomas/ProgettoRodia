import { createNavigator } from "./assets/component/navigator.js";
import { createTitle } from "./assets/component/titleComponent.js";
import { createInfo } from "./assets/component/infoComponent.js";
import { createEndPage } from "./assets/component/endPageComponent.js";
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