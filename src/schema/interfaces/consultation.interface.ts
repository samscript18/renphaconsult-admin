import { DefaultModel } from ".";

export interface ConsultationHistory {
  question: string;
  response: string;
}

export interface Consultation extends DefaultModel {
  userId: string;
  destination: string;
  question: string;
  response: string;
  consultationHistory: ConsultationHistory[];
}
