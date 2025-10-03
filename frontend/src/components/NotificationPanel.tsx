// frontend/src/components/NotificationPanel.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Notification {
  id: number;
  message: string;
}

const NotificationPanel: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get<Notification[]>('http://localhost:8000/api/notifications/');
        setNotifications(res.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 5000); // هر ۵ ثانیه
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', marginTop: '1rem' }}>
      <h3>Notifications</h3>
      {notifications.map((n) => (
        <div key={n.id}>{n.message}</div>
      ))}
    </div>
  );
};

export default NotificationPanel;
