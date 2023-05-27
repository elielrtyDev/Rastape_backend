interface ISendNotificationDTO {
  tokens: string[];
  title: string;
  body: string;
  imageUrl?: string;
  incrementNotifications?: string;
  incrementProfileNotifications?: string;
}

export default ISendNotificationDTO;
