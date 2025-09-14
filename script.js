// Habit Tracker App JavaScript
class HabitTracker {
    constructor() {
        this.habits = this.loadHabits();
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.applyTheme();
        this.renderHabits();
        this.updateStats();
        this.setupDateTracking();
    }

    setupEventListeners() {
        // Add habit form
        document.getElementById('addHabitForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addHabit();
        });

        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Stats modal
        document.getElementById('statsToggle').addEventListener('click', () => {
            this.showStats();
        });

        document.getElementById('closeStats').addEventListener('click', () => {
            this.hideStats();
        });

        // Category filter
        document.getElementById('categoryFilter').addEventListener('change', (e) => {
            this.filterHabits(e.target.value);
        });

        // Close modal on outside click
        document.getElementById('statsModal').addEventListener('click', (e) => {
            if (e.target.id === 'statsModal') {
                this.hideStats();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideStats();
            }
        });
    }

    setupDateTracking() {
        // Check if we need to reset daily completions
        const lastReset = localStorage.getItem('lastReset');
        const today = new Date().toDateString();
        
        if (lastReset !== today) {
            this.resetDailyCompletions();
            localStorage.setItem('lastReset', today);
        }
    }

    resetDailyCompletions() {
        this.habits.forEach(habit => {
            habit.completedToday = false;
        });
        this.saveHabits();
        this.renderHabits();
    }

    addHabit() {
        const name = document.getElementById('habitName').value.trim();
        const category = document.getElementById('habitCategory').value;
        const color = document.getElementById('habitColor').value;

        if (!name) return;

        const habit = {
            id: Date.now().toString(),
            name,
            category,
            color,
            streak: 0,
            totalCompletions: 0,
            completedToday: false,
            createdAt: new Date().toISOString(),
            completionHistory: []
        };

        this.habits.push(habit);
        this.saveHabits();
        this.renderHabits();
        this.updateStats();

        // Reset form
        document.getElementById('addHabitForm').reset();
        document.getElementById('habitColor').value = '#6366f1';

        // Show success animation
        this.showNotification('Habit added successfully!', 'success');
    }

    deleteHabit(id) {
        if (confirm('Are you sure you want to delete this habit?')) {
            this.habits = this.habits.filter(habit => habit.id !== id);
            this.saveHabits();
            this.renderHabits();
            this.updateStats();
            this.showNotification('Habit deleted', 'info');
        }
    }

    toggleHabitCompletion(id) {
        const habit = this.habits.find(h => h.id === id);
        if (!habit) return;

        const wasCompleted = habit.completedToday;
        habit.completedToday = !habit.completedToday;

        if (habit.completedToday && !wasCompleted) {
            // Mark as completed today
            habit.totalCompletions++;
            habit.streak++;
            
            // Add to completion history
            const today = new Date().toISOString().split('T')[0];
            if (!habit.completionHistory.includes(today)) {
                habit.completionHistory.push(today);
            }
        } else if (!habit.completedToday && wasCompleted) {
            // Unmark completion
            habit.totalCompletions = Math.max(0, habit.totalCompletions - 1);
            habit.streak = Math.max(0, habit.streak - 1);
            
            // Remove from completion history
            const today = new Date().toISOString().split('T')[0];
            habit.completionHistory = habit.completionHistory.filter(date => date !== today);
        }

        this.saveHabits();
        this.renderHabits();
        this.updateStats();

        // Show feedback
        if (habit.completedToday) {
            this.showNotification(`Great job! ${habit.name} streak: ${habit.streak} days`, 'success');
        }
    }

    renderHabits(filterCategory = 'all') {
        const habitsGrid = document.getElementById('habitsGrid');
        const filteredHabits = filterCategory === 'all' 
            ? this.habits 
            : this.habits.filter(habit => habit.category === filterCategory);

        if (filteredHabits.length === 0) {
            habitsGrid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-plus-circle"></i>
                    <h3>No habits yet</h3>
                    <p>Add your first habit to get started!</p>
                </div>
            `;
            return;
        }

        habitsGrid.innerHTML = filteredHabits.map(habit => `
            <div class="habit-card" style="--habit-color: ${habit.color}">
                <div class="habit-header">
                    <div class="habit-info">
                        <h3>${this.escapeHtml(habit.name)}</h3>
                        <div class="habit-category">${habit.category.replace('_', ' ')}</div>
                    </div>
                    <div class="habit-actions">
                        <button class="habit-btn delete" onclick="habitTracker.deleteHabit('${habit.id}')" title="Delete habit">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3,6 5,6 21,6"/>
                                <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"/>
                                <line x1="10" y1="11" x2="10" y2="17"/>
                                <line x1="14" y1="11" x2="14" y2="17"/>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <div class="habit-progress">
                    <div class="progress-header">
                        <span class="streak-count">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
                            </svg>
                            ${habit.streak} days
                        </span>
                        <span class="completion-count">${habit.totalCompletions} total</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${this.calculateProgressWidth(habit)}%"></div>
                    </div>
                </div>
                
                <div class="habit-actions-bottom">
                    <button class="check-btn ${habit.completedToday ? 'completed' : ''}" 
                            onclick="habitTracker.toggleHabitCompletion('${habit.id}')">
                        ${habit.completedToday ? 'Completed' : 'Mark Complete'}
                    </button>
                </div>
            </div>
        `).join('');
    }

    calculateProgressWidth(habit) {
        if (habit.totalCompletions === 0) return 0;
        
        // Calculate progress based on streak and total completions
        const daysSinceCreation = Math.ceil((new Date() - new Date(habit.createdAt)) / (1000 * 60 * 60 * 24));
        const maxPossible = Math.max(daysSinceCreation, habit.totalCompletions);
        return Math.min(100, (habit.totalCompletions / maxPossible) * 100);
    }

    filterHabits(category) {
        this.renderHabits(category);
    }

    updateStats() {
        const totalStreak = this.habits.reduce((sum, habit) => sum + habit.streak, 0);
        const completedToday = this.habits.filter(habit => habit.completedToday).length;
        const totalHabits = this.habits.length;
        const successRate = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;

        document.getElementById('totalStreak').textContent = totalStreak;
        document.getElementById('completedToday').textContent = completedToday;
        document.getElementById('totalHabits').textContent = totalHabits;
        document.getElementById('successRate').textContent = `${successRate}%`;

        this.renderWeeklyChart();
    }

    renderWeeklyChart() {
        const weekChart = document.getElementById('weekChart');
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const today = new Date();
        
        const weekData = days.map((day, index) => {
            const date = new Date(today);
            date.setDate(today.getDate() - (today.getDay() - index));
            const dateString = date.toISOString().split('T')[0];
            
            const completions = this.habits.filter(habit => 
                habit.completionHistory.includes(dateString)
            ).length;
            
            const maxCompletions = this.habits.length;
            const percentage = maxCompletions > 0 ? (completions / maxCompletions) * 100 : 0;
            
            return { day, completions, percentage, isToday: index === today.getDay() };
        });

        weekChart.innerHTML = weekData.map(({ day, completions, percentage, isToday }) => `
            <div class="day-bar">
                <div class="day-label">${day}</div>
                <div class="day-progress">
                    <div class="day-fill" style="height: ${percentage}%; background: ${isToday ? 'linear-gradient(180deg, var(--primary), var(--accent))' : 'linear-gradient(180deg, var(--primary), var(--primary-light))'}"></div>
                </div>
                <div class="day-count">${completions}</div>
            </div>
        `).join('');
    }

    showStats() {
        this.updateStats();
        document.getElementById('statsModal').classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    hideStats() {
        document.getElementById('statsModal').classList.remove('show');
        document.body.style.overflow = '';
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        localStorage.setItem('theme', this.currentTheme);
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        const themeIcon = document.querySelector('#themeToggle i');
        themeIcon.className = this.currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                ${type === 'success' ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/>' : 
                  type === 'error' ? '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>' : 
                  '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>'}
            </svg>
            <span>${message}</span>
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    saveHabits() {
        localStorage.setItem('habits', JSON.stringify(this.habits));
    }

    loadHabits() {
        const saved = localStorage.getItem('habits');
        return saved ? JSON.parse(saved) : [];
    }
}

// Initialize the app
const habitTracker = new HabitTracker();

// Add some demo habits if none exist
if (habitTracker.habits.length === 0) {
    const demoHabits = [
        {
            id: '1',
            name: 'Drink 8 glasses of water',
            category: 'health',
            color: '#6366f1',
            streak: 0,
            totalCompletions: 0,
            completedToday: false,
            createdAt: new Date().toISOString(),
            completionHistory: []
        },
        {
            id: '2',
            name: 'Read for 30 minutes',
            category: 'learning',
            color: '#10b981',
            streak: 0,
            totalCompletions: 0,
            completedToday: false,
            createdAt: new Date().toISOString(),
            completionHistory: []
        },
        {
            id: '3',
            name: 'Exercise for 20 minutes',
            category: 'health',
            color: '#f59e0b',
            streak: 0,
            totalCompletions: 0,
            completedToday: false,
            createdAt: new Date().toISOString(),
            completionHistory: []
        }
    ];
    
    habitTracker.habits = demoHabits;
    habitTracker.saveHabits();
    habitTracker.renderHabits();
}
