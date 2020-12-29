export interface Epicrisis {
  _id: string;
  fecha_procedimiento: string;
  fecha_alta: string;
  presion_arterial_sistolica: number;
  presion_arterial_diastolica: number;
  temperatura: number;
  frecuencia_arterial: number;
  frecuencia_respiratoria: number;
  diagnostico_ingreso: string;
  diagnostico_egreso: string;
  medicacion: string[];
  medidas_terapeuticas: string[];
  fecha_nacimiento: string;
  dias_post_operado: number;
  dias_alta: number;
  edad: number;
}
