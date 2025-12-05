CalenGraphX is a React-based calendar app that shows data for each date. It highlights dates that have information, opens a popup with details when clicked, and displays the data using bar charts. The design is clean, easy to use, and simple to customize.

>> Features:

> Interactive calendar (Month / Week / Day views)

> Highlighted dates that contain data

> Popup modal with bar-chart visualization

> No-data alert message for empty dates

> Modern UI with gradients, shadows, and animations

> Dummy JSON data for easy testing and customization

>> Tech Stack:

> React + TypeScript

> React Big Calendar

> Recharts

> date-fns
> Vite

>> CSS3:

> How to Run the Frontend?

> Run the following steps in the terminal:

1. Navigate to the project directory
> cd calender-bargraph-react

2. Install all required dependencies
> npm install

This downloads and sets up all frontend packages used in the project.

3. Start the development server
> npm run dev


After running this command, Vite will show a local development URL, such as:

Local: http://localhost:5000/


Open that URL in any browser to view the application.
----------------------------------------------------------------------------------------------------

A calendar view displaying dates and corresponding bar-graph values, enhanced with a custom-designed logo and a clean, polished UI.

>> Important Files

Purpose	File:

> Calendar UI	src/components/CalendarView.tsx
> Popup Modal	src/components/DateDetailModel.tsx
> Sample Data	src/data/dummy_data.json
> Styles	    src/styles.css
> App Root	    src/App.tsx
