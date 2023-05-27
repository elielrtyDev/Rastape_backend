import admin from 'firebase-admin';

import ISendNotificationDTO from '../dtos/ISendNotificationDTO';
import INotificationProvider from '../models/INotificationProvider';

class FCMNotificationProvider implements INotificationProvider {
  public async sendNotification({
    tokens,
    title,
    body,
    incrementNotifications = 'no',
    incrementProfileNotifications = 'no',
  }: ISendNotificationDTO): Promise<void> {
    try {
      const response = await admin.messaging().sendMulticast({
        tokens,
        notification: {
          title,
          body,
        },
        data: {
          incrementNotifications,
          incrementProfileNotifications,
        },
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
}

export default FCMNotificationProvider;
