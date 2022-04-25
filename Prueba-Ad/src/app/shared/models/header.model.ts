export interface IFormHeaderState {
  title: string;
  defaultActionText?: string;
  defaultActionSecondText?:string;
  addActionUrl?: string;
  addActionHelp?: string;
  backUrl?: string;
  backUrlHelp?: string;
  formId?: string;
}

export interface IHeaderMessage {
  key?: string;
  value?: any;
}


export interface IListHeaderState {
  title: string;
  defaultActionText?: string;
  defaultActionTooltip?: string;
  downloadList?: boolean;
  controlClick?: any;
  allChecked?: boolean;
  selectedItemsCounter?: number;
  partialListItemsCounter?: number;
  totalListItemsCounter?: number;
  createRoutePath?: string;
  actionsCapabilities?: IActionsCapabilitesState;
  customCreateFormState?: boolean;
  
  
}

export interface IActionsCapabilitesState {
  default?: boolean;
  delete?: boolean;
  edit?: boolean;
  create?: boolean;
}

export interface IListPermission {
  default?: string;
  delete?: string;
  edit?: string;
  create?: string;
}
