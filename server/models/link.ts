import * as Knex from "knex";

export async function createLinkTable(knex: Knex) {
  const hasTable = await knex.schema.hasTable("links");

  if (!hasTable) {
    await knex.schema.createTable("links", table => {
      table.increments("id").primary();
      table.string("address").notNullable();
      table
        .boolean("banned")
        .notNullable()
        .defaultTo(false);
      table
        .integer("banned_by_id")
        .references("id")
        .inTable("users");
      table
        .integer("domain_id")
        .references("id")
        .inTable("domains");
      table.string("password");
      table.string("target").notNullable();
      table
        .integer("user_id")
        .references("id")
        .inTable("users");
      table
        .integer("visit_count")
        .notNullable()
        .defaultTo(0);
      table.timestamps(false, true);
    });
  }
}
