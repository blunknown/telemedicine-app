export interface User {
  _id?: string;
  nombres: string;
  apellidos: string;
  fecha_nacimiento: string;
  sexo: string;
  dni: string;
  domicilio: string;
  telefono: string;
  provincia?: string;
  estado_civil?: string;
  especialidad?: string;
  email: string;
  password: string;
  foto: string;
  roles: string[];
}
