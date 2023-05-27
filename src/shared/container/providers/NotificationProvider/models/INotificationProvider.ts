import ISendNotificationDTO from '../dtos/ISendNotificationDTO';

interface INotificationProvider {
  sendNotification(data: ISendNotificationDTO): Promise<void>;
}

export default INotificationProvider;
