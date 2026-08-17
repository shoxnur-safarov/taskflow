exports.up = (pgm) => {
  pgm.createTable("projects", {
    id: "id",
    workspace_id: {
      type: "integer",
      notNull: true,
      references: "workspaces",
      onDelete: "CASCADE",
    },
    name: { type: "varchar(255)", notNull: true },
    description: { type: "text" },
    status: {
      type: "varchar(20)",
      notNull: true,
      default: "active",
    },
    created_by: {
      type: "integer",
      references: "users",
      onDelete: "SET NULL",
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

  pgm.createIndex("projects", "workspace_id");
  pgm.createIndex("projects", "created_by");
};

exports.down = (pgm) => {
  pgm.dropTable("projects");
};