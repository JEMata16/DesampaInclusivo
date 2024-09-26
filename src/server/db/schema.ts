// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgEnum,
  pgTableCreator,
  primaryKey,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `desampainclusivo_${name}`);

// POSTS AND RELATIONSHIP
export const posts = createTable(
  "posts",
  {
    id: serial("id").primaryKey().notNull(),
    description: varchar("description", {length: 255}),
    provincia: varchar("provincia", { length: 50 }),
    canton: varchar("canton", { length: 50 }),
    rating: integer("rating"),
    authorId: varchar("author_id"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
  },
  (example) => ({
    provinceIndex: index("provincia_idx").on(example.provincia),
  })
);

export const postRelations = relations(posts, ({many}) => ({
  postsToFiles: many(postsToFiles),
  comments: many(comments)
}));

// POST COMMENTS
export const comments = createTable(
  "comments",
  {
    id: serial("id").primaryKey(),
    comment: varchar("description", { length:150 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    userId: varchar("author_id"),
  } 
);

export const commentsRelations = relations(comments, ({one, many}) => ({
  post: one(posts, {
    fields: [comments.userId],
    references: [posts.id],
  }),
  replies: many(replies)
}));

// COMMENT REPLIES
export const replies = createTable(
  "replies",
  {
    id: serial("id").primaryKey(),
    reply: varchar("description", { length: 150 }),
    commentId: integer("comment_id").notNull(),
    userId: varchar("author_id"),

  }
);

export const repliesRelations = relations(replies, ({one}) => ({
  comment: one(comments, {
    fields: [replies.commentId],
    references: [comments.id],
  }),
}))




// FILES OF POSTS AND VIDEOS
export const files = createTable('files', {
  id: serial('id').primaryKey(),
  bucket: varchar('bucket', {length: 100}).notNull(),
  fileName: varchar('file_name').notNull(),
  originalName: varchar('original_name').notNull(),
  createdAt: timestamp('created_at', {withTimezone: true})
    .notNull()
    .default(sql`current_date`),
  size: integer('size').notNull(),
  authorId: varchar('author_id'),
});

export const filesRelations = relations(files, ({many}) => ({
  postsToFiles: many(postsToFiles),
  videos: many(videos),
}))

export const postsToFiles = createTable("postsMedia", {
  postsId: integer("post_id").notNull().references(() => posts.id),
  filesId: integer("file_id").notNull().references(() => files.id),
}, (t) => ({
  pk: primaryKey({columns: [t.postsId, t.filesId]}),
}))


export const postsToFilesRelations = relations(postsToFiles, ({one}) => ({
  file: one(files, {
    fields: [postsToFiles.filesId],
    references: [files.id],
  }),
  post: one(posts, {
    fields: [postsToFiles.postsId],
    references: [posts.id],
  }),
}));

export const videos = createTable("videos", {
  id: serial("id").primaryKey(),
  mediaId: integer("file_id"),
});

export const videosRelations = relations(videos, ({one}) => ({
  file: one(files, {
    fields: [videos.mediaId],
    references: [files.id],
  }),
}));



// MODULO DE INFORMACION SECTION

export const sections = createTable("sections", {
  id: serial("id").primaryKey(),
  title: varchar("title", {length: 255}),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }),
});

export const sectionSubtitles = createTable("subtitles", {
  id: serial("id").primaryKey(),
  description: varchar("description", {length: 255}),
  sectionId: integer("section_id").notNull().references(() => sections.id),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }),
});

export const decorationTexts = createTable("decoration_texts", {
  id: serial("id").primaryKey(),
  subtitleId: integer("subtitle_id").references(() => sectionSubtitles.id),
  description: varchar("description", {length: 255}),
  icon: varchar("icon").notNull()
});


