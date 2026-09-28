# Smart Campus Management "https://barathgd-coder.github.io/srm-ist-trichy-system-management-/"
One site, two modules, one look (Smart Floor Manager theme):
- **Floor Map**: 3D digital twin, room finder, navigation, squad (`floor.js`)
- **Attendance**: calculator, OD simulator, timetable, Attendance Advisor chat (`attendance.js`)

`scm.js` switches between modules. `style.css` holds the shared theme.

Run: open `index.html` or `npx serve .`. Deploy: Vercel (Framework "Other", no build) or Netlify drop.
Three.js and Google Fonts load from the internet. Room data and the class schedule are SAMPLE data; attendance timetables are in `SECTIONS` in `attendance.js`.
