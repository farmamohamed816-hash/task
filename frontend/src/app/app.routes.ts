import {
  Routes
} from "@angular/router";

import {
  Hotelscomponent
} from "./pages/hotels/hotels";

import {
  Booking
} from "./pages/booking/booking";

export const routes: Routes = [

  {
    path: "",
    redirectTo: "hotels",
    pathMatch: "full"
  },

  {
    path: "hotels",
    component: Hotelscomponent
  },

  {
    path: "booking",
    component: Booking
  },

  {
    path: "**",
    redirectTo: "hotels"
  }
];
