export async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    return 'unsupported';
  }
  if (Notification.permission === 'granted') {
    return 'granted';
  }
  const permission = await Notification.requestPermission();
  return permission;
}

export function sendBrowserNotification(title, options = {}) {
  if (!('Notification' in window) || Notification.permission !== 'granted') {
    return null;
  }
  return new Notification(title, {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%232563eb" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    ...options,
  });
}

export function checkTaskReminders(tasks, notifiedTaskIds = new Set()) {
  const now = new Date().getTime();
  const oneHour = 60 * 60 * 1000;

  const reminders = [];

  tasks.forEach((task) => {
    if (task.status === 'done' || !task.dueDate) return;

    const dueTime = new Date(task.dueDate).getTime();
    const diff = dueTime - now;

    // Check if due within next 60 minutes or overdue within last 30 minutes
    if (diff > 0 && diff <= oneHour && !notifiedTaskIds.has(task._id)) {
      reminders.push({
        task,
        type: 'upcoming',
        message: `Task "${task.title}" is due in ${Math.round(diff / 60000)} minutes!`,
      });
      notifiedTaskIds.add(task._id);
    } else if (diff < 0 && diff >= -1800000 && !notifiedTaskIds.has(`overdue_${task._id}`)) {
      reminders.push({
        task,
        type: 'overdue',
        message: `Task "${task.title}" is now overdue!`,
      });
      notifiedTaskIds.add(`overdue_${task._id}`);
    }
  });

  return reminders;
}
