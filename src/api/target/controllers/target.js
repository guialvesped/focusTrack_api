"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::target.target", ({ strapi }) => ({
  async create(ctx) {
    const user = ctx.state.user;
    const { data } = ctx.request.body;

    const target = await strapi.entityService.create("api::target.target", {
      data: {
        ...data,
        user: data.user,
      },
    });

    return this.transformResponse(target);
  },

  async findOne(ctx) {
    const { id } = ctx.params;

    const target = await strapi.entityService.findOne(
      "api::target.target",
      id,
      {
        populate: { user: true, todos: true },
      }
    );

    if (!target) {
      return ctx.notFound("Não encontrado");
    }

    return this.transformResponse(target);
  },

  async update(ctx) {
    const { id } = ctx.params;

    const existing = await strapi.entityService.findOne(
      "api::target.target",
      id,
      {
        populate: ["user"],
      }
    );

    if (!existing) {
      return ctx.notFound("Não encontrado");
    }

    const { data } = ctx.request.body;

    const updated = await strapi.entityService.update(
      "api::target.target",
      id,
      {
        data,
      }
    );

    return this.transformResponse(updated);
  },

  async delete(ctx) {
    const { id } = ctx.params;

    const target = await strapi.entityService.findOne(
      "api::target.target",
      id,
      {
        populate: { user: true },
      }
    );

    if (!target) {
      return ctx.notFound("Não encontrado");
    }

    const deleted = await strapi.entityService.delete("api::target.target", id);
    return this.transformResponse(deleted);
  },
}));
