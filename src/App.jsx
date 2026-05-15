import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  X,
  ClipboardList,
  Edit3,
  GraduationCap,
  LayoutDashboard,
  Menu,
  Palette,
  Plus,
  RefreshCcw,
  Search,
  Trash2,
  UsersRound,
  UserRound
} from "lucide-react";

const courses = [
  { name: "Bachelor of Computer Applications", progress: 78 },
  { name: "Data Structures & Algorithms", progress: 64 },
  { name: "Database Management System", progress: 52 },
  { name: "Web Development with React", progress: 86 }
];

const progress = [
  {
    label: "Total courses",
    value: "08",
    icon: BookOpen,
    color: "bg-blue-600",
    tint: "bg-blue-50 text-blue-700"
  },
  {
    label: "Completed courses",
    value: "05",
    icon: CheckCircle2,
    color: "bg-emerald-500",
    tint: "bg-emerald-50 text-emerald-700"
  },
  {
    label: "Pending assignments",
    value: "03",
    icon: ClipboardList,
    color: "bg-amber-500",
    tint: "bg-amber-50 text-amber-700"
  },
  {
    label: "Attendance percentage",
    value: "91%",
    icon: CalendarDays,
    color: "bg-cyan-500",
    tint: "bg-cyan-50 text-cyan-700"
  }
];

const themes = [
  { name: "Blue", primary: "#2563eb", secondary: "#06b6d4", soft: "#eff6ff", text: "#1d4ed8" },
  { name: "Purple", primary: "#7c3aed", secondary: "#d946ef", soft: "#f5f3ff", text: "#6d28d9" },
  { name: "Green", primary: "#16a34a", secondary: "#14b8a6", soft: "#f0fdf4", text: "#15803d" },
  { name: "Red", primary: "#dc2626", secondary: "#f97316", soft: "#fef2f2", text: "#b91c1c" },
  { name: "Orange", primary: "#ea580c", secondary: "#f59e0b", soft: "#fff7ed", text: "#c2410c" },
  { name: "Pink", primary: "#db2777", secondary: "#f43f5e", soft: "#fdf2f8", text: "#be185d" },
  { name: "Teal", primary: "#0d9488", secondary: "#06b6d4", soft: "#f0fdfa", text: "#0f766e" },
  { name: "Black", primary: "#111827", secondary: "#475569", soft: "#f8fafc", text: "#111827" }
];

const initialForm = {
  studentId: "",
  fullName: "",
  email: "",
  mobile: "",
  gender: "",
  dob: "",
  course: "",
  semester: "",
  rollNumber: "",
  registrationNumber: "",
  attendance: "",
  cgpa: "",
  status: "Active"
};

const dummyStudents = [
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
];

const moduleConfig = {
  courses: {
    collection: "courses",
    title: "Courses",
    description: "Add and manage course details.",
    searchPlaceholder: "Search course",
    initialForm: {
      courseCode: "",
      courseName: "",
      faculty: "",
      semester: "",
      duration: "",
      credits: "",
      status: "Active",
      description: ""
    },
    fields: [
      { name: "courseCode", label: "Course Code", placeholder: "BCA101" },
      { name: "courseName", label: "Course Name", placeholder: "Web Development" },
      { name: "faculty", label: "Faculty", placeholder: "Faculty name" },
      { name: "semester", label: "Semester", type: "number", placeholder: "4" },
      { name: "duration", label: "Duration", placeholder: "6 months" },
      { name: "credits", label: "Credits", type: "number", placeholder: "4" },
      { name: "status", label: "Status", type: "select", options: ["Active", "Inactive"] },
      { name: "description", label: "Description", placeholder: "Course details" }
    ],
    records: [
      { courseCode: "BCA101", courseName: "Web Development", faculty: "Dr. Neha Sharma", semester: "4", duration: "6 months", credits: "4", status: "Active", description: "React and modern frontend basics" },
      { courseCode: "BCA204", courseName: "Database Management", faculty: "Prof. Amit Kumar", semester: "3", duration: "6 months", credits: "5", status: "Active", description: "SQL, ER models, normalization" },
      { courseCode: "MCA110", courseName: "Data Structures", faculty: "Dr. R. Singh", semester: "1", duration: "6 months", credits: "4", status: "Active", description: "Core DSA concepts" }
    ],
    columns: [
      { key: "courseCode", label: "Code" },
      { key: "courseName", label: "Course" },
      { key: "faculty", label: "Faculty" },
      { key: "semester", label: "Semester", prefix: "Semester " },
      { key: "credits", label: "Credits" },
      { key: "status", label: "Status" }
    ],
    idKey: "courseCode"
  },
  assignments: {
    collection: "assignments",
    title: "Assignments",
    description: "Add and manage assignment details.",
    searchPlaceholder: "Search assignment",
    initialForm: {
      assignmentId: "",
      title: "",
      course: "",
      dueDate: "",
      totalMarks: "",
      status: "Pending",
      description: ""
    },
    fields: [
      { name: "assignmentId", label: "Assignment ID", placeholder: "ASG001" },
      { name: "title", label: "Assignment Title", placeholder: "React Components" },
      { name: "course", label: "Course", placeholder: "Web Development" },
      { name: "dueDate", label: "Due Date", type: "date" },
      { name: "totalMarks", label: "Total Marks", type: "number", placeholder: "50" },
      { name: "status", label: "Status", type: "select", options: ["Pending", "Submitted", "Checked"] },
      { name: "description", label: "Description", placeholder: "Assignment instructions" }
    ],
    records: [
      { assignmentId: "ASG001", title: "React Components", course: "Web Development", dueDate: "2026-05-22", totalMarks: "50", status: "Pending", description: "Create reusable components" },
      { assignmentId: "ASG002", title: "SQL Joins", course: "Database Management", dueDate: "2026-05-25", totalMarks: "40", status: "Submitted", description: "Practice inner and outer joins" },
      { assignmentId: "ASG003", title: "Stack Program", course: "Data Structures", dueDate: "2026-05-28", totalMarks: "30", status: "Checked", description: "Implement stack operations" }
    ],
    columns: [
      { key: "assignmentId", label: "ID" },
      { key: "title", label: "Title" },
      { key: "course", label: "Course" },
      { key: "dueDate", label: "Due Date" },
      { key: "totalMarks", label: "Marks" },
      { key: "status", label: "Status" }
    ],
    idKey: "assignmentId"
  },
  attendance: {
    collection: "attendance",
    title: "Attendance",
    description: "Add and manage student attendance records.",
    searchPlaceholder: "Search student or ID",
    initialForm: {
      attendanceId: "",
      studentId: "",
      studentName: "",
      course: "",
      semester: "",
      totalClasses: "",
      presentClasses: "",
      attendancePercent: "",
      status: "Regular"
    },
    fields: [
      { name: "attendanceId", label: "Attendance ID", placeholder: "ATT001" },
      { name: "studentId", label: "Student ID", placeholder: "CIMG001" },
      { name: "studentName", label: "Student Name", placeholder: "Student name" },
      { name: "course", label: "Course", placeholder: "BCA" },
      { name: "semester", label: "Semester", type: "number", placeholder: "4" },
      { name: "totalClasses", label: "Total Classes", type: "number", placeholder: "60" },
      { name: "presentClasses", label: "Present Classes", type: "number", placeholder: "54" },
      { name: "attendancePercent", label: "Attendance %", type: "number", placeholder: "90" },
      { name: "status", label: "Status", type: "select", options: ["Regular", "Short Attendance"] }
    ],
    records: [
      { attendanceId: "ATT001", studentId: "CIMG001", studentName: "Pragya Bharti", course: "MCA", semester: "4", totalClasses: "60", presentClasses: "55", attendancePercent: "91", status: "Regular" },
      { attendanceId: "ATT002", studentId: "CIMG002", studentName: "Rahul Kumar", course: "BBA", semester: "2", totalClasses: "58", presentClasses: "49", attendancePercent: "84", status: "Regular" },
      { attendanceId: "ATT003", studentId: "CIMG003", studentName: "Anjali Verma", course: "BCA", semester: "6", totalClasses: "62", presentClasses: "47", attendancePercent: "76", status: "Short Attendance" }
    ],
    columns: [
      { key: "studentId", label: "Student ID" },
      { key: "studentName", label: "Name" },
      { key: "course", label: "Course" },
      { key: "semester", label: "Semester", prefix: "Semester " },
      { key: "presentClasses", label: "Present" },
      { key: "attendancePercent", label: "Attendance", suffix: "%" },
      { key: "status", label: "Status" }
    ],
    idKey: "attendanceId"
  }
};

const pageTitles = {
  dashboard: {
    title: "Student Dashboard",
    subtitle: "Welcome back to CIMAGE Student Portal"
  },
  students: {
    title: "Student Management",
    subtitle: "Administrator module for student records"
  },
  courses: {
    title: "Courses",
    subtitle: "Add and manage course records"
  },
  assignments: {
    title: "Assignments",
    subtitle: "Add and manage assignment records"
  },
  attendance: {
    title: "Attendance",
    subtitle: "Add and manage attendance records"
  }
};

const API_BASE = import.meta.env.DEV ? "http://localhost:3001" : "";

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE}/api/${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {})
    },
    ...options
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message ?? "Request failed");
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

function SidebarContent({ activePage, onPageChange }) {
  const linkClass = (page) =>
    `flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
      activePage === page
        ? "bg-[var(--theme-primary)] text-white shadow-lg shadow-blue-100"
        : "text-slate-600 hover:bg-[var(--theme-soft)] hover:text-[var(--theme-text)]"
    }`;

  return (
    <>
      <div className="flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--theme-primary)] text-white shadow-lg shadow-blue-200">
          <GraduationCap size={26} />
        </div>
        <div>
          <p className="text-lg font-bold text-slate-950">CIMAGE</p>
          <p className="text-sm font-medium text-slate-500">Student Portal</p>
        </div>
      </div>

      <nav className="mt-10 space-y-2">
        <button className={linkClass("dashboard")} onClick={() => onPageChange("dashboard")}>
          <LayoutDashboard size={19} />
          Dashboard
        </button>
        <button className="flex w-full items-center gap-3 rounded-xl bg-black px-4 py-3 text-left text-sm font-semibold text-white shadow-lg shadow-slate-200 transition hover:bg-slate-900" onClick={() => onPageChange("students")}>
          <UsersRound size={19} />
          Student Management
        </button>
        <button className={linkClass("courses")} onClick={() => onPageChange("courses")}>
          <BookOpen size={19} />
          Courses
        </button>
        <button className={linkClass("assignments")} onClick={() => onPageChange("assignments")}>
          <ClipboardList size={19} />
          Assignments
        </button>
        <button className={linkClass("attendance")} onClick={() => onPageChange("attendance")}>
          <CalendarDays size={19} />
          Attendance
        </button>
      </nav>

      <div className="mt-auto rounded-2xl bg-gradient-to-br from-[var(--theme-primary)] to-[var(--theme-secondary)] p-5 text-white shadow-soft">
        <p className="text-sm font-medium text-blue-50">Current semester</p>
        <p className="mt-1 text-2xl font-bold">Semester 4</p>
      </div>
    </>
  );
}

function Sidebar({ activePage, onPageChange }) {
  return (
    <aside className="hidden min-h-screen w-72 flex-col border-r border-blue-100 bg-white px-5 py-6 shadow-sm lg:flex">
      <SidebarContent activePage={activePage} onPageChange={onPageChange} />
    </aside>
  );
}

function MobileSidebar({ activePage, isOpen, onClose, onPageChange, selectedTheme, onThemeChange }) {
  const handlePageChange = (page) => {
    onPageChange(page);
    onClose();
  };

  return (
    <div className={`fixed inset-0 z-30 lg:hidden ${isOpen ? "block" : "hidden"}`}>
      <button className="absolute inset-0 bg-slate-950/40" aria-label="Close menu" onClick={onClose} />
      <aside className="relative flex h-full w-80 max-w-[86vw] flex-col bg-white px-5 py-6 shadow-2xl">
        <button className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-xl border border-blue-100 text-blue-700" aria-label="Close menu" onClick={onClose}>
          <X size={20} />
        </button>
        <div className="mt-14">
          <ThemeSelector selectedTheme={selectedTheme} onThemeChange={onThemeChange} className="flex w-full" />
        </div>
        <SidebarContent activePage={activePage} onPageChange={handlePageChange} />
      </aside>
    </div>
  );
}

function ThemeSelector({ selectedTheme, onThemeChange, className = "hidden md:flex" }) {
  return (
    <label className={`${className} h-11 items-center gap-2 rounded-xl border border-blue-100 bg-white px-3 text-sm font-bold text-slate-700`}>
      <Palette size={18} className="text-[var(--theme-text)]" />
      <select
        className="bg-transparent text-sm font-bold text-slate-700 outline-none"
        value={selectedTheme}
        onChange={(event) => onThemeChange(event.target.value)}
      >
        {themes.map((theme) => (
          <option key={theme.name} value={theme.name}>
            {theme.name}
          </option>
        ))}
      </select>
    </label>
  );
}

function TopNavbar({ activePage, onMenuOpen, selectedTheme, onThemeChange, globalSearch, onGlobalSearchChange }) {
  const page = pageTitles[activePage] ?? pageTitles.dashboard;
  const searchPlaceholder = activePage === "dashboard" ? "Search courses" : `Search ${page.title.toLowerCase()}`;

  return (
    <header className="sticky top-0 z-10 border-b border-blue-100 bg-white/90 px-4 py-4 backdrop-blur md:px-7">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <button className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-blue-100 text-[var(--theme-text)] lg:hidden" aria-label="Open menu" onClick={onMenuOpen}>
            <Menu size={22} />
          </button>
          <div className="min-w-0">
            <h1 className="truncate text-xl font-bold text-slate-950 md:text-2xl">
              {page.title}
            </h1>
            <p className="hidden text-sm font-medium text-slate-500 sm:block">
              {page.subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeSelector selectedTheme={selectedTheme} onThemeChange={onThemeChange} />
          <div className="hidden h-11 w-64 items-center gap-2 rounded-xl border border-blue-100 bg-blue-50/60 px-3 text-slate-500 md:flex">
            <Search size={18} />
            <input
              className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400"
              placeholder={searchPlaceholder}
              value={globalSearch}
              onChange={(event) => onGlobalSearchChange(event.target.value)}
            />
          </div>
          <button className="grid h-11 w-11 place-items-center rounded-xl border border-blue-100 text-[var(--theme-text)]" aria-label="Notifications">
            <Bell size={20} />
          </button>
          <div className="flex items-center gap-3 rounded-xl bg-blue-50 px-2 py-2 sm:pr-4">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-white text-[var(--theme-text)] shadow-sm">
              <UserRound size={20} />
            </div>
            <div className="hidden leading-tight sm:block">
              <p className="text-sm font-bold text-slate-900">Pragya Bharti</p>
              <p className="text-xs font-medium text-slate-500">MCA Student</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function inputClass() {
  return "h-11 w-full rounded-xl border border-blue-100 bg-[var(--theme-soft)] px-3 text-sm font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[var(--theme-primary)] focus:bg-white focus:ring-4 focus:ring-blue-100";
}

function StudentManagement({ externalSearch = "" }) {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    apiRequest("students")
      .then((data) => {
        if (isMounted) {
          setStudents(data);
        }
      })
      .catch((error) => window.alert(error.message))
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const courses = useMemo(
    () => ["All", ...Array.from(new Set(students.map((student) => student.course)))],
    [students]
  );

  const activeSearch = (externalSearch || searchTerm).trim().toLowerCase();

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.fullName.toLowerCase().includes(activeSearch) ||
      student.studentId.toLowerCase().includes(activeSearch);
    const matchesCourse = courseFilter === "All" || student.course === courseFilter;

    return matchesSearch && matchesCourse;
  });

  const updateField = (name, value) => {
    setForm((current) => ({ ...current, [name]: value }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId("");
  };

  const addStudent = async () => {
    if (!form.studentId || !form.fullName || !form.course) {
      window.alert("Student ID, Full Name, and Course Name are required.");
      return;
    }

    try {
      const savedStudent = await apiRequest("students", {
        method: "POST",
        body: JSON.stringify(form)
      });
      setStudents((current) => [...current, savedStudent]);
      resetForm();
    } catch (error) {
      window.alert(error.message);
    }
  };

  const editStudent = (student) => {
    setForm(student);
    setEditingId(student.studentId);
  };

  const updateStudent = async () => {
    if (!editingId) {
      window.alert("Select a student with Edit before updating.");
      return;
    }

    try {
      const savedStudent = await apiRequest(`students/${encodeURIComponent(editingId)}`, {
        method: "PUT",
        body: JSON.stringify(form)
      });
      setStudents((current) =>
        current.map((student) => (student.studentId === editingId ? savedStudent : student))
      );
      resetForm();
    } catch (error) {
      window.alert(error.message);
    }
  };

  const deleteStudent = async (studentId) => {
    try {
      await apiRequest(`students/${encodeURIComponent(studentId)}`, {
        method: "DELETE"
      });
      setStudents((current) => current.filter((student) => student.studentId !== studentId));
      if (editingId === studentId) {
        resetForm();
      }
    } catch (error) {
      window.alert(error.message);
    }
  };

  const textInput = (name, type = "text", placeholder = "") => (
    <input
      className={inputClass()}
      type={type}
      placeholder={placeholder}
      value={form[name]}
      onChange={(event) => updateField(name, event.target.value)}
    />
  );

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-blue-100 bg-white p-5 shadow-soft md:p-6">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-950">Add Student</h2>
            <p className="text-sm font-medium text-slate-500">Manage personal, academic, and performance details.</p>
          </div>
          <span className="w-fit rounded-xl bg-[var(--theme-soft)] px-4 py-2 text-sm font-bold text-[var(--theme-text)]">
            Administrator
          </span>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="mb-4 text-sm font-extrabold uppercase tracking-[0.12em] text-[var(--theme-text)]">
              Personal Details
            </h3>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <Field label="Student ID">{textInput("studentId", "text", "CIMG005")}</Field>
              <Field label="Full Name">{textInput("fullName", "text", "Student name")}</Field>
              <Field label="Email">{textInput("email", "email", "student@cimage.in")}</Field>
              <Field label="Mobile Number">{textInput("mobile", "tel", "10 digit number")}</Field>
              <Field label="Gender">
                <select className={inputClass()} value={form.gender} onChange={(event) => updateField("gender", event.target.value)}>
                  <option value="">Select gender</option>
                  <option>Female</option>
                  <option>Male</option>
                  <option>Other</option>
                </select>
              </Field>
              <Field label="Date of Birth">{textInput("dob", "date")}</Field>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-extrabold uppercase tracking-[0.12em] text-[var(--theme-text)]">
              Academic Details
            </h3>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <Field label="Course Name">{textInput("course", "text", "BCA")}</Field>
              <Field label="Semester">{textInput("semester", "number", "4")}</Field>
              <Field label="Roll Number">{textInput("rollNumber", "text", "BCA042")}</Field>
              <Field label="Registration Number">{textInput("registrationNumber", "text", "REG2026042")}</Field>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-extrabold uppercase tracking-[0.12em] text-[var(--theme-text)]">
              Performance
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              <Field label="Attendance %">{textInput("attendance", "number", "91")}</Field>
              <Field label="CGPA">{textInput("cgpa", "number", "8.7")}</Field>
              <Field label="Status">
                <select className={inputClass()} value={form.status} onChange={(event) => updateField("status", event.target.value)}>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </Field>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button className="inline-flex h-11 items-center gap-2 rounded-xl bg-[var(--theme-primary)] px-5 text-sm font-bold text-white shadow-lg shadow-blue-100 transition hover:opacity-90" onClick={addStudent}>
            <Plus size={18} />
            Add Student
          </button>
          <button className="inline-flex h-11 items-center gap-2 rounded-xl border border-blue-100 bg-white px-5 text-sm font-bold text-[var(--theme-text)] transition hover:bg-[var(--theme-soft)]" onClick={updateStudent}>
            <Edit3 size={18} />
            Update
          </button>
          <button className="inline-flex h-11 items-center gap-2 rounded-xl border border-blue-100 bg-[var(--theme-soft)] px-5 text-sm font-bold text-[var(--theme-text)] transition hover:opacity-90" onClick={resetForm}>
            <RefreshCcw size={18} />
            Reset
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-blue-100 bg-white p-5 shadow-soft md:p-6">
        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-950">Student Data Table</h2>
            <p className="text-sm font-medium text-slate-500">Search, filter, edit, and delete student records.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-[minmax(0,260px)_180px]">
            <div className="flex h-11 items-center gap-2 rounded-xl border border-blue-100 bg-blue-50/60 px-3 text-slate-500">
              <Search size={18} />
              <input
                className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400"
                placeholder="Search by name or ID"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
            <select className={inputClass()} value={courseFilter} onChange={(event) => setCourseFilter(event.target.value)}>
              {courses.map((course) => (
                <option key={course}>{course}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-blue-100">
          <div className="overflow-x-auto">
            <table className="min-w-[860px] w-full border-collapse bg-white text-left text-sm">
              <thead className="bg-[var(--theme-soft)] text-xs font-extrabold uppercase tracking-[0.08em] text-[var(--theme-text)]">
                <tr>
                  <th className="px-4 py-4">Student ID</th>
                  <th className="px-4 py-4">Name</th>
                  <th className="px-4 py-4">Course</th>
                  <th className="px-4 py-4">Semester</th>
                  <th className="px-4 py-4">Attendance</th>
                  <th className="px-4 py-4">CGPA</th>
                  <th className="px-4 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-50">
                {!isLoading && filteredStudents.map((student) => (
                  <tr key={student.studentId} className="hover:bg-slate-50">
                    <td className="px-4 py-4 font-bold text-slate-900">{student.studentId}</td>
                    <td className="px-4 py-4 font-semibold text-slate-700">{student.fullName}</td>
                    <td className="px-4 py-4 text-slate-600">{student.course}</td>
                    <td className="px-4 py-4 text-slate-600">Semester {student.semester}</td>
                    <td className="px-4 py-4">
                      <span className="rounded-full bg-[var(--theme-soft)] px-3 py-1 text-xs font-bold text-[var(--theme-text)]">
                        {student.attendance}%
                      </span>
                    </td>
                    <td className="px-4 py-4 font-bold text-slate-800">{student.cgpa}</td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <button className="grid h-9 w-9 place-items-center rounded-lg border border-blue-100 text-[var(--theme-text)] transition hover:bg-[var(--theme-soft)]" aria-label={`Edit ${student.fullName}`} onClick={() => editStudent(student)}>
                          <Edit3 size={16} />
                        </button>
                        <button className="grid h-9 w-9 place-items-center rounded-lg border border-rose-100 text-rose-600 transition hover:bg-rose-50" aria-label={`Delete ${student.fullName}`} onClick={() => deleteStudent(student.studentId)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isLoading && (
            <div className="bg-white px-4 py-8 text-center text-sm font-semibold text-slate-500">
              Loading student records...
            </div>
          )}
          {!isLoading && filteredStudents.length === 0 && (
            <div className="bg-white px-4 py-8 text-center text-sm font-semibold text-slate-500">
              No student records found.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function EditableModule({ config, externalSearch = "" }) {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState(config.initialForm);
  const [editingId, setEditingId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);
    apiRequest(config.collection)
      .then((data) => {
        if (isMounted) {
          setRecords(data);
        }
      })
      .catch((error) => window.alert(error.message))
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [config.collection]);

  const activeSearch = (externalSearch || searchTerm).trim().toLowerCase();

  const filteredRecords = records.filter((record) =>
    Object.values(record).some((value) =>
      String(value).toLowerCase().includes(activeSearch)
    )
  );

  const updateField = (name, value) => {
    setForm((current) => ({ ...current, [name]: value }));
  };

  const resetForm = () => {
    setForm(config.initialForm);
    setEditingId("");
  };

  const addRecord = async () => {
    if (!form[config.idKey]) {
      window.alert(`${config.columns[0].label} is required.`);
      return;
    }

    try {
      const savedRecord = await apiRequest(config.collection, {
        method: "POST",
        body: JSON.stringify(form)
      });
      setRecords((current) => [...current, savedRecord]);
      resetForm();
    } catch (error) {
      window.alert(error.message);
    }
  };

  const editRecord = (record) => {
    setForm(record);
    setEditingId(record[config.idKey]);
  };

  const updateRecord = async () => {
    if (!editingId) {
      window.alert("Select a record with Edit before updating.");
      return;
    }

    try {
      const savedRecord = await apiRequest(
        `${config.collection}/${encodeURIComponent(editingId)}`,
        {
          method: "PUT",
          body: JSON.stringify(form)
        }
      );
      setRecords((current) =>
        current.map((record) => (record[config.idKey] === editingId ? savedRecord : record))
      );
      resetForm();
    } catch (error) {
      window.alert(error.message);
    }
  };

  const deleteRecord = async (id) => {
    try {
      await apiRequest(`${config.collection}/${encodeURIComponent(id)}`, {
        method: "DELETE"
      });
      setRecords((current) => current.filter((record) => record[config.idKey] !== id));
      if (editingId === id) {
        resetForm();
      }
    } catch (error) {
      window.alert(error.message);
    }
  };

  const renderField = (field) => {
    if (field.type === "select") {
      return (
        <select
          className={inputClass()}
          value={form[field.name]}
          onChange={(event) => updateField(field.name, event.target.value)}
        >
          {field.options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      );
    }

    return (
      <input
        className={inputClass()}
        type={field.type ?? "text"}
        placeholder={field.placeholder ?? ""}
        value={form[field.name]}
        onChange={(event) => updateField(field.name, event.target.value)}
      />
    );
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-blue-100 bg-white p-5 shadow-soft md:p-6">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-950">Add {config.title}</h2>
            <p className="text-sm font-medium text-slate-500">{config.description}</p>
          </div>
          <span className="w-fit rounded-xl bg-[var(--theme-soft)] px-4 py-2 text-sm font-bold text-[var(--theme-text)]">
            Editable Module
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {config.fields.map((field) => (
            <Field key={field.name} label={field.label}>
              {renderField(field)}
            </Field>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button className="inline-flex h-11 items-center gap-2 rounded-xl bg-[var(--theme-primary)] px-5 text-sm font-bold text-white shadow-lg shadow-blue-100 transition hover:opacity-90" onClick={addRecord}>
            <Plus size={18} />
            Add
          </button>
          <button className="inline-flex h-11 items-center gap-2 rounded-xl border border-blue-100 bg-white px-5 text-sm font-bold text-[var(--theme-text)] transition hover:bg-[var(--theme-soft)]" onClick={updateRecord}>
            <Edit3 size={18} />
            Update
          </button>
          <button className="inline-flex h-11 items-center gap-2 rounded-xl border border-blue-100 bg-[var(--theme-soft)] px-5 text-sm font-bold text-[var(--theme-text)] transition hover:opacity-90" onClick={resetForm}>
            <RefreshCcw size={18} />
            Reset
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-blue-100 bg-white p-5 shadow-soft md:p-6">
        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-950">{config.title} Records</h2>
            <p className="text-sm font-medium text-slate-500">Search, edit, update, and delete records.</p>
          </div>
          <div className="flex h-11 items-center gap-2 rounded-xl border border-blue-100 bg-blue-50/60 px-3 text-slate-500">
            <Search size={18} />
            <input
              className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400"
              placeholder={config.searchPlaceholder}
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-blue-100">
          <div className="overflow-x-auto">
            <table className="min-w-[860px] w-full border-collapse bg-white text-left text-sm">
              <thead className="bg-[var(--theme-soft)] text-xs font-extrabold uppercase tracking-[0.08em] text-[var(--theme-text)]">
                <tr>
                  {config.columns.map((column) => (
                    <th key={column.key} className="px-4 py-4">{column.label}</th>
                  ))}
                  <th className="px-4 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-50">
                {!isLoading && filteredRecords.map((record) => (
                  <tr key={record[config.idKey]} className="hover:bg-slate-50">
                    {config.columns.map((column) => (
                      <td key={column.key} className="px-4 py-4 font-semibold text-slate-700">
                        {column.prefix ?? ""}{record[column.key]}{column.suffix ?? ""}
                      </td>
                    ))}
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <button className="grid h-9 w-9 place-items-center rounded-lg border border-blue-100 text-[var(--theme-text)] transition hover:bg-[var(--theme-soft)]" aria-label="Edit record" onClick={() => editRecord(record)}>
                          <Edit3 size={16} />
                        </button>
                        <button className="grid h-9 w-9 place-items-center rounded-lg border border-rose-100 text-rose-600 transition hover:bg-rose-50" aria-label="Delete record" onClick={() => deleteRecord(record[config.idKey])}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isLoading && (
            <div className="bg-white px-4 py-8 text-center text-sm font-semibold text-slate-500">
              Loading records...
            </div>
          )}
          {!isLoading && filteredRecords.length === 0 && (
            <div className="bg-white px-4 py-8 text-center text-sm font-semibold text-slate-500">
              No records found.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function EnrolledCourses({ searchTerm = "", onEditCourse }) {
  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  return (
    <section className="rounded-2xl border border-blue-100 bg-white p-5 shadow-soft md:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-950">Enrolled Courses</h2>
          <p className="text-sm font-medium text-slate-500">Continue learning from where you left off.</p>
        </div>
      </div>

      <div className="space-y-4">
        {filteredCourses.map((course) => (
          <article key={course.name} className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-bold text-slate-900">{course.name}</h3>
                <div className="mt-3 flex items-center gap-3">
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-blue-100">
                    <div className="h-full rounded-full bg-[var(--theme-primary)]" style={{ width: `${course.progress}%` }} />
                  </div>
                  <span className="w-11 text-right text-sm font-bold text-[var(--theme-text)]">{course.progress}%</span>
                </div>
              </div>
              <button className="h-11 rounded-xl bg-[var(--theme-primary)] px-5 text-sm font-bold text-white shadow-lg shadow-blue-100 transition hover:opacity-90" onClick={onEditCourse}>
                Edit Course
              </button>
            </div>
          </article>
        ))}
        {filteredCourses.length === 0 && (
          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-6 text-center text-sm font-semibold text-slate-500">
            No courses found.
          </div>
        )}
      </div>
    </section>
  );
}

function StudentProgress() {
  return (
    <section className="rounded-2xl border border-blue-100 bg-white p-5 shadow-soft md:p-6">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-slate-950">Student Progress</h2>
        <p className="text-sm font-medium text-slate-500">Academic snapshot for this semester.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {progress.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.label} className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
              <div className={`grid h-11 w-11 place-items-center rounded-xl ${item.tint}`}>
                <Icon size={22} />
              </div>
              <p className="mt-5 text-3xl font-extrabold text-slate-950">{item.value}</p>
              <p className="mt-1 text-sm font-semibold text-slate-500">{item.label}</p>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-200">
                <div className={`h-full rounded-full ${item.color}`} style={{ width: item.value.includes("%") ? item.value : "70%" }} />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");
  const [selectedTheme, setSelectedTheme] = useState(
    () => localStorage.getItem("cimage-theme") ?? "Blue"
  );
  const currentTheme = themes.find((theme) => theme.name === selectedTheme) ?? themes[0];
  const themeStyle = {
    "--theme-primary": currentTheme.primary,
    "--theme-secondary": currentTheme.secondary,
    "--theme-soft": currentTheme.soft,
    "--theme-text": currentTheme.text
  };

  useEffect(() => {
    localStorage.setItem("cimage-theme", selectedTheme);
  }, [selectedTheme]);

  const changePage = (page) => {
    setActivePage(page);
    setGlobalSearch("");
  };

  const renderPage = () => {
    if (activePage === "dashboard") {
      return (
        <>
          <div className="rounded-2xl bg-gradient-to-r from-[var(--theme-primary)] via-[var(--theme-primary)] to-[var(--theme-secondary)] p-5 text-white shadow-soft md:p-7">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-100">CIMAGE Student Portal</p>
                <h2 className="mt-2 max-w-2xl text-2xl font-extrabold leading-tight md:text-4xl">
                  Keep your courses, assignments, and attendance in view.
                </h2>
              </div>
              <div className="rounded-2xl bg-white/15 px-5 py-4 backdrop-blur">
                <p className="text-sm font-semibold text-blue-100">Profile</p>
                <p className="mt-1 text-xl font-bold">Pragya Bharti</p>
                <p className="text-sm font-medium text-blue-50">Roll No. 711-2256</p>
              </div>
            </div>
          </div>

          <EnrolledCourses searchTerm={globalSearch} onEditCourse={() => changePage("courses")} />
          <StudentProgress />
        </>
      );
    }

    if (activePage === "students") {
      return <StudentManagement externalSearch={globalSearch} />;
    }

    return <EditableModule config={moduleConfig[activePage]} externalSearch={globalSearch} />;
  };

  return (
    <div className="min-h-screen bg-[#f5f9ff]" style={themeStyle}>
      <div className="flex">
        <Sidebar activePage={activePage} onPageChange={changePage} />
        <MobileSidebar
          activePage={activePage}
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          onPageChange={changePage}
          selectedTheme={selectedTheme}
          onThemeChange={setSelectedTheme}
        />
        <main className="min-w-0 flex-1">
          <TopNavbar
            activePage={activePage}
            onMenuOpen={() => setIsMobileMenuOpen(true)}
            selectedTheme={selectedTheme}
            onThemeChange={setSelectedTheme}
            globalSearch={globalSearch}
            onGlobalSearchChange={setGlobalSearch}
          />
          <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 md:px-7 md:py-8">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
}
