exports.up = (pgm) => {
  pgm.createTable("comments", {
    id: "id",
    task_id: {
      type: "integer",
      notNull: true,
      references: "tasks",
      onDelete: "CASCADE",
    },
    user_id: {
      type: "integer",
      references: "users",
      onDelete: "SET NULL",
    },
    content: { type: "text", notNull: true },
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

  pgm.createIndex("comments", "task_id");
  pgm.createIndex("comments", "user_id");
};

exports.down = (pgm) => {
  pgm.dropTable("comments");
};