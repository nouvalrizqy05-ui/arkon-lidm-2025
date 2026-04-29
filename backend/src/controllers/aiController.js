const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini
// Ensure you have GEMINI_API_KEY in your .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "dummy_key_for_now");

exports.chatTutor = async (req, res) => {
  try {
    const { message, context } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `Anda adalah ARKON, asisten AI Socratic untuk belajar Organisasi dan Arsitektur Komputer.
    Konteks saat ini yang sedang dilihat pengguna: ${context || "Tidak ada konteks spesifik."}
    
    Tugas:
    Jawab pertanyaan berikut dengan gaya Socratic (mendorong pengguna berpikir, bukan hanya memberi jawaban langsung). Gunakan bahasa Indonesia yang ramah, ringkas, dan jelas.
    
    Pertanyaan pengguna: ${message}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    res.json({ reply: text });
  } catch (error) {
    console.error("AI Chat Error:", error);
    res.status(500).json({ error: "Gagal memproses respons AI." });
  }
};

exports.generateQuiz = async (req, res) => {
  try {
    const { topic, weakness } = req.body;
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `Anda adalah generator kuis untuk mata kuliah Organisasi dan Arsitektur Komputer.
    Topik: ${topic || "Arsitektur CPU Dasar"}
    Fokus kelemahan mahasiswa: ${weakness || "pemahaman umum"}
    
    Buatkan 3 soal pilihan ganda yang disesuaikan dengan topik dan kelemahan tersebut.
    Kembalikan HANYA dalam format JSON array yang valid, tanpa awalan markdown \`\`\`json.
    Struktur JSON harus persis seperti ini:
    [
      {
        "id": "1",
        "question": "Pertanyaan...",
        "options": ["A", "B", "C", "D"],
        "correctAnswer": 0,
        "explanation": "Penjelasan singkat..."
      }
    ]
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();
    
    // Clean up potential markdown formatting
    if (text.startsWith('```json')) text = text.slice(7);
    if (text.startsWith('```')) text = text.slice(3);
    if (text.endsWith('```')) text = text.slice(0, -3);
    
    const quizData = JSON.parse(text.trim());
    
    res.json({ quiz: quizData });
  } catch (error) {
    console.error("AI Quiz Gen Error:", error);
    res.status(500).json({ error: "Gagal membuat kuis dinamis." });
  }
};

exports.generateMindmap = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required" });

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `Ubah catatan materi Organisasi dan Arsitektur Komputer berikut menjadi struktur Mind Map.
    Catatan: ${text}
    
    Kembalikan HANYA dalam format JSON dengan struktur:
    {
      "nodes": [ { "id": "1", "data": { "label": "Konsep Utama" }, "position": { "x": 250, "y": 0 } } ],
      "edges": [ { "id": "e1-2", "source": "1", "target": "2" } ]
    }
    Buat struktur posisi node (x, y) agar menyebar logis seperti diagram pohon.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let out = response.text().trim();
    
    if (out.startsWith('```json')) out = out.slice(7);
    if (out.startsWith('```')) out = out.slice(3);
    if (out.endsWith('```')) out = out.slice(0, -3);
    
    const mindmapData = JSON.parse(out.trim());
    res.json(mindmapData);
  } catch (error) {
    console.error("AI Mindmap Gen Error:", error);
    res.status(500).json({ error: "Gagal membuat mindmap." });
  }
};
