export const EVENTS_IDS = {
  request_location: 14
};

export const CHOICES = {
  message_direction:[
    {id: 0, value: 'SENT'},
    {id: 1, value: 'RECEIVED'},
  ],
  message_status:[
    {id: 0, value: 'OK'},
    {id: 1, value: 'FAILED'},
  ],
  ignition: [
    {id: true, value: 'SWITCHED_ON'},
    {id: false, value: 'SWITCHED_OFF'}
  ],
  gps_quality: [
    {id: true, value: 'VALID'},
    {id: false, value: 'INVALID'},
    {id: 'last', value: 'LAST_LOCATION'}
  ],
  report_time: [
    {id: 24, value: '1_DAY_NOREPORT'},
    {id: 12, value: '12_HOURS_NOREPORT'},
    {id: 3, value: '3_HOURS_NOREPORT'}
  ],
  state: [
    {id: true, value: 'ACTIVE'},
    {id: false, value: 'INACTIVE'}
  ],
  have: [
    {id: true, value: 'HAS'},
    {id: false, value: 'DOES_NOT_HAVE'}
  ],
  secure: [
    {id: true, value: 'SECURE'},
    {id: false, value: 'NOT_SECURE'}
  ],
  sort: [
    {id: '+', value: 'UPWARD'},
    {id: '-', value: 'DOWNWARD'}
  ],
  modeZones:[
    {id: 0, nombre: 'INGRESS'},
    {id: 1, nombre: 'OUTPUT'},
    {id: 2, nombre: 'BOTH'},

  ]
};
