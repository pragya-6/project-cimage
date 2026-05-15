import { createServer } from "node:http";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 3001;
const dataDir = join(__dirname, "server-data");
const databasePath = join(dataDir, "database.json");
const distDir = join(__dirname, "dist");

const collections = {
  students: {
    idKey: "studentId",
    seed: [
      {
        studentId: "CIMG001",
        fullName: "Pragya Bharti",
        email: "pragya.bharti@cimage.in",
        mobile: "9876543210",
        gender: "Female",
        dob: "2004-08-12",
        course: "MCA",
        semester: "4",
        rollNumber: "711-2256",
        registrationNumber: "REG2026042",
        attendance: "91",
        cgpa: "8.7",
        status: "Active"
      },
      {
        studentId: "CIMG002",
        fullName: "Rahul Kumar",
        email: "rahul.kumar@cimage.in",
        mobile: "9123456780",
        gender: "Male",
        dob: "2003-11-24",
        course: "BBA",
        semester: "2",
        rollNumber: "BBA018",
        registrationNumber: "REG2026018",
        attendance: "84",
        cgpa: "7.9",
        status: "Active"
      },
      {
        studentId: "CIMG003",
        fullName: "Anjali Verma",
        email: "anjali.verma@cimage.in",
        mobile: "9988776655",
        gender: "Female",
        dob: "2004-02-19",
        course: "BCA",
        semester: "6",
        rollNumber: "BCA109",
        registrationNumber: "REG2026109",
        attendance: "76",
        cgpa: "8.1",
        status: "Inactive"
      },
      {
        studentId: "CIMG004",
        fullName: "Aman Raj",
        email: "aman.raj@cimage.in",
        mobile: "9090909090",
        gender: "Male",
        dob: "2005-05-03",
        course: "MCA",
        semester: "1",
        rollNumber: "MCA011",
        registrationNumber: "REG2027011",
        attendance: "88",
        cgpa: "8.4",
        status: "Active"
      }
    ]
  },
  courses: {
    idKey: "courseCode",
    seed: [
      { courseCode: "BCA101", courseName: "Web Development", faculty: "Dr. Neha Sharma", semester: "4", duration: "6 months", credits: "4", status: "Active", description: "React and modern frontend basics" },
      { courseCode: "BCA204", courseName: "Database Management", faculty: "Prof. Amit Kumar", semester: "3", duration: "6 months", credits: "5", status: "Active", description: "SQL, ER models, normalization" },
      { courseCode: "MCA110", courseName: "Data Structures", faculty: "Dr. R. Singh", semester: "1", duration: "6 months", credits: "4", status: "Active", description: "Core DSA concepts" }
    ]
  },
  assignments: {
    idKey: "assignmentId",
    seed: [
      { assignmentId: "ASG001", title: "React Components", course: "Web Development", dueDate: "2026-05-22", totalMarks: "50", status: "Pending", description: "Create reusable components" },
      { assignmentId: "ASG002", title: "SQL Joins", course: "Database Management", dueDate: "2026-05-25", totalMarks: "40", status: "Submitted", description: "Practice inner and outer joins" },
      { assignmentId: "ASG003", title: "Stack Program", course: "Data Structures", dueDate: "2026-05-28", totalMarks: "30", status: "Checked", description: "Implement stack operations" }
    ]
  },
  attendance: {
    idKey: "attendanceId",
    seed: [
      { attendanceId: "ATT001", studentId: "CIMG001", studentName: "Pragya Bharti", course: "MCA", semester: "4", totalClasses: "60", presentClasses: "55", attendancePercent: "91", status: "Regular" },
      { attendanceId: "ATT002", studentId: "CIMG002", studentName: "Rahul Kumar", course: "BBA", semester: "2", totalClasses: "58", presentClasses: "49", attendancePercent: "84", status: "Regular" },
      { attendanceId: "ATT003", studentId: "CIMG003", studentName: "Anjali Verma", course: "BCA", semester: "6", totalClasses: "62", presentClasses: "47", attendancePercent: "76", status: "Short Attendance" }
    ]
  }
};

const mimeTypes = {
  ".css": "text/css",
  ".html": "text/html",
  ".js": "text/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".svg": "image/svg+xml"
};

function createInitialDatabase() {
  return Object.fromEntries(
    Object.entries(collections).map(([name, config]) => [name, config.seed])
  );
}

function ensureDatabase() {
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }

  if (!existsSync(databasePath)) {
    writeFileSync(databasePath, JSON.stringify(createInitialDatabase(), null, 2));
  }
}

function readDatabase() {
  ensureDatabase();
  return JSON.parse(readFileSync(databasePath, "utf8"));
}

function writeDatabase(database) {
  writeFileSync(databasePath, JSON.stringify(database, null, 2));
}

function sendJson(response, statusCode, data) {
  response.writeHead(statusCode, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  });
  response.end(JSON.stringify(data));
}

function parseBody(request) {
  return new Promise((resolveBody, rejectBody) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;
    });

    request.on("end", () => {
      try {
        resolveBody(body ? JSON.parse(body) : {});
      } catch {
        rejectBody(new Error("Invalid JSON body"));
      }
    });
  });
}

async function handleApi(request, response, pathname) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (request.method === "OPTIONS") {
    response.writeHead(204);
    response.end();
    return;
  }

  const [, collectionName, rawId] = pathname.match(/^\/api\/([^/]+)\/?([^/]*)/) ?? [];
  const collection = collections[collectionName];

  if (!collection) {
    sendJson(response, 404, { message: "Collection not found" });
    return;
  }

  const id = rawId ? decodeURIComponent(rawId) : "";
  const database = readDatabase();
  database[collectionName] ??= [];
  const records = database[collectionName];

  if (request.method === "GET" && !id) {
    sendJson(response, 200, records);
    return;
  }

  if (request.method === "POST" && !id) {
    const record = await parseBody(request);
    const recordId = String(record[collection.idKey] ?? "").trim();

    if (!recordId) {
      sendJson(response, 400, { message: `${collection.idKey} is required` });
      return;
    }

    if (records.some((item) => item[collection.idKey] === recordId)) {
      sendJson(response, 409, { message: "A record with this ID already exists" });
      return;
    }

    records.push({ ...record, [collection.idKey]: recordId });
    writeDatabase(database);
    sendJson(response, 201, records.at(-1));
    return;
  }

  if (request.method === "PUT" && id) {
    const record = await parseBody(request);
    const nextId = String(record[collection.idKey] ?? id).trim();
    const index = records.findIndex((item) => item[collection.idKey] === id);

    if (index === -1) {
      sendJson(response, 404, { message: "Record not found" });
      return;
    }

    const duplicate = records.some(
      (item, itemIndex) => itemIndex !== index && item[collection.idKey] === nextId
    );

    if (duplicate) {
      sendJson(response, 409, { message: "Another record already uses this ID" });
      return;
    }

    records[index] = { ...record, [collection.idKey]: nextId };
    writeDatabase(database);
    sendJson(response, 200, records[index]);
    return;
  }

  if (request.method === "DELETE" && id) {
    const nextRecords = records.filter((item) => item[collection.idKey] !== id);

    if (nextRecords.length === records.length) {
      sendJson(response, 404, { message: "Record not found" });
      return;
    }

    database[collectionName] = nextRecords;
    writeDatabase(database);
    sendJson(response, 200, { success: true });
    return;
  }

  sendJson(response, 405, { message: "Method not allowed" });
}

function serveStatic(response, pathname) {
  const requestedPath = pathname === "/" ? "index.html" : pathname.slice(1);
  const filePath = resolve(distDir, requestedPath);
  const safeDistDir = resolve(distDir);
  const staticPath = filePath.startsWith(safeDistDir) && existsSync(filePath)
    ? filePath
    : join(distDir, "index.html");
  const extension = extname(staticPath);

  response.writeHead(200, {
    "Content-Type": mimeTypes[extension] ?? "application/octet-stream"
  });
  response.end(readFileSync(staticPath));
}

ensureDatabase();

createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host}`);

    if (url.pathname.startsWith("/api/")) {
      await handleApi(request, response, url.pathname);
      return;
    }

    serveStatic(response, url.pathname);
  } catch (error) {
    sendJson(response, 500, { message: error.message });
  }
}).listen(port, "0.0.0.0", () => {
  console.log(`CIMAGE Student Portal is running on http://localhost:${port}`);
  console.log(`Database file: ${databasePath}`);
});
