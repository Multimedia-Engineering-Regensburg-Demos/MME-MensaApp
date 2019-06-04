/* eslint-env browser */

import Config from "./data/DataConfig.js";
import DataManager from "./data/DataManager.js";
import ViewController from "./ui/ViewController.js";

function init() {
  initUI();
  DataManager.update().then(onMenuUpdate);
}

function initUI() {
  let daySelector = document.querySelector(".day-selector"),
    menuEl = document.querySelector(".daily-menu");
  ViewController.setDaySelectorElement(daySelector);
  ViewController.setMenuElement(menuEl);
  ViewController.addEventListener("daySelected", onDaySelected);
}

function showMenuFor(day) {
  let weekday = day || getCurrentWeekday(),
    menu = DataManager.getMenuFor(weekday);
  ViewController.showMenuForDay(menu, weekday);
}

function onDaySelected(event) {
  showMenuFor(event.data);
}

function onMenuUpdate() {
  let currentWeekday = getCurrentWeekday();
  showMenuFor(currentWeekday);
}

function getCurrentWeekday() {
  let now = new Date(),
    dayNumber = now.getDay();
  // Handle weekends when current day is Saturday (6) or Sunday (5) and no 
  // menu data will be available
  if (dayNumber === 1 || dayNumber === 6) {
    // Select current Friday (5) to display last available day
    // of current week
    dayNumber = 5;
  }
  // Return weekday from array where Monday is on index 0
  return Config.WEEKDAYS_LONG[dayNumber - 1];
}

init();