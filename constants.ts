
import { Option, PromptData } from './types';

export const VIDEO_STYLES: Option[] = [
  { value: 'photorealistic', label: 'Fotorealistik (Photorealistic)' },
  { value: 'cinematic', label: 'Sinematik (Cinematic)' },
  { value: 'anime', label: 'Anime' },
  { value: 'watercolor', label: 'Lukisan Cat Air (Watercolor)' },
  { value: 'pixel_art', label: 'Pixel Art' },
  { value: '3d_render', label: 'Render 3D (3D Render)' },
  { value: 'fantasy_art', label: 'Seni Fantasi (Fantasy Art)' },
  { value: 'sci_fi_concept', label: 'Konsep Sci-Fi (Sci-Fi Concept)' },
  { value: 'vintage_film', label: 'Film Vintage (Vintage Film)' },
  { value: 'documentary_style', label: 'Gaya Dokumenter (Documentary Style)' },
  { value: 'claymation', label: 'Claymation' },
  { value: 'stop_motion', label: 'Stop Motion' },
  { value: 'surrealism', label: 'Surealisme (Surrealism)' },
  { value: 'impressionism', label: 'Impresionisme (Impressionism)' },
  { value: 'noir_film', label: 'Film Noir' },
];

export const CAMERA_MOVEMENTS: Option[] = [
  { value: 'static_shot', label: 'Static Shot (Bidikan Statis)' },
  { value: 'pan_left', label: 'Pan Left (Geser Kiri)' },
  { value: 'pan_right', label: 'Pan Right (Geser Kanan)' },
  { value: 'tilt_up', label: 'Tilt Up (Dongak ke Atas)' },
  { value: 'tilt_down', label: 'Tilt Down (Tunduk ke Bawah)' },
  { value: 'zoom_in', label: 'Zoom In (Perbesar)' },
  { value: 'zoom_out', label: 'Zoom Out (Perkecil)' },
  { value: 'dolly_zoom', label: 'Dolly Zoom (Efek Vertigo)' },
  { value: 'tracking_shot', label: 'Tracking Shot (Bidikan Mengikuti)' },
  { value: 'orbit_left', label: 'Orbit Left (Mengorbit Kiri)' },
  { value: 'orbit_right', label: 'Orbit Right (Mengorbit Kanan)' },
  { value: 'arc_left', label: 'Arc Left (Busur Kiri)' },
  { value: 'arc_right', label: 'Arc Right (Busur Kanan)' },
  { value: 'boom_up', label: 'Boom Up (Crane ke Atas)' },
  { value: 'boom_down', label: 'Boom Down (Crane ke Bawah)' },
  { value: 'dolly_in', label: 'Dolly In (Dorong Maju)' },
  { value: 'dolly_out', label: 'Dolly Out (Tarik Mundur)' },
  { value: 'roll_left', label: 'Roll Left (Putar Kiri Sumbu Lensa)' },
  { value: 'roll_right', label: 'Roll Right (Putar Kanan Sumbu Lensa)' },
  { value: 'truck_left', label: 'Truck Left (Geser Kamera Kiri)' },
  { value: 'truck_right', label: 'Truck Right (Geser Kamera Kanan)' },
  { value: 'pedestal_up', label: 'Pedestal Up (Naikkan Kamera Vertikal)' },
  { value: 'pedestal_down', label: 'Pedestal Down (Turunkan Kamera Vertikal)' },
  { value: 'handheld_shot', label: 'Handheld Shot (Bidikan Genggam)' },
  { value: 'drone_shot', label: 'Drone Shot (Bidikan Drone/Udara)' },
  { value: 'pov_shot', label: 'POV Shot (Sudut Pandang Pertama)' },
  { value: 'three_d_rotation', label: '3D Rotation (Rotasi 3D)' },
  { value: 'horizontal_arc_left', label: 'Horizontal Arc Left (Busur Horizontal Kiri)' },
  { value: 'horizontal_arc_right', label: 'Horizontal Arc Right (Busur Horizontal Kanan)' },
  { value: 'vertical_arc_up', label: 'Vertical Arc Up (Busur Vertikal Atas)' },
  { value: 'vertical_arc_down', label: 'Vertical Arc Down (Busur Vertikal Bawah)' },
  { value: 'shake', label: 'Shake (Guncangan)' },
  { value: 'spiral_left', label: 'Spiral Left (Spiral Kiri)' },
  { value: 'spiral_right', label: 'Spiral Right (Spiral Kanan)' },
  { value: 'extreme_close_up', label: 'Extreme Close-up (Sangat Dekat)' },
  { value: 'close_up', label: 'Close-up (Dekat)' },
  { value: 'medium_shot', label: 'Medium Shot (Bidikan Sedang)' },
  { value: 'wide_shot', label: 'Wide Shot (Bidikan Lebar)' },
  { value: 'extreme_wide_shot', label: 'Extreme Wide Shot (Bidikan Sangat Lebar)' },
];

export const LIGHTING_OPTIONS: Option[] = [
  { value: 'golden_hour', label: 'Golden Hour (Matahari Terbit/Terbenam)' },
  { value: 'studio_light', label: 'Lampu Studio Profesional (Studio Light)' },
  { value: 'neon_lights', label: 'Lampu Neon (Neon Lights)' },
  { value: 'dimly_lit', label: 'Remang-remang (Dimly Lit)' },
  { value: 'bright_sunlight', label: 'Cahaya Matahari Terang (Bright Sunlight)' },
  { value: 'moonlight', label: 'Cahaya Bulan (Moonlight)' },
  { value: 'dramatic_lighting', label: 'Pencahayaan Dramatis (Dramatic Lighting)' },
  { value: 'volumetric_lighting', label: 'Pencahayaan Volumetrik (Volumetric Lighting)' },
  { value: 'backlight', label: 'Cahaya Belakang (Backlight)' },
  { value: 'soft_diffused_light', label: 'Cahaya Lembut Menyebar (Soft Diffused Light)' },
  { value: 'silhouette', label: 'Siluet (Silhouette)' },
  { value: 'underwater_lighting', label: 'Pencahayaan Bawah Air (Underwater Lighting)' },
  { value: 'cinematic_lighting', label: 'Pencahayaan Sinematik (Cinematic Lighting)' },
];

export const TIME_OPTIONS: Option[] = [
    { value: 'sunrise', label: 'Pagi hari (Sunrise)' },
    { value: 'daytime', label: 'Siang hari (Daytime)' },
    { value: 'golden_hour_sunset', label: 'Sore hari (Golden Hour/Sunset)' },
    { value: 'dusk', label: 'Senja (Dusk)' },
    { value: 'night', label: 'Malam hari (Night)' },
    { value: 'midnight', label: 'Tengah malam (Midnight)' },
    { value: 'dawn', label: 'Subuh (Dawn)' },
    { value: 'magic_hour', label: 'Magic Hour (Transisi Siang-Malam)' },
];

export const VIDEO_MOODS: Option[] = [
    { value: 'tense', label: 'Menegangkan (Tense/Suspenseful)' },
    { value: 'happy', label: 'Bahagia (Happy/Joyful)' },
    { value: 'sad', label: 'Sedih (Sad/Melancholic)' },
    { value: 'mysterious', label: 'Misterius (Mysterious)' },
    { value: 'romantic', label: 'Romantis (Romantic)' },
    { value: 'funny', label: 'Lucu (Funny/Comical)' },
    { value: 'scary', label: 'Seram (Scary/Horror)' },
    { value: 'epic', label: 'Epik (Epic)' },
    { value: 'peaceful', label: 'Damai (Peaceful/Calm)' },
    { value: 'nostalgic', label: 'Nostalgia (Nostalgic)' },
    { value: 'dreamy', label: 'Melamun (Dreamy)' },
    { value: 'energetic', label: 'Penuh Energi (Energetic)' },
    { value: 'dark_moody', label: 'Gelap & Murung (Dark & Moody)' },
];


export const DEFAULT_PROMPT_DATA: PromptData = {
  subject: '',
  action: '',
  expression: '',
  place: '',
  time: TIME_OPTIONS[1].value, // Daytime
  cameraMovement: CAMERA_MOVEMENTS[0].value, // Static Shot
  lightingCondition: LIGHTING_OPTIONS[4].value, // Bright Sunlight
  videoStyle: VIDEO_STYLES[0].value, // Photorealistic
  videoMood: VIDEO_MOODS[1].value, // Happy
  soundOrMusic: '',
  spokenLines: '',
  additionalDetails: '',
  negativePrompt: '',
};
