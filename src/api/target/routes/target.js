"use strict";

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/targets",
      handler: "target.find",
    },
    {
      method: "GET",
      path: "/targets/:id",
      handler: "target.findOne",
    },
    {
      method: "POST",
      path: "/targets",
      handler: "target.create",
    },
    {
      method: "PUT",
      path: "/targets/:id",
      handler: "target.update",
    },
    {
      method: "DELETE",
      path: "/targets/:id",
      handler: "target.delete",
    },
  ],
};
