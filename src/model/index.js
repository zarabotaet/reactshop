import { createEvent, sample } from "effector";
import { getProductsFx } from "./products";

export const appLoaded = createEvent();

sample({ clock: appLoaded, target: getProductsFx });
