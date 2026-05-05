1. Student
Student Name
Roll Number
Email
Phone
Date of Birth
Address
2. Course
Course Name
Course Code
Credits
Duration
3. Enrollment (Junction Object)
Student (Lookup → Student)
Course (Lookup → Course)
Enrollment Date
Status
4. Marks
Student (Lookup)
Course (Lookup)
Marks Obtained
Grade (Formula)




📊 PART 1: CREATE REPORT (Marks Report)
🔹 STEP 1: Open Reports
Click App Launcher (9 dots)
Search → Reports
Click Reports
🔹 STEP 2: Create New Report
Click New Report
In search bar, type:
👉 Marks
Select:
👉 Marks (Report Type)
Click Start Report
🔹 STEP 3: Add Columns

👉 Click Add Column and include:

Student
Course
Marks Obtained
Grade

👉 Remove unwanted fields like:

Marks Record
🔹 STEP 4: Group Data (VERY IMPORTANT)
Click Add Group
Select:
👉 Grade

✔ This is needed for dashboard chart

🔹 STEP 5: Add Chart (Optional but recommended)
Click Add Chart
Choose:
Donut Chart OR Bar Chart
Configure:
Group by → Grade
Value → Record Count
🔹 STEP 6: Save Report
Click Save & Run
Enter name:
Marks Report

👉 Click Save

🎯 REPORT READY
📈 PART 2: CREATE DASHBOARD
🔹 STEP 1: Open Dashboards
Click App Launcher
Search → Dashboards
Click Dashboards
🔹 STEP 2: Create Dashboard
Click New Dashboard
Enter name:
Student Dashboard
Click Create
🔹 STEP 3: Add Component (IMPORTANT)
Click + Component
Select:
👉 Marks Report
Click Select
🔹 STEP 4: Choose Chart Type

👉 Select:

Donut Chart (Best)
OR
Bar Chart
🔹 STEP 5: Configure Chart

Set:

Display / Group By → Grade
Value → Record Count

👉 This shows:

A → number of students
B → number of students
C → number of students
🔹 STEP 6: Adjust Size (Optional)

You can drag corners to resize chart

🔹 STEP 7: Save Dashboard
Click Save
Click Done


Step 1: Create Student Object
Go to Setup → Object Manager → Create Object
Enter:
Label: Student
Record Name: Student Name
Add fields:
Roll Number (Auto Number)
Email (Email)
Phone (Phone)
Address (Text Area)
Date of Birth (Date)
🔹 Step 2: Create Course Object
Create object: Course
Add fields:
Course Code (Text)
Credits (Number)
Duration (Text)
🔹 Step 3: Create Enrollment Object
Create object: Enrollment
Add fields:
Student (Lookup → Student)
Course (Lookup → Course)
Enrollment Date (Date)
Status (Picklist: Active, Completed)
🔹 Step 4: Create Marks Object
Create object: Marks
Add fields:
Student (Lookup)
Course (Lookup)
Marks Obtained (Number)
🔹 Step 5: Create Grade Formula

Formula field:

IF(Marks_Obtained__c >= 80, "A",
IF(Marks_Obtained__c >= 60, "B", "C"))
📱 4. Create App (Navigation Setup)
Go to Setup → App Manager → New Lightning App
App Name: Student Management System
Add Navigation Items:
Students
Courses
Enrollments
Marks
Reports
Dashboards
🔁 5. System Workflow (Navigation Flow)
👤 Step 1: Add Student

→ Students → New → Enter details → Save

📘 Step 2: Add Course

→ Courses → New → Enter details → Save

🔗 Step 3: Enrollment

→ Enrollments → New
→ Select Student & Course → Save

📊 Step 4: Add Marks

→ Marks → New
→ Enter marks → Save

👉 Grade auto-calculated
