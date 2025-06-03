
export interface PromptData {
  subject: string;
  action: string;
  expression: string; // New
  place: string; // Renamed from setting
  time: string; // New
  cameraMovement: string; // Renamed from cameraShot, options will change
  lightingCondition: string; // Renamed from lighting
  videoStyle: string; // Renamed from style
  videoMood: string; // New
  soundOrMusic: string; // New
  spokenLines: string; // New
  additionalDetails: string;
  negativePrompt: string;
}

export interface Option {
  value: string;
  label: string;
}

export interface GeneratedPrompts {
  indonesian: string;
  english: string;
}
