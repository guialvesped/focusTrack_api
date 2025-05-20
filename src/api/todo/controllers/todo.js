"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::todo.todo", ({ strapi }) => ({
  async create(ctx) {
    const user = ctx.state.user;
    if (!user) return ctx.unauthorized("Você precisa estar logado.");

    const { data } = ctx.request.body;

    const todo = await strapi.entityService.create("api::todo.todo", {
      data: {
        ...data,
        user: user.id,
      },
    });

    return this.transformResponse(todo);
  },

  async update(ctx) {
    const user = ctx.state.user;
    const { id } = ctx.params;

    const existing = await strapi.entityService.findOne("api::todo.todo", id, {
      populate: { user: true },
    });

    if (!existing || existing.user.id !== user.id) {
      return ctx.unauthorized("Você não pode editar esse TODO.");
    }

    const { data } = ctx.request.body;

    const updated = await strapi.entityService.update("api::todo.todo", id, {
      data,
    });

    return this.transformResponse(updated);
  },

  async delete(ctx) {
    const user = ctx.state.user;
    const { id } = ctx.params;

    const existing = await strapi.entityService.findOne("api::todo.todo", id, {
      populate: { user: true },
    });

    if (!existing || existing.user.id !== user.id) {
      return ctx.unauthorized("Você não pode deletar esse TODO.");
    }

    const deleted = await strapi.entityService.delete("api::todo.todo", id);
    return this.transformResponse(deleted);
  },
}));
