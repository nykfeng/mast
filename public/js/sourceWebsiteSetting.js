import fetchAndCreate from "./utilities/create.js";
import listening from "./utilities/listeners.js";

async function init() {
  listener();
}

init();

function listener() {
  // website settings
  listening.websiteSettingBySite();
  listening.websiteSettingFormBtns();
}
