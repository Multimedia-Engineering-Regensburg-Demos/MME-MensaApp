/* eslint-env browser */

import { Event, Observable } from "../utils/Observable.js";
import Config from "./ViewConfig.js";
import View from "./View.js";

function onMenuClicked(event) {
    let el = event.target;
    if (el.classList.contains("button")) {
        if (el.classList.contains("selected")) {
            return;
        }
        let day = el.getAttribute("data-day"),
            event = new Event("daySelected", day);
        this.notifyAll(event);
    }
}

function renderMenu(menu, day) {
    let dayEl = this.selector.querySelector("[data-day='" + day + "']"),
        animationOffset = 0;
    resetView.apply(this);
    dayEl.classList.add("selected");
    for (let i = 0; i < menu.length; i++) {
        let entryView = View.fromTemplate(Config.ENTRY_VIEW_TEMPLATE, menu[i]),
            categoryEl = this.menu.querySelector("[data-category='" + menu[i].category +
                "']");
        categoryEl.append(entryView.element);
        setTimeout(function() {
            entryView.show();
        }, animationOffset);
        animationOffset += Config.SHOW_ELEMENT_DELAY_IN_MS;
    }
}

function resetView() {
    let currentlySelectedDay = this.selector.querySelector(".selected"),
        entries = this.menu.querySelectorAll(".entry");
    if (currentlySelectedDay) {
        currentlySelectedDay.classList.remove("selected");
    }
    for (let i = 0; i < entries.length; i++) {
        entries[i].parentNode.removeChild(entries[i]);
    }
}

class ViewController extends Observable {

    setDaySelectorElement(el) {
        this.selector = el;
        this.selector.addEventListener("click", onMenuClicked.bind(this));
    }

    setMenuElement(el) {
        this.menu = el;
    }

    showMenuForDay(menu, day) {
        renderMenu.apply(this, [menu, day]);
    }

}

export default new ViewController();