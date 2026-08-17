exports.up = (pgm) => {
  pgm.createTable("activity_logs", {
    id: "id",
    workspace_id: {
      type: "integer",
      notNull: true,
      references: "workspaces",
      onDelete: "CASCADE",
    },
    project_id: {
      type: "integer",
      references: "projects",
      onDelete: "CASCADE",
    },
    task_id: {
      type: "integer",
      references: "tasks",
      onDelete: "CASCADE",
    },
    user_id: {
      type: "integer",
      references: "users",
      onDelete: "SET NULL",
    },
    action_type: { type: "varchar(50)", notNull: true },
    description: { type: "text", notNull: true },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.createIndex("activity_logs", "workspace_id");
  pgm.createIndex("activity_logs", "project_id");
  pgm.createIndex("activity_logs", "task_id");
};

exports.down = (pgm) => {
  pgm.dropTable("activity_logs");
};