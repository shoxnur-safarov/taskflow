exports.up = (pgm) => {
  pgm.createTable("workspaces", {
    id: "id",
    name: { type: "varchar(255)", notNull: true },
    description: { type: "text" },
    owner_id: {
      type: "integer",
      notNull: true,
      references: "users",
      onDelete: "CASCADE",
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.createIndex("workspaces", "owner_id");
};

exports.down = (pgm) => {
  pgm.dropTable("workspaces");
};