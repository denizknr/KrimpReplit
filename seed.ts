import { pool, db } from "../server/db";
import { crimpData } from "../shared/schema";
import fs from "fs";
import path from "path";

async function seed() {
  console.log("Seeding full data...");
  try {
    const dataPath = path.join(process.cwd(), "script", "full_data.json");
    if (!fs.existsSync(dataPath)) {
      console.error("Data file not found! Run extract_data.js first.");
      process.exit(1);
    }
    const rawData = fs.readFileSync(dataPath, "utf-8");
    const parsedData = JSON.parse(rawData);
    
    await db.delete(crimpData);
    
    let count = 0;
    for (const item of parsedData) {
      await db.insert(crimpData).values({
        kesit: item.kesit,
        kontakNo: item.kontak,
        kalipNo: item.kalip || "-",
        krimpYuksekligi: item.krimp || "-",
        cekmeKuvveti: item.cekme || "-",
        krimpGenisligi: item.krimp_gen || "-",
        izokrimpYuksekligi: item.izok || "-"
      });
      count++;
    }
    console.log(`Seeding complete! Inserted ${count} records.`);
  } catch (error) {
    console.error("Error seeding:", error);
  } finally {
    process.exit(0);
  }
}

seed();
