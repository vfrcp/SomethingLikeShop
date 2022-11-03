import * as categoriesAction from "./categories";
import * as goodsAction from "./goods";
import * as ordersAction from "./orders";

export const actions = {
  ...categoriesAction,
  ...goodsAction,
  ...ordersAction
}
