import { container } from 'tsyringe';

import FCMNotificationProvider from './implementations/FCMNotificationProvider';
import INotificationProvider from './models/INotificationProvider';

container.registerSingleton<INotificationProvider>(
  'NotificationProvider',
  FCMNotificationProvider,
);
