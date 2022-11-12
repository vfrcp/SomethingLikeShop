import * as categoriesAction from "./categories";
import * as goodsAction from "./goods";
import * as ordersAction from "./orders";
import * as userActions from "./user";

export const actions = {
  ...categoriesAction,
  ...goodsAction,
  ...ordersAction,
  ...userActions
}
