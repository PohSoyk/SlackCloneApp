import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

config.autoAddCss = false

library.add(fas, far, fab);

Vue.component("font-awesome-icon", FontAwesomeIcon);

import { dom } from "@fortawesome/fontawesome-svg-core";
dom.watch();