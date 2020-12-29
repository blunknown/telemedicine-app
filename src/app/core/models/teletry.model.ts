export interface Teletry {
  temperatura: number;
  glucosa: number;
  frecuencia_arterial: number;
  frecuencia_respiratoria: number;
  presion_arterial_diastolica: number;
  presion_arterial_sistolica: number;
  dolor: number;
  sangrado_vagina: string;
  color_sangrado_vagina: string;
  sangrado_herida: string;
  color_sangrado_herida: string;
  coloracion_herida: string;
  color_coloracion_herida: string;
  molestia_miccion: string;
  tipo_molestia_miccion: string[];
  veces_defeca_dia: number;
  textura_heces: string;
  otros: string;
  estado?: string;
  recomendacion?: string;
}
