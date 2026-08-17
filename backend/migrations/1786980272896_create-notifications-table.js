exports.up = (pgm) => {
  pgm.createTable("notifications", {
    id: "id",
    user_id: {
      type: "integer",
      notNull: true,
      references: "users",
      onDelete: "CASCADE",
    },
    type: { type: "varchar(50)", notNull: true },
    message: { type: "text", notNull: true },
    related_task_id: {
      type: "integer",
      references: "tasks",
      onDelete: "CASCADE",
    },
    related_project_id: {
      type: "integer",
      references: "projects",
      onDelete: "CASCADE",
    },
    is_read: {
      type: "boolean",
      notNull: true,
      default: false,
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.createIndex("notifications", "user_id");
  pgm.createIndex("notifications", "is_read");
};

exports.down = (pgm) => {
  pgm.dropTable("notifications");
};