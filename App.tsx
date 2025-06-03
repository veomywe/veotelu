
import React, { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import FormField from './components/FormField';
import SelectField from './components/SelectField';
import GeneratedPromptDisplay from './components/GeneratedPromptDisplay';
import { PromptData, Option, GeneratedPrompts } from './types';
import { 
  VIDEO_STYLES, 
  CAMERA_MOVEMENTS, 
  LIGHTING_OPTIONS, 
  TIME_OPTIONS,
  VIDEO_MOODS,
  DEFAULT_PROMPT_DATA 
} from './constants';

// Initialize Gemini AI Client
// Ensure API_KEY is available in the environment.
let ai: GoogleGenAI | null = null;
try {
    if (process.env.API_KEY) {
        ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    } else {
        console.warn("API_KEY environment variable not set. AI features will be disabled.");
    }
} catch (error) {
    console.error("Error initializing GoogleGenAI:", error);
    ai = null; 
}


const App: React.FC = () => {
  const [promptData, setPromptData] = useState<PromptData>(DEFAULT_PROMPT_DATA);
  const [generatedPrompts, setGeneratedPrompts] = useState<GeneratedPrompts>({ indonesian: '', english: '' });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiKeyMissing, setApiKeyMissing] = useState<boolean>(!process.env.API_KEY);


  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setPromptData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    },
    []
  );

  const handleIndonesianPromptChange = useCallback((newPrompt: string) => {
    setGeneratedPrompts(prev => ({ ...prev, indonesian: newPrompt }));
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!ai) {
      alert("Layanan AI tidak tersedia. Pastikan API Key sudah dikonfigurasi dengan benar.");
      setApiKeyMissing(true);
      setIsLoading(false);
      return;
    }
    setApiKeyMissing(false);
    setIsLoading(true);
    setGeneratedPrompts({ indonesian: '', english: '' });

    const {
      subject, action, expression, place, time, cameraMovement,
      lightingCondition, videoStyle, videoMood, soundOrMusic,
      spokenLines, additionalDetails, negativePrompt
    } = promptData;

    if (!subject || !action || !place) {
        alert("Mohon isi kolom Subjek, Aksi, dan Tempat.");
        setIsLoading(false);
        return;
    }
    
    const selectedTime = TIME_OPTIONS.find(t => t.value === time)?.label || time;
    const selectedCameraMovement = CAMERA_MOVEMENTS.find(cm => cm.value === cameraMovement)?.label || cameraMovement;
    const selectedLighting = LIGHTING_OPTIONS.find(l => l.value === lightingCondition)?.label || lightingCondition;
    const selectedVideoStyle = VIDEO_STYLES.find(vs => vs.value === videoStyle)?.label || videoStyle;
    const selectedVideoMood = VIDEO_MOODS.find(vm => vm.value === videoMood)?.label || videoMood;

    const userInputDetails = `
      - Subjek Utama: ${subject}
      - Aksi Utama: ${action}
      - Ekspresi Subjek: ${expression || 'tidak disebutkan'}
      - Lokasi/Setting: ${place}
      - Waktu Kejadian: ${selectedTime}
      - Gaya Artistik Video: ${selectedVideoStyle}
      - Gerakan Kamera/Bidikan: ${selectedCameraMovement}
      - Kondisi Pencahayaan: ${selectedLighting}
      - Suasana/Mood Video: ${selectedVideoMood}
      - Suara Latar atau Musik: ${soundOrMusic || 'tidak ditentukan oleh pengguna'}
      - Kalimat yang Diucapkan (jika ada): "${spokenLines || ''}"
      - Detail Tambahan Penting: ${additionalDetails || 'tidak ada'}
      - Hal yang Harus Dihindari (Prompt Negatif): ${negativePrompt || 'tidak ada'}
    `.trim();

    const enhancementInstruction = `
      Anda adalah seorang penulis skenario dan sutradara AI yang sangat kreatif, bertugas membuat prompt video yang sangat detail dan imajinatif untuk model text-to-video canggih seperti Veo 3.
      Berdasarkan elemen-elemen yang diberikan pengguna, buatlah sebuah prompt naratif dalam BAHASA INDONESIA.
      Prompt ini harus menjadi satu paragraf yang mengalir lancar, kaya akan deskripsi visual, atmosfer, dan emosi. Kembangkan setiap elemen menjadi adegan yang hidup.
      Jika "Kalimat yang Diucapkan" disediakan, integrasikan secara alami ke dalam narasi prompt persis seperti yang ditulis pengguna.
      Fokus untuk menciptakan gambaran yang jelas sehingga AI video dapat menghasilkan klip yang paling mendekati visi.
      Jangan mengulang daftar elemen, tapi ubah menjadi sebuah cerita atau deskripsi adegan yang menarik.

      Elemen-elemen dari pengguna:
      ${userInputDetails}

      Pastikan outputnya HANYA prompt video dalam Bahasa Indonesia, tanpa basa-basi atau penjelasan tambahan.
    `;

    try {
      const enhancementResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-04-17',
        contents: enhancementInstruction,
      });
      const enhancedIndonesianPrompt = enhancementResponse.text.trim();
      
      const translationInstruction = `
        Translate the following Indonesian video prompt into fluent, natural-sounding English.
        IMPORTANT: The specific phrase provided by the user for "Kalimat yang Diucapkan (Spoken Lines)" which is "${spokenLines || ''}" MUST remain in its original language (e.g., Indonesian, or any other language it was written in) and must NOT be translated. Integrate this original phrase naturally into the English translation of the prompt.
        If "Kalimat yang Diucapkan" was empty, then translate the entire prompt to English.
        Ensure the translation captures the nuance, style, and detail of the Indonesian prompt.

        Indonesian Prompt to Translate:
        "${enhancedIndonesianPrompt}"

        Output ONLY the translated English prompt, without any additional explanations or conversational text.
      `;
      
      const translationResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-04-17',
        contents: translationInstruction,
      });
      const translatedEnglishPrompt = translationResponse.text.trim();

      setGeneratedPrompts({ 
        indonesian: enhancedIndonesianPrompt, 
        english: translatedEnglishPrompt 
      });

    } catch (error) {
      console.error("Error generating prompt with AI:", error);
      let errorMsg = "Terjadi kesalahan saat membuat prompt dengan AI. Silakan coba lagi.";
      if (error instanceof Error && error.message.includes("API key not valid")) {
        errorMsg = "API Key tidak valid. Harap periksa konfigurasi API Key Anda.";
        setApiKeyMissing(true);
      }
      alert(errorMsg);
      // Fallback: generate a simple prompt
      let fallbackPrompt = `${subject}, ${action}, ${expression ? `${expression}, ` : ''}${place}. Gaya ${selectedVideoStyle}, bidikan ${selectedCameraMovement}, pencahayaan ${selectedLighting}, suasana ${selectedVideoMood}.`;
      if (time) fallbackPrompt += ` Waktu: ${selectedTime}.`;
      if (soundOrMusic) fallbackPrompt += ` Suara/Musik: ${soundOrMusic}.`;
      if (spokenLines) fallbackPrompt += ` Mengucapkan: "${spokenLines}".`;
      if (additionalDetails) fallbackPrompt += ` ${additionalDetails}.`;
      if (negativePrompt) fallbackPrompt += ` Hindari: ${negativePrompt}.`;
      setGeneratedPrompts({ indonesian: fallbackPrompt, english: "Translation failed due to an error. Please check the Indonesian prompt or try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center py-8 md:py-12 px-4">
      <div className="w-full max-w-3xl">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-400">
            Veo 3 Prompt Generator
          </h1>
          <p className="text-xl font-medium text-gray-400 mt-2">
            by Lanexa
          </p>
          <p className="text-gray-400 mt-3 text-lg">
            Buat prompt video detail untuk Veo 3 dengan bantuan AI.
          </p>
        </header>

        {apiKeyMissing && (
            <div className="mb-6 p-4 bg-red-800 border border-red-600 text-red-100 rounded-lg text-center">
                <p className="font-semibold">Peringatan: API Key untuk Gemini AI tidak ditemukan atau tidak valid.</p>
                <p>Fungsi pembuatan prompt dengan AI tidak akan bekerja. Pastikan variabel lingkungan <code>API_KEY</code> telah diatur dengan benar.</p>
            </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-6 md:p-8 rounded-xl shadow-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <FormField
              label="Subjek Utama"
              id="subject"
              name="subject"
              value={promptData.subject}
              onChange={handleChange}
              placeholder="Cth: astronot pemberani, kucing jahe"
              required
            />
            <FormField
              label="Aksi Utama"
              id="action"
              name="action"
              value={promptData.action}
              onChange={handleChange}
              placeholder="Cth: menjelajahi planet Mars, tidur siang di sofa"
              required
            />
          </div>
          <FormField
            label="Ekspresi Subjek (Opsional)"
            id="expression"
            name="expression"
            value={promptData.expression}
            onChange={handleChange}
            placeholder="Cth: tersenyum lebar, terlihat cemas, penasaran"
          />
          <FormField
            label="Tempat/Setting/Lingkungan"
            id="place"
            name="place"
            value={promptData.place}
            onChange={handleChange}
            placeholder="Cth: di hutan ajaib, stasiun luar angkasa modern"
            required
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <SelectField
              label="Waktu Kejadian"
              id="time"
              name="time"
              value={promptData.time}
              onChange={handleChange}
              options={TIME_OPTIONS}
              required
            />
            <SelectField
              label="Gaya Video/Artistik"
              id="videoStyle"
              name="videoStyle"
              value={promptData.videoStyle}
              onChange={handleChange}
              options={VIDEO_STYLES}
              required
            />
          </div>

          <SelectField
            label="Gerakan Kamera/Bidikan"
            id="cameraMovement"
            name="cameraMovement"
            value={promptData.cameraMovement}
            onChange={handleChange}
            options={CAMERA_MOVEMENTS}
            required
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <SelectField
              label="Kondisi Pencahayaan"
              id="lightingCondition"
              name="lightingCondition"
              value={promptData.lightingCondition}
              onChange={handleChange}
              options={LIGHTING_OPTIONS}
              required
            />
            <SelectField
              label="Suasana/Mood Video"
              id="videoMood"
              name="videoMood"
              value={promptData.videoMood}
              onChange={handleChange}
              options={VIDEO_MOODS}
              required
            />
          </div>

          <FormField
            label="Suara Latar atau Musik (Opsional)"
            id="soundOrMusic"
            name="soundOrMusic"
            value={promptData.soundOrMusic}
            onChange={handleChange}
            placeholder="Cth: musik orkestra epik, suara alam yang menenangkan, tanpa suara"
          />
          <FormField
            label="Kalimat yang Diucapkan (Opsional)"
            id="spokenLines"
            name="spokenLines"
            value={promptData.spokenLines}
            onChange={handleChange}
            placeholder="Cth: 'Kita berhasil!', 'Apa yang terjadi di sana?'"
            isTextArea
          />
          <FormField
            label="Detail Tambahan (Opsional)"
            id="additionalDetails"
            name="additionalDetails"
            value={promptData.additionalDetails}
            onChange={handleChange}
            placeholder="Cth: dengan efek slow motion, warna dominan biru dan emas, kualitas 8K"
            isTextArea
          />
          <FormField
            label="Prompt Negatif (Hal yang Dihindari - Opsional)"
            id="negativePrompt"
            name="negativePrompt"
            value={promptData.negativePrompt}
            onChange={handleChange}
            placeholder="Cth: buram, kualitas rendah, teks, watermark, deformasi"
          />

          <button
            type="submit"
            className="w-full mt-6 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={isLoading || apiKeyMissing}
          >
            {isLoading ? 'Memproses...' : 'Buat Prompt dengan AI'}
          </button>
        </form>

        <GeneratedPromptDisplay 
          indonesianPrompt={generatedPrompts.indonesian}
          englishPrompt={generatedPrompts.english}
          onIndonesianPromptChange={handleIndonesianPromptChange}
          isLoading={isLoading}
        />
        
        <footer className="text-center mt-12 py-6 border-t border-gray-700">
            <p className="text-gray-500 text-sm">
                Veo 3 Prompt Generator &copy; {new Date().getFullYear()}.
            </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
