// /src/app/api/migrations.ts

import { db } from "./database";

export const migrate = () => {
  db.serialize(() => {
    db.run(
      `
      CREATE TABLE IF NOT EXISTS blogposts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        date TEXT NOT NULL,
        excerpt TEXT NOT NULL,
        tags TEXT NOT NULL, -- Storing tags as a JSON string
        image TEXT NOT NULL,
        content TEXT NOT NULL,
        estimated_read_time INTEGER -- Estimated time to read in minutes
      );
    `,
      (err: Error) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log("blogposts table created successfully.");
        }
      }
    );
  });
};
