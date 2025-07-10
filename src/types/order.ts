export type MessageRef = {
  triggerValidation: () => Promise<boolean>;
  getMessage: () => string;
};

export type Receiver = {
  name: string;
  phone: string;
  count: number;
}

export type ReceiverRef = {
  triggerReceiverValidation: () => Promise<boolean>;
}

export type SenderRef = {
  triggerSenderValidation: () => Promise<boolean>;
  getSender: () => string;
};
