// api/_lib/body.js
async function readRawBody(req) {
    return await new Promise((resolve, reject) => {
      const chunks = [];
      req.on("data", (c) => chunks.push(Buffer.from(c)));
      req.on("end", () => resolve(Buffer.concat(chunks)));
      req.on("error", reject);
    });
  }
  
  async function readJson(req) {
    const raw = await readRawBody(req);
    if (!raw || raw.length === 0) return {};
    try {
      return JSON.parse(raw.toString("utf8"));
    } catch {
      return {};
    }
  }
  
  module.exports = { readRawBody, readJson };