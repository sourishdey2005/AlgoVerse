import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import sqlite3 from "sqlite3";

const PORT = 3000;
const app = express();

app.use(express.json());

// Initialize SQLite Database
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Error opening SQLite database:", err);
  } else {
    console.log("Connected to SQLite database.");
  }
});

// Create tables & seed default database rows
db.serialize(() => {
  // 1. User stats table
  db.run(`
    CREATE TABLE IF NOT EXISTS user_stats (
      visitor_id TEXT PRIMARY KEY,
      xp INTEGER DEFAULT 350,
      streak INTEGER DEFAULT 12,
      solved_ids TEXT DEFAULT '["bubble-sort-easy"]',
      badges TEXT DEFAULT '["Bubble Master"]',
      level INTEGER DEFAULT 1,
      heatmap TEXT DEFAULT '{}'
    )
  `);

  // 2. Submissions table
  db.run(`
    CREATE TABLE IF NOT EXISTS submissions (
      id TEXT PRIMARY KEY,
      visitor_id TEXT,
      problem_id TEXT,
      problem_title TEXT,
      language TEXT,
      code TEXT,
      status TEXT,
      runtime_ms INTEGER,
      memory_mb INTEGER,
      submitted_at TEXT
    )
  `);

  // 3. Forum posts table
  db.run(`
    CREATE TABLE IF NOT EXISTS forum_posts (
      id TEXT PRIMARY KEY,
      visitor_id TEXT,
      title TEXT,
      author TEXT,
      avatar TEXT,
      category TEXT,
      content TEXT,
      upvotes INTEGER DEFAULT 0,
      replies INTEGER DEFAULT 0,
      time_ago TEXT,
      created_at TEXT
    )
  `);

  // 4. Forum comments table
  db.run(`
    CREATE TABLE IF NOT EXISTS forum_comments (
      id TEXT PRIMARY KEY,
      post_id TEXT,
      visitor_id TEXT,
      author TEXT,
      content TEXT,
      time_ago TEXT,
      created_at TEXT
    )
  `);

  // Seed default community discussion threads if table is empty
  db.get(`SELECT COUNT(*) as count FROM forum_posts`, [], (err, row: any) => {
    if (!err && row && row.count === 0) {
      console.log("Seeding initial forum posts into SQLite database...");
      
      const posts = [
        {
          id: "post-1",
          visitor_id: "system",
          title: "How does Hoare's quicksort partition scheme avoid worst-case regressions?",
          author: "Alex Algomist",
          avatar: "AA",
          category: "Sorting",
          content: "I've been visualising Quick Sort on AlgoVerse but noticed the Hoare partition pointers i and j sometimes cross differently than Lomuto partitions. What is the fundamental asymptotic difference?",
          upvotes: 42,
          replies: 2,
          time_ago: "2 hours ago"
        },
        {
          id: "post-2",
          visitor_id: "system",
          title: "Kadane's Algorithm: Does it fail if all elements are strictly negative?",
          author: "Brandon Stack",
          avatar: "BS",
          category: "Array",
          content: "If my entire input array consists of negative numbers, e.g., [-3, -15, -2, -7], does Kadane's Sorter return 0 or the maximum single item? Let's check.",
          upvotes: 28,
          replies: 1,
          time_ago: "1 day ago"
        },
        {
          id: "post-3",
          visitor_id: "system",
          title: "Dynamic Programming: How do I easily design the tabulation dimensions?",
          author: "Sophia Recursion",
          avatar: "SR",
          category: "DP",
          content: "I find tabulation tables very challenging compared to simple recursive memoization trees. Is there an elegant grid design trick?",
          upvotes: 19,
          replies: 0,
          time_ago: "2 days ago"
        }
      ];

      posts.forEach(p => {
        db.run(
          `INSERT INTO forum_posts (id, visitor_id, title, author, avatar, category, content, upvotes, replies, time_ago, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`,
          [p.id, p.visitor_id, p.title, p.author, p.avatar, p.category, p.content, p.upvotes, p.replies, p.time_ago]
        );
      });

      // Insert some initial comments matching seed posts
      const comments = [
        { id: "c-1", post_id: "post-1", visitor_id: "system", author: "Jessica Taylor", content: "Great question! Hoare's scheme performs about three times fewer swaps on average compared to Lomuto partition, and holds up much more efficiently when elements are duplicate.", time_ago: "1 hour ago" },
        { id: "c-2", post_id: "post-1", visitor_id: "system", author: "Sourish Dey", content: "Yes indeed! Hoare's scheme uses two pointers converging which is inherently more robust. However, remember both Lomuto and Hoare hit O(n²) if the array is already sorted and you don't choose a random pivot index.", time_ago: "10 mins ago" },
        { id: "c-3", post_id: "post-2", visitor_id: "system", author: "CodeWizard", content: "It depends! Standalone versions that initialize current_sum to 0 yield 0, but standard LeetCode implementations initialize max_ending_here to array[0] which correctly yields -2 (the maximum single negative value). The Kadane visualizer here uses the latter!", time_ago: "18 hours ago" }
      ];

      comments.forEach(c => {
        db.run(
          `INSERT INTO forum_comments (id, post_id, visitor_id, author, content, time_ago, created_at) VALUES (?, ?, ?, ?, ?, ?, datetime('now'))`,
          [c.id, c.post_id, c.visitor_id, c.author, c.content, c.time_ago]
        );
      });
    }
  });
});

// Helper DB wraps for clean async API routes
const dbRun = (query: string, params: any[] = []): Promise<any> => {
  return new Promise((resolve, reject) => {
    db.run(query, params, function (this: any, err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
};

const dbGet = (query: string, params: any[] = []): Promise<any> => {
  return new Promise((resolve, reject) => {
    db.get(query, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const dbAll = (query: string, params: any[] = []): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

/* Endpoints */

// 1. Authenticate / Retrieve User Stats or create default if not exists
app.get("/api/user-stats", async (req, res) => {
  const visitorId = req.query.visitorId as string;
  if (!visitorId) {
    return res.status(400).json({ error: "Missing visitorId query parameter" });
  }

  try {
    let row = await dbGet("SELECT * FROM user_stats WHERE visitor_id = ?", [visitorId]);
    if (!row) {
      // Create user entry
      await dbRun(
        `INSERT INTO user_stats (visitor_id, xp, streak, solved_ids, badges, level, heatmap) VALUES (?, 350, 12, '["bubble-sort-easy"]', '["Bubble Master"]', 1, '{}')`,
        [visitorId]
      );
      row = await dbGet("SELECT * FROM user_stats WHERE visitor_id = ?", [visitorId]);
    }

    res.json({
      visitorId: row.visitor_id,
      xp: row.xp,
      streak: row.streak,
      solvedIds: JSON.parse(row.solved_ids || "[]"),
      badges: JSON.parse(row.badges || "[]"),
      level: row.level,
      heatmap: JSON.parse(row.heatmap || "{}"),
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Update stats (XP & increment streak or level up)
app.post("/api/user-stats/update", async (req, res) => {
  const { visitorId, xp, streak, level, solvedIds, badges, heatmap } = req.body;
  if (!visitorId) {
    return res.status(400).json({ error: "Missing visitorId body parameter" });
  }

  try {
    // Check if exists
    const row = await dbGet("SELECT * FROM user_stats WHERE visitor_id = ?", [visitorId]);
    if (!row) {
      await dbRun(
        `INSERT INTO user_stats (visitor_id, xp, streak, solved_ids, badges, level, heatmap) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          visitorId,
          xp ?? 350,
          streak ?? 12,
          JSON.stringify(solvedIds ?? ["bubble-sort-easy"]),
          JSON.stringify(badges ?? ["Bubble Master"]),
          level ?? 1,
          JSON.stringify(heatmap ?? {})
        ]
      );
    } else {
      await dbRun(
        `UPDATE user_stats SET xp = ?, streak = ?, solved_ids = ?, badges = ?, level = ?, heatmap = ? WHERE visitor_id = ?`,
        [
          xp !== undefined ? xp : row.xp,
          streak !== undefined ? streak : row.streak,
          solvedIds ? JSON.stringify(solvedIds) : row.solved_ids,
          badges ? JSON.stringify(badges) : row.badges,
          level !== undefined ? level : row.level,
          heatmap ? JSON.stringify(heatmap) : row.heatmap,
          visitorId,
        ]
      );
    }

    const updated = await dbGet("SELECT * FROM user_stats WHERE visitor_id = ?", [visitorId]);
    res.json({
      visitorId: updated.visitor_id,
      xp: updated.xp,
      streak: updated.streak,
      solvedIds: JSON.parse(updated.solved_ids || "[]"),
      badges: JSON.parse(updated.badges || "[]"),
      level: updated.level,
      heatmap: JSON.parse(updated.heatmap || "{}"),
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Register a code submission
app.post("/api/submissions", async (req, res) => {
  const { id, visitorId, problemId, problemTitle, language, code, status, runtimeMs, memoryMb } = req.body;
  
  if (!visitorId || !problemId || !id) {
    return res.status(400).json({ error: "Missing required submission body parameters" });
  }

  try {
    const nowStr = new Date().toISOString();
    await dbRun(
      `INSERT INTO submissions (id, visitor_id, problem_id, problem_title, language, code, status, runtime_ms, memory_mb, submitted_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, visitorId, problemId, problemTitle, language, code, status, runtimeMs, memoryMb, nowStr]
    );

    res.json({ success: true, submissionId: id });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Retrieve submissions
app.get("/api/submissions", async (req, res) => {
  const visitorId = req.query.visitorId as string;
  if (!visitorId) {
    return res.status(400).json({ error: "Missing visitorId query parameter" });
  }

  try {
    const list = await dbAll("SELECT * FROM submissions WHERE visitor_id = ? ORDER BY submitted_at DESC", [visitorId]);
    res.json(list.map(item => ({
      id: item.id,
      problemId: item.problem_id,
      problemTitle: item.problem_title,
      language: item.language,
      code: item.code,
      status: item.status,
      runtimeMs: item.runtime_ms,
      memoryMb: item.memory_mb,
      submittedAt: item.submitted_at,
    })));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 5. Retrieve Forum threads
app.get("/api/forum", async (req, res) => {
  try {
    const posts = await dbAll("SELECT * FROM forum_posts ORDER BY created_at DESC");
    const commentsList = await dbAll("SELECT * FROM forum_comments ORDER BY created_at ASC");
    
    // Structure items neatly
    const structured = posts.map((post) => {
      const matchComments = commentsList
        .filter((c) => c.post_id === post.id)
        .map((c) => ({
          id: c.id,
          author: c.author,
          content: c.content,
          timeAgo: c.time_ago,
        }));

      return {
        id: post.id,
        title: post.title,
        author: post.author,
        avatar: post.avatar,
        category: post.category,
        content: post.content,
        upvotes: post.upvotes,
        replies: matchComments.length,
        timeAgo: post.time_ago,
        comments: matchComments,
      };
    });

    res.json(structured);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 6. Create Forum post
app.post("/api/forum/post", async (req, res) => {
  const { id, visitorId, title, author, avatar, category, content } = req.body;
  if (!id || !visitorId || !title || !content) {
    return res.status(400).json({ error: "Missing required post body fields" });
  }

  try {
    await dbRun(
      `INSERT INTO forum_posts (id, visitor_id, title, author, avatar, category, content, upvotes, replies, time_ago, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, 1, 0, 'Just now', datetime('now'))`,
      [id, visitorId, title, author || "Visitor", avatar || "V", category || "General", content]
    );

    res.json({ success: true, id });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 7. Add forum comment
app.post("/api/forum/comment", async (req, res) => {
  const { id, postId, visitorId, author, content } = req.body;
  if (!id || !postId || !visitorId || !content) {
    return res.status(400).json({ error: "Missing required comment body parameters" });
  }

  try {
    await dbRun(
      `INSERT INTO forum_comments (id, post_id, visitor_id, author, content, time_ago, created_at) VALUES (?, ?, ?, ?, ?, 'Just now', datetime('now'))`,
      [id, postId, visitorId, author || "Visitor", content]
    );

    // Update reply counter
    await dbRun(`UPDATE forum_posts SET replies = replies + 1 WHERE id = ?`, [postId]);

    res.json({ success: true, id });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 8. Upvote forum post
app.post("/api/forum/upvote", async (req, res) => {
  const { postId } = req.body;
  if (!postId) {
    return res.status(400).json({ error: "Missing postId" });
  }

  try {
    await dbRun(`UPDATE forum_posts SET upvotes = upvotes + 1 WHERE id = ?`, [postId]);
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});


// Vite middleware integration (for dev/prod environments)
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[ALGOVERSE SERVER] Running successfully on http://0.0.0.0:${PORT}`);
  });
}

startServer();
