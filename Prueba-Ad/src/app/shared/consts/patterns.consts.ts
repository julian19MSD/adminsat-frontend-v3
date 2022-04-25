export const NAME_PATTERN = '[a-z A-Z ÁÉÑÍÓÚÇÄËÏÖÜáéñíóúçäëïöü]*';
export const PHONE_PATTERN = '^[0-9]*$';
export const CITY_PATTERN = '^[a-zA-Záéíóú\\s]*$';
export const ADDRESS_PATTERN = '^[0-9a-zA-Z\\s\\#\\-áéíóú]*$';
export const EMAIL_PATTERN = '^[a-zA-Z0-9.!#$%&’*+\\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$';
export const PASSWORD_PATTERN = '^((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])).{8,}$';
