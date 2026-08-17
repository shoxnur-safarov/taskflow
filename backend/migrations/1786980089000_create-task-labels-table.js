exports.up = (pgm) => {
  pgm.createTable("task_labels", {
    id: "id",
    task_id: {
      type: "integer",
      notNull: true,
      references: "tasks",
      onDelete: "CASCADE",
    },
    label_id: {
      type: "integer",
      notNull: true,
      references: "labels",
      onDelete: "CASCADE",
    },
  });

  pgm.addConstraint("task_labels", "unique_task_label", {
    unique: ["task_id", "label_id"],
  });

  pgm.createIndex("task_labels", "task_id");
  pgm.createIndex("task_labels", "label_id");
};

exports.down = (pgm) => {
  pgm.dropTable("task_labels");
};