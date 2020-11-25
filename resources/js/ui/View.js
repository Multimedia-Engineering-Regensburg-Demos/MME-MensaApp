/* eslint-env browser */

import Config from "./ViewConfig.js";
import Observable from "../utils/Observable.js";

class View extends Observable {

    constructor(el) {
        super();
        this.element = el || undefined;
    }

    show() {
        if (this.element) {
            this.element.classList.remove(Config.CSS_HIDDEN_CLASS_NAME);
        }
    }

    hide() {
        if (this.element) {
            this.element.classList.add(Config.CSS_HIDDEN_CLASS_NAME);
        }
    }

    static fromTemplate(template, data) {
        let container = document.createElement("div"),
            // RegEx from: https://stackoverflow.com/questions/17056064/javascript-regex-match-all-and-replace
            elString = template.replace(/\{\{(.*?)\}\}/g, function(match, token) {
                return data[token];
            });
        container.innerHTML = elString;
        return new View(container.firstChild);
    }

}

export default View;