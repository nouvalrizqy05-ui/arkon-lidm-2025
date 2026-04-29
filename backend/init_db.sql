-- =========================================================
-- ARKON (Augmented Reality Komputer Organizer)
-- PostgreSQL Database Initialization Script
-- =========================================================

-- 1. Create Role Enum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'LECTURER', 'ADMIN');

-- 2. Create User Table
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'STUDENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- Create Unique Index on User email
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- 3. Create Topic Table
CREATE TABLE "Topic" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "markerImage" TEXT NOT NULL,
    "arContent" JSONB NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- Create Unique Index on Topic slug
CREATE UNIQUE INDEX "Topic_slug_key" ON "Topic"("slug");

-- 4. Create Quiz Table
CREATE TABLE "Quiz" (
    "id" SERIAL NOT NULL,
    "topicId" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "options" JSONB NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);

-- 5. Create QuizResult Table
CREATE TABLE "QuizResult" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "quizId" INTEGER NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuizResult_pkey" PRIMARY KEY ("id")
);

-- 6. Create Progress Table
CREATE TABLE "Progress" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "topicId" INTEGER NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "lastViewed" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Progress_pkey" PRIMARY KEY ("id")
);

-- Create Unique Index for Progress (Satu user hanya punya satu progress per topik)
CREATE UNIQUE INDEX "Progress_userId_topicId_key" ON "Progress"("userId", "topicId");


-- =========================================================
-- ADD FOREIGN KEYS
-- =========================================================

-- Foreign Key: Quiz -> Topic
ALTER TABLE "Quiz" 
  ADD CONSTRAINT "Quiz_topicId_fkey" 
  FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Foreign Key: QuizResult -> User
ALTER TABLE "QuizResult" 
  ADD CONSTRAINT "QuizResult_userId_fkey" 
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Foreign Key: QuizResult -> Quiz
ALTER TABLE "QuizResult" 
  ADD CONSTRAINT "QuizResult_quizId_fkey" 
  FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Foreign Key: Progress -> User
ALTER TABLE "Progress" 
  ADD CONSTRAINT "Progress_userId_fkey" 
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- =========================================================
-- SEED DATA (RPS ALIGNED)
-- =========================================================

-- Seed Topics
INSERT INTO "Topic" ("slug", "title", "description", "markerImage", "arContent", "order") VALUES
('cpu-overview', 'CPU Overview', 'Komponen dasar CPU: ALU, Control Unit, dan Register', '/markers/hiro.png', '{"type": "cpu"}', 1),
('pipeline', 'CPU Pipeline', 'Visualisasi 5 tahap pipeline: IF, ID, EX, MEM, WB', '/markers/hiro.png', '{"type": "pipeline"}', 2),
('logic-gates', 'Boolean Logic & Gates', 'Sub-CPMK 2 & 6: Simulasi gerbang logika AND, OR, NOT, XOR', '/markers/hiro.png', '{"type": "logic"}', 3),
('set-theory-mem', 'Set Theory in Memory', 'Sub-CPMK 1 & 5: Pemetaan set himpunan alamat pada Cache mapping', '/markers/hiro.png', '{"type": "none"}', 4),
('number-theory-adv', 'Advanced Number Theory', 'Sub-CPMK 3, 7, 9: Two''s Complement & IEEE 754', '/markers/hiro.png', '{"type": "none"}', 5);

-- Seed Quizzes (RPS Specific)
INSERT INTO "Quiz" ("topicId", "question", "options", "answer") VALUES
(3, 'Gerbang logika manakah yang menghasilkan output 1 hanya jika semua input bernilai 1?', '["OR", "AND", "XOR", "NOT"]', 'AND'),
(3, 'Dalam aljabar Boolean (Sub-CPMK 6), hasil dari A + A'' adalah?', '["0", "1", "A", "A''"]', '1'),
(4, 'Berapa jumlah set dalam cache 8-way set-associative (Sub-CPMK 5) jika total cache line adalah 64?', '["8", "16", "32", "64"]', '8'),
(5, 'Representasi 8-bit Two''s Complement (Sub-CPMK 7) dari bilangan -5 adalah?', '["11111011", "11111010", "11111111", "00000101"]', '11111011');
