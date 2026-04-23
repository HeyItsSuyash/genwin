import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IAnalysis extends Document {
  userId: string;
  inputText: string;
  claim: string;
  trustScore: number;
  verdict: 'Likely True' | 'Uncertain' | 'Likely False';
  sourceCredibility?: string;
  supportingEvidence?: string[];
  contradictions?: string[];
  missingContext?: string;
  createdAt: Date;
}

const AnalysisSchema: Schema = new Schema({
  userId: { type: String, required: true },
  inputText: { type: String, required: true },
  claim: { type: String, required: true },
  trustScore: { type: Number, required: true, min: 0, max: 100 },
  verdict: { type: String, required: true, enum: ['Likely True', 'Uncertain', 'Likely False'] },
  sourceCredibility: { type: String },
  supportingEvidence: [{ type: String }],
  contradictions: [{ type: String }],
  missingContext: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Create index for querying user history
AnalysisSchema.index({ userId: 1, createdAt: -1 });

export const Analysis: Model<IAnalysis> = mongoose.models.Analysis || mongoose.model<IAnalysis>('Analysis', AnalysisSchema);
