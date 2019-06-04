/* eslint-env browser */

import DownloadWorker from "../utils/DownloadWorker.js";
import Menu from "./Menu.js";
import Config from "./DataConfig.js";

var menuData = new Menu();

function getLongWeekday(shortWeekday) {
  let index = Config.WEEKDAYS_SHORT.indexOf(shortWeekday.toLowerCase());
  return Config.WEEKDAYS_LONG[index];
}

function translateMenuEntries(menuData) {
  for (let i = 0; i < menuData.length; i++) {
    let entry = menuData[i];
    entry.day = getLongWeekday(entry.day);
    if (entry.category.startsWith("S")) {
      entry.category = "soup";
    }
    if (entry.category.startsWith("HG")) {
      entry.category = "main";
    }
    if (entry.category.startsWith("B")) {
      entry.category = "sides";
    }
    if (entry.category.startsWith("N")) {
      entry.category = "dessert";
    }
  }
  return menuData;
}

function createMenu(dailyMenus) {
  let newMenu = new Menu();
  for (let i = 0; i < dailyMenus.length; i++) {
    let menuForCurrentDay = dailyMenus[i],
      currentShortDay = menuForCurrentDay[0].day,
      currentLongDay = getLongWeekday(currentShortDay);
    newMenu[currentLongDay] = translateMenuEntries(menuForCurrentDay);
  }
  return newMenu;
}

function createUpdatePromise() {
  return new Promise(function(resolve, reject) {
    let worker = new DownloadWorker();
    worker.addEventListener("finish", function(results) {
      menuData = createMenu(results.data);
      resolve();
    });
    worker.addEventListener("error", function(error) {
      reject(error.data);
    });
    for (let i = 0; i < Config.WEEKDAYS_SHORT.length; i++) {
      let requestURL = Config.BASE_API_URL.replace("{{day}}", Config.WEEKDAYS_SHORT[
        i]);
      worker.addJob(requestURL, "json");
    }
    worker.start();
  });
}

class DataManger {

  update() {
    return createUpdatePromise();
  }

  getMenuFor(day) {
    if (!Config.WEEKDAYS_LONG.includes(day)) {
      throw new Error(`[DataManger] Unrecognized day string "${day}"`);
    }
    return menuData[day];

  }

}

export default new DataManger();