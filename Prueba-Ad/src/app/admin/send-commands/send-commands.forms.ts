import { FormControl, Validators } from '@angular/forms';

export const FormFieldsSendCommands = {
    tipo: new FormControl(null),
    cliente: new FormControl(null, [Validators.required]),
    device_type: new FormControl({value:null, disabled: true}),
    device: new FormControl({value:[], disabled: true}),
    commandsId: new FormControl({value:[], disabled: true}),
    commands: new FormControl([], [Validators.required]),
    recaptcha: new FormControl()
};

export const FormFieldsListSendCommands = {
    id: new FormControl(null),
    cliente: new FormControl(null, [Validators.required]),
    client_name: new FormControl(null, [Validators.required]),
    device:new FormControl(null, [Validators.required]),
    identifier: new FormControl(null, [Validators.required]),
    activo:new FormControl(null, [Validators.required]),
    asset_name:new FormControl(null, [Validators.required]),//no
    command_type: new FormControl(null, [Validators.required]),//id
    technical_command: new FormControl(null, [Validators.required]), // comando
    command:new FormControl(null, [Validators.required]), // nombre del comando
    order:new FormControl(null, [Validators.required]), 
    technical_response : new FormControl(null),//*
    response_message: new FormControl(null),//*
    status: new FormControl(null),//*
  
};

