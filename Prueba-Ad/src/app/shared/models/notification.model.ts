export interface INotificationItem {
  show?: boolean;
  title?: string;
  content?: Array<string>;
  task?: boolean;
  weft?: boolean;
  confirmButtonText?: string;
  customClass?: string;
  cancelButtonText?: string;
  contentTitle: string;
  contentType: string;
  contentItert?: Array<any>;

  [propName: string]: any;
}
