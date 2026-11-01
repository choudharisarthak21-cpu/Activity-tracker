import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { formatDate, formatTime } from './dateUtils';

export function exportToCSV(tasks) {
  if (!tasks || tasks.length === 0) {
    alert('No tasks to export.');
    return;
  }

  const headers = ['Title', 'Description', 'Status', 'Priority', 'Category', 'Due Date', 'Completed At', 'Created At'];

  const rows = tasks.map((task) => [
    `"${(task.title || '').replace(/"/g, '""')}"`,
    `"${(task.description || '').replace(/"/g, '""')}"`,
    task.status || '',
    task.priority || '',
    task.category || '',
    task.dueDate ? new Date(task.dueDate).toISOString() : '',
    task.completedAt ? new Date(task.completedAt).toISOString() : '',
    new Date(task.createdAt).toISOString(),
  ]);

  const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `activity_tracker_tasks_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportToPDF(tasks, stats) {
  if (!tasks || tasks.length === 0) {
    alert('No tasks to export.');
    return;
  }

  const doc = new jsPDF();

  // Branding Header
  doc.setFillColor(37, 99, 235); // brand-600
  doc.rect(0, 0, 210, 24, 'F');

  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text('Activity Tracker - Tasks Report', 14, 16);

  // Meta Info
  doc.setFontSize(9);
  doc.setTextColor(220, 230, 255);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 130, 16);

  // Summary box
  let startY = 32;
  if (stats) {
    doc.setFontSize(11);
    doc.setTextColor(51, 65, 85);
    doc.text(
      `Summary: Total: ${stats.total || tasks.length} | To Do: ${stats.todo || 0} | Done: ${stats.done || 0} | Planned: ${stats.planned || 0} | Completion: ${stats.completionRate || 0}%`,
      14,
      startY
    );
    startY += 8;
  }

  // Table columns
  const tableColumn = ['Title', 'Priority', 'Category', 'Status', 'Due Date', 'Completed'];
  const tableRows = tasks.map((task) => [
    task.title,
    task.priority,
    task.category || 'General',
    task.status.toUpperCase(),
    task.dueDate ? `${formatDate(task.dueDate)} ${formatTime(task.dueDate)}` : 'No date',
    task.completedAt ? formatDate(task.completedAt) : '-',
  ]);

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: startY,
    theme: 'striped',
    headStyles: {
      fillColor: [37, 99, 235],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9,
    },
    styles: {
      fontSize: 8.5,
      cellPadding: 3,
      textColor: [30, 41, 59],
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
  });

  doc.save(`activity_tracker_report_${new Date().toISOString().split('T')[0]}.pdf`);
}
