export interface Notification {
  id: number;
  actor_content_type: number;
  actor_object_id: string;
  verb: string;
  description: string;
  target_content_type: number;
  target_object_id: string;
  timestamp: string;
  unread: boolean;
}
