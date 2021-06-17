import { scrollToTop } from "../utils/effects";
export default (context, inject) => {
  inject('scrollToTop', scrollToTop())
}
