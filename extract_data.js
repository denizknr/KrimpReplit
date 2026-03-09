import fs from 'fs';

const content = fs.readFileSync('attached_assets/krimp_lookup_1772797939166.html', 'utf8');
const match = content.match(/const DATA = (\[[\s\S]*?\]);/);
if (match) {
  try {
    let data;
    eval(`data = ${match[1]}`);
    // Map internal keys to our schema keys
    const mappedData = data.map(item => ({
      kesit: item.kesit,
      kontak: item.kontak,
      kalip: item.kalip || "-",
      krimp: item.krimp || "-",
      cekme: item.cekme || "-",
      krimp_gen: item.krimp_gen || "-",
      izok: item.izok || "-",
      not: item.not || ""
    }));
    fs.writeFileSync('script/full_data.json', JSON.stringify(mappedData, null, 2));
    console.log(`Wrote ${mappedData.length} records to script/full_data.json`);
  } catch (e) {
    console.error("Parse error:", e);
  }
} else {
  console.log("DATA array not found.");
}
