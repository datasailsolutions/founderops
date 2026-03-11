-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "event_id" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "env" TEXT NOT NULL,
    "account_id" TEXT NOT NULL,
    "event_type" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "occurred_at" TIMESTAMP(3) NOT NULL,
    "metadata" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlaybookRun" (
    "id" SERIAL NOT NULL,
    "event_id" TEXT NOT NULL,
    "playbook" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "output" TEXT,
    "ran_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlaybookRun_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_event_id_key" ON "Event"("event_id");
