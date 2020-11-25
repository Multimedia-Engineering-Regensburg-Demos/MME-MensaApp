/* eslint-env browser */

const Config = {
    ENTRY_VIEW_TEMPLATE: document.querySelector("#menu-entry").innerHTML.trim(),
    CSS_HIDDEN_CLASS_NAME: "hidden",
    SHOW_ELEMENT_DELAY_IN_MS: 100,
};

Object.freeze(Config);

export default Config;