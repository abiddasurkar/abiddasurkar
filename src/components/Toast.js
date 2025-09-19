import React from 'react';
import { useUI } from '../context/UIContext';

const Toast = () => {
  const { notifications, removeNotification } = useUI();

  if (!notifications.length) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => {
        let bgColor = 'bg-blue-500';
        if (notification.type === 'error') bgColor = 'bg-red-500';
        if (notification.type === 'success') bgColor = 'bg-green-500';
        if (notification.type === 'warning') bgColor = 'bg-yellow-500';

        return (
          <div
            key={notification.id}
            className={`${bgColor} text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-between min-w-[300px]`}
          >
            <div className="flex-1">
              {notification.title && (
                <p className="font-semibold">{notification.title}</p>
              )}
              <p className="text-sm">{notification.message}</p>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-4 text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Toast;