/**
 * Type definitions for SWFL Data Gulf landing page
 */

/**
 * Interface for Q&A comparison data
 * Represents the structure for comparing generic AI responses vs SWFL Data Gulf responses
 */
export interface QAData {
  question: string;
  generic: {
    response: string;
  };
  data: {
    value: string;
    subtext?: string;
    source: string;
    freshness: string;
    confidence: string;
  };
}
