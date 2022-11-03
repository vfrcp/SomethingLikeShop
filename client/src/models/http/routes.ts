export const routes = {
  admin: {
    login: "/admin/login",
    register: "/admin/register",
    isAdminExist: "/admin/isAdminExist",
    changePassword: "",
  },
  categories: {
    create: "/categories/create",
    deleteByName: "/categories/delete",
    getByName: "",
    getByPage: "/categories/getByPage",
    get10BySearch: "/categories/get10BySearch",
    getBySearchAndPage: "/categories/getBySearchAndPage"
  },
  goods: {
    getById: "/goods/getById",
    getByIds: "/goods/getByIds",
    deleteById: "/goods/delete",
    getByPage: "/goods/getByPage",
    getBySearchAndCategoryAndPage: "/goods/getBySearchAndCategory",
    getBySearchAndPage: "/goods/getBySearchAndPage",
    getByPageAndCategory: "/goods/getByPageAndCategory",
    editById: "/goods/editById",
    create: "/goods/create"
  },
  orders: {
    confirmById: "/orders/confirm",
    doneById: "/orders/done",
    getByPage: "",
    getUnconfirmedByPage: "/orders/getUnconfirmedByPage",
    getConfirmedByPage: "/orders/getConfirmedByPage",
    getUndoneByPage: "/orders/getUndoneByPage",
    getDoneByPage: "/orders/getDoneByPage",
    getById: "",
    create: "/orders/create",
    deleteById: "/orders/delete"
  }
}