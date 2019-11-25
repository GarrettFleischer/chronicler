import { Meteor } from "meteor/meteor";

import "../both/config";
import "../both/api";

import "./publications";
import "./security";

Meteor.startup(() => {});
