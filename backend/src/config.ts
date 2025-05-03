import { yes } from "./utils";

export default {
  allowAnonymous: yes(process.env.ALLOW_ANONYMOUS),
};
