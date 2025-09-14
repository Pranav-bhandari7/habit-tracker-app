# 🎯 Habit Tracker

A beautiful, modern habit tracking web application built with vanilla HTML, CSS, and JavaScript. Track your daily habits, build streaks, and visualize your progress with an intuitive and responsive interface.

## ✨ Features

- **🎨 Modern UI/UX**: Clean, responsive design with dark/light theme support
- **📊 Progress Tracking**: Visual progress bars and streak counters
- **📈 Statistics Dashboard**: Weekly progress charts and success metrics
- **🏷️ Category Organization**: Organize habits by categories (Health, Learning, Productivity, etc.)
- **🎨 Custom Colors**: Personalize each habit with custom colors
- **💾 Local Storage**: All data persists locally in your browser
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **⌨️ Keyboard Shortcuts**: Quick navigation with keyboard support
- **🔔 Notifications**: Success feedback and progress updates

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required!

### Installation

1. **Clone or download** this repository to your local machine
2. **Navigate** to the habit-tracker directory
3. **Open** `index.html` in your web browser

That's it! The app is ready to use.

### Alternative: Local Server (Recommended)

For the best experience, serve the files through a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have it installed)
npx serve .

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## 📖 How to Use

### Adding Habits
1. Enter a habit name in the "Add New Habit" section
2. Select a category (Health & Fitness, Learning, Productivity, etc.)
3. Choose a custom color for your habit
4. Click "Add Habit"

### Tracking Progress
- Click "Mark Complete" to check off a habit for today
- View your streak count and total completions
- Progress bars show your completion rate

### Viewing Statistics
- Click the chart icon in the header to open the statistics modal
- View your total streak, daily completions, and success rate
- Check the weekly progress chart to see your consistency

### Managing Habits
- Use the filter dropdown to view habits by category
- Delete habits you no longer want to track
- Toggle between light and dark themes

## 🎨 Customization

### Adding New Categories
Edit the `habitCategory` select options in `index.html`:

```html
<option value="your-category">Your Category</option>
```

### Modifying Colors
Update the CSS variables in `styles.css` to change the app's color scheme:

```css
:root {
    --primary-color: #your-color;
    --success-color: #your-color;
    /* ... other variables */
}
```

### Adding Features
The app is built with vanilla JavaScript, making it easy to extend:
- Add new habit properties in the `addHabit()` method
- Create new statistics in the `updateStats()` method
- Implement data export/import functionality

## 🏗️ Project Structure

```
habit-tracker/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and animations
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Semantic markup and accessibility
- **CSS3**: Modern styling with CSS Grid, Flexbox, and animations
- **Vanilla JavaScript**: ES6+ features, classes, and modern APIs
- **Font Awesome**: Icons for better UX
- **Google Fonts**: Inter font family for typography

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Data Storage
- Uses `localStorage` for data persistence
- No external dependencies or databases required
- Data remains private and local to your browser

## 🎯 Features in Detail

### Habit Management
- **CRUD Operations**: Create, read, update, and delete habits
- **Daily Tracking**: Mark habits as complete for each day
- **Streak Calculation**: Automatic streak counting with visual indicators
- **Category Filtering**: Filter habits by category for better organization

### Progress Visualization
- **Progress Bars**: Visual representation of completion rates
- **Streak Counters**: Fire icons showing current streaks
- **Weekly Charts**: Bar chart showing daily progress over the week
- **Statistics Dashboard**: Comprehensive metrics and insights

### User Experience
- **Responsive Design**: Optimized for all screen sizes
- **Theme Support**: Light and dark mode with system preference detection
- **Smooth Animations**: CSS transitions and keyframe animations
- **Accessibility**: Keyboard navigation and screen reader support

## 🚀 Future Enhancements

Potential features for future versions:
- **Data Export/Import**: Backup and restore habit data
- **Habit Templates**: Pre-defined habit suggestions
- **Reminder Notifications**: Browser notifications for habit reminders
- **Social Features**: Share progress with friends
- **Advanced Analytics**: Monthly/yearly progress reports
- **Habit Challenges**: Gamification elements and achievements

## 🤝 Contributing

This is a simple, educational project perfect for learning web development. Feel free to:
- Fork the repository
- Add new features
- Improve the design
- Fix bugs
- Submit pull requests

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Icons by [Font Awesome](https://fontawesome.com/)
- Fonts by [Google Fonts](https://fonts.google.com/)
- Inspiration from popular habit tracking apps

---

**Happy habit building! 🎯✨**
