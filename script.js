const urlParams = new URLSearchParams(window.location.search);
let currentLanguage = urlParams.get('bahasa') || 'id'; // ambil bahasa dari URL
let userName = urlParams.get('nama') || ''; // (bisa kosong kalau tidak digunakan)
let userAge = urlParams.get('umur') || '';

const chatbox = document.getElementById('chatbox');

const langData = {
  id: {
    getWelcome: () => `👋 Selamat datang saya <b>Bima</b>! Anda sedang menggunakan <b>Bahasa Indonesia</b>. Silakan ketik pertanyaan seputar Sensus Ekonomi 2026, saya siap membantu!`,
    prompt: 'Silakan ketik pertanyaan Anda!',
    end: 'Terima kasih telah menggunakan layanan Chatbot Semar. Jangan lupa dukung Sensus Ekonomi demi Indonesia yang lebih maju!',
  },
  su: {
    getWelcome: () => `👋 Wilujeng sumping kuring <b>Bima</b>! Anjeun nuju ngagunakeun <b>Basa Sunda</b>. Mangga ketik patarosan ngeunaan Sénsus Ékonomi 2026, abdi siap ngabantosan!`,
    prompt: 'Mangga ketik patarosan anjeun!',
    end: 'Hatur nuhun parantos nganggo Semar. Dugi ka pendakan deui!',
  },
};

const responses = [
  {
    keywords: ['sensus ekonomi', 'apa itu sensus'],
    id: 'Sensus Ekonomi adalah pendataan lengkap seluruh kegiatan ekonomi di Indonesia kecuali sektor pertanian.',
    su: 'Sénsus Ékonomi nyaéta pendataan lengkep sadaya kagiatan ékonomi di Indonésia kajaba sektor pertanian.',
  },
  {
    keywords: ['jadwal', 'kapan sensus', 'waktu sensus', 'kapan'],
    id: 'Sensus Ekonomi 2026 dilaksanakan bulan Mei–Juni 2026 di seluruh Indonesia.',
    su: 'Sénsus Ékonomi 2026 dilaksanakeun dina bulan Méi–Juni 2026 di sakuliah Indonésia.',
  },
  {
    keywords: ['data aman', 'kerahasiaan', 'keamanan data'],
    id: 'Ya, data Anda dijamin kerahasiaannya sesuai UU Statistik. Hanya digunakan untuk keperluan statistik dan tidak dipublikasikan per individu.',
    su: 'Leres, data anjeun dijamin karusiahanana nurutkeun kana UU Statistik. Ngan dipaké pikeun statistik jeung henteu dipublikasikeun perorangan.',
  },
  {
    keywords: ['usaha mikro', 'usaha kecil', 'usaha rumahan'],
    id: 'Ya, semua jenis usaha termasuk usaha mikro, kecil, dan rumahan akan didata dalam Sensus Ekonomi.',
    su: 'Leres, sagala rupa usaha kaasup usaha mikro, leutik, jeung usaha imah baris didata dina Sénsus Ékonomi.',
  },
  {
    keywords: ['petugas', 'siapa yang melakukan', 'petugas sensus'],
    id: 'Sensus Ekonomi dilakukan oleh petugas resmi dari Badan Pusat Statistik (BPS) yang sudah dibekali identitas dan surat tugas.',
    su: 'Sénsus Ékonomi dilakukeun ku petugas resmi ti BPS anu geus boga identitas jeung surat tugas.',
  },
  {
    keywords: ['call center', 'hubungi', 'kontak'],
    id: 'Silakan hubungi Call Center BPS Tasikmalaya di (0265) XXX-XXX pada jam kerja.',
    su: 'Mangga hubungi Call Center BPS Tasikmalaya di (0265) XXX-XXX dina jam damel.',
  },
  {
    keywords: ['terima kasih', 'makasih'],
    id: 'Sama-sama! Senang bisa membantu 😊',
    su: 'Sareng sami! Bungah tiasa ngabantosan 😊',
  },
  {
    keywords: ['data dikumpulkan', 'jenis data'],
    id: 'Data yang dikumpulkan mencakup nama usaha, lokasi, jenis usaha, jumlah pekerja, pendapatan, dan pengeluaran.',
    su: 'Data anu dikumpulkeun ngawengku ngaran usaha, lokasi, jinis usaha, jumlah pagawé, panghasilan jeung pengeluaran.',
  },
  {
    keywords: ['tidak di rumah', 'saya tidak di tempat'],
    id: 'Petugas sensus akan menjadwalkan ulang kunjungan atau menghubungi Anda melalui kontak yang tersedia.',
    su: 'Petugas sensus bakal ngajadwalkeun deui kadatangan atawa ngahubungi anjeun liwat kontak nu sayogi.',
  },
  {
    keywords: ['e-form', 'isi online', 'online'],
    id: 'Jika tersedia, pengisian Sensus Ekonomi juga bisa dilakukan secara online melalui e-form resmi dari BPS.',
    su: 'Lamun sayogi, ngeusian Sénsus Ékonomi ogé tiasa dilakukeun sacara online ngaliwatan e-form resmi ti BPS.',
  },
  {
    keywords: ['manfaat sensus', 'kenapa sensus', 'tujuan sensus'],
    id: 'Sensus Ekonomi memberikan data penting untuk perencanaan pembangunan, kebijakan ekonomi, dan investasi daerah.',
    su: 'Sénsus Ékonomi masihan data penting pikeun perencanaan pembangunan, kawijakan ékonomi, jeung investasi daérah.',
  },
];

function displayBotMessage(message, callback) {
  const typing = document.createElement('div');
  typing.className = 'chat-message bot-message typing-indicator';
  typing.innerHTML = '<span>.</span><span>.</span><span>.</span>';
  chatbox.appendChild(typing);
  chatbox.scrollTop = chatbox.scrollHeight;

  setTimeout(() => {
    chatbox.removeChild(typing);
    const msg = document.createElement('div');
    msg.className = 'chat-message bot-message';
    msg.innerHTML = message;
    chatbox.appendChild(msg);
    chatbox.scrollTop = chatbox.scrollHeight;
    if (callback) callback();
  }, 700);
}

function displayUserMessage(message) {
  const msg = document.createElement('div');
  msg.className = 'chat-message user-message';
  msg.innerText = `👤 ${message}`;
  chatbox.appendChild(msg);
  chatbox.scrollTop = chatbox.scrollHeight;
}

function handleTextInput() {
  const input = document.getElementById('userInput');
  const message = input.value.trim();
  if (!message) return;

  displayUserMessage(message);
  input.value = '';

  const normalized = message.toLowerCase();

  // Split kata input user
  const inputWords = normalized.split(/\s+/);

  // Cari kecocokan berdasarkan kata kunci fleksibel
  const match = responses.find((r) => {
    return r.keywords.some((keyword) => {
      const keywordWords = keyword.toLowerCase().split(/\s+/);
      // Hitung berapa banyak kata kunci yang muncul di input user
      const matchedWords = keywordWords.filter((kw) => inputWords.some((w) => w.includes(kw)));
      return matchedWords.length >= Math.min(2, keywordWords.length); // minimal 2 kata cocok
    });
  });

  if (match) {
    const response = match[currentLanguage] || match.id;
    setTimeout(() => displayBotMessage(response), 500);
  } else {
    const fallback = currentLanguage === 'id' ? 'Maaf, saya belum memahami pertanyaan itu.' : 'Hapunten, abdi henteu ngartos patarosanana.';
    setTimeout(() => displayBotMessage(fallback), 500);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  displayBotMessage(langData[currentLanguage].getWelcome());

  const input = document.getElementById('userInput');
  const sendBtn = document.querySelector('.text-input-area button');

  if (input && sendBtn) {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleTextInput();
      }
    });

    sendBtn.addEventListener('click', handleTextInput);
  }
});
