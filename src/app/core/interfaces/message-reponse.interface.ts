import { Message } from '../models/message.model';

export interface MessageReponse {
  total: number;
  pages: number;
  messages: Message[];
}
