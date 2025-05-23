"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::todo.todo", ({ strapi }) => ({
  async create(ctx) {
    const { data } = ctx.request.body;
    const { user } = ctx.state;

    const todo = await strapi.entityService.create("api::todo.todo", {
      data: {
        ...data,
        user: user.id,
      },
    });

    return this.transformResponse(todo);
  },

  async find(ctx) {
    const { user } = ctx.state;

    const todos = await strapi.entityService.findMany("api::todo.todo", {
      filters: {
        user: user.id,
      },
      populate: ["user"],
    });

    return this.transformResponse(todos);
  },

  async findOne(ctx) {
    const { id } = ctx.params;

    const todo = await strapi.entityService.findOne("api::todo.todo", id, {
      populate: { user: true, target: true },
    });

    if (!todo) {
      return ctx.notFound("Não encontrado");
    }

    return this.transformResponse(todo);
  },

  async update(ctx) {
    const { id } = ctx.params;
    const { user } = ctx.state;

    const todo = await strapi.entityService.findOne("api::todo.todo", id, {
      populate: ["user"],
    });

    if (!todo) {
      return ctx.notFound("Não encontrado");
    }

    const { data } = ctx.request.body;

    const updated = await strapi.entityService.update("api::todo.todo", id, {
      data,
    });

    return this.transformResponse(updated);
  },

  async delete(ctx) {
    const { id } = ctx.params;

    const todo = await strapi.entityService.findOne("api::todo.todo", id, {
      populate: { user: true },
    });

    if (!todo) {
      return ctx.notFound("Não encontrado");
    }

    const deleted = await strapi.entityService.delete("api::todo.todo", id);
    return this.transformResponse(deleted);
  },
}));
