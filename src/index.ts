import "./icons";
import Router from "./router";
import { cartService } from "./services/cart.service";
import { userService } from "./services/user.service";

let router = new Router();
cartService.init();
userService.init()
  .then(() => {
    document.body.classList.add("is__ready");
    router.route();
  })

/*setTimeout(() => {
  document.body.classList.add("is__ready");
}, 250);*/
