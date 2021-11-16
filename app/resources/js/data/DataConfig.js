/* eslint-env browser */

const Config = {
    BASE_API_URL: "https://mensa.software-engineering.education/mensa/uni/{{day}}",
    WEEKDAYS_SHORT: ["mo", "di", "mi", "do", "fr"],
    WEEKDAYS_LONG: ["monday", "tuesday", "wednesday", "thursday", "friday"],
};

Object.freeze(Config);

export default Config;