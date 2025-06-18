// ✅ Multi-Bahasa Chatbot SiTatik Versi Lengkap
let currentLanguage = 'id';

const langData = {
  id: {
    welcome: '👋 Halo! Selamat datang di Layanan Informasi Sensus Ekonomi 2026 Kabupaten Tasikmalaya.\nSaya SiTatik, siap membantu Anda!',
    prompt: 'Silakan pilih menu di bawah!',
    submenuLabel: 'Pilihan lanjutan:',
    end: '❌ Terima kasih telah menggunakan layanan Chatbot SiTatik. Jangan lupa dukung Sensus Ekonomi demi Indonesia yang lebih maju!',
    buttons: [
      { label: 'Apa itu Sensus Ekonomi', action: 'apa' },
      { label: 'Jadwal & Pelaksanaan', action: 'jadwal' },
      { label: 'Cara Berpartisipasi', action: 'cara' },
      { label: 'FAQ', action: 'faq' },
      { label: 'Kontak', action: 'kontak' },
      { label: 'Unduh Publikasi', action: 'unduh' },
    ],
  },
  su: {
    welcome: '👋 Wilujeng sumping di Layanan Sensus Ekonomi 2026 Kab. Tasikmalaya.\nAbdi SiTatik, siap ngabantosan anjeun!',
    prompt: 'Mangga pilih ménu di handap!',
    submenuLabel: 'Pilihan tambahan:',
    end: '❌ Hatur nuhun parantos nganggo SiTatik. Dugi ka pendakan deui!',
    buttons: [
      { label: 'Naon ari Sensus Ekonomi', action: 'apa' },
      { label: 'Jadwal & Palaksanaan', action: 'jadwal' },
      { label: 'Kumaha cara ilubiung', action: 'cara' },
      { label: 'Patarosan Umum', action: 'faq' },
      { label: 'Kontak', action: 'kontak' },
      { label: 'Unduh Publikasi', action: 'unduh' },
    ],
  },
};

const chatbox = document.getElementById('chatbox');

window.onload = function () {
  setTimeout(() => {
    displayBotMessage(langData[currentLanguage].welcome);
  }, 1000);
};

function displayBotMessage(message, callback) {
  const typing = document.createElement('div');
  typing.className = 'chat-message';
  typing.innerText = '...';
  chatbox.appendChild(typing);
  chatbox.scrollTop = chatbox.scrollHeight;

  setTimeout(() => {
    chatbox.removeChild(typing);

    const msg = document.createElement('div');
    msg.className = 'chat-message';
    msg.innerText = message;
    chatbox.appendChild(msg);
    chatbox.scrollTop = chatbox.scrollHeight;

    if (callback) callback();
  }, 700);
}

function displayHTMLBotMessage(html, callback) {
  const typing = document.createElement('div');
  typing.className = 'chat-message';
  typing.innerText = '...';
  chatbox.appendChild(typing);
  chatbox.scrollTop = chatbox.scrollHeight;

  setTimeout(() => {
    chatbox.removeChild(typing);

    const msg = document.createElement('div');
    msg.className = 'chat-message';
    msg.innerHTML = html;
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
  const userMessage = input.value.trim();
  if (!userMessage) return;

  displayUserMessage(userMessage);

  setTimeout(() => {
    displayBotMessage(langData[currentLanguage].prompt, () => {
      displayBotButtons();
    });
  }, 300);

  input.value = '';
}

function displayBotButtons() {
  const wrapper = document.createElement('div');
  wrapper.className = 'chat-message user-message';

  langData[currentLanguage].buttons.forEach((btn) => {
    const button = document.createElement('button');
    button.innerText = btn.label;
    button.className = 'chat-button';
    button.onclick = () => selectMenu(btn.action);
    wrapper.appendChild(button);
  });

  chatbox.appendChild(wrapper);
  chatbox.scrollTop = chatbox.scrollHeight;
}

function toggleMenu() {
  const menu = document.getElementById('menuDropdown');
  if (menu) {
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
  }
}

function changeLanguage(lang) {
  currentLanguage = lang;
  chatbox.innerHTML = '';
  displayBotMessage(langData[lang].welcome);
  toggleMenu();
}

function endChat() {
  displayBotMessage(langData[currentLanguage].end);
  toggleMenu();
}

const submenus = {
  apa: [
    { label: { id: 'Manfaat SE bagi pelaku usaha', su: 'Mangpaatna SE pikeun nu usaha' }, text: { id: 'Untuk kebijakan ekonomi', su: 'Pikeun kabijakan ékonomi' } },
    { label: { id: 'Siapa yang wajib didata?', su: 'Saha nu kudu didata?' }, text: { id: 'Wajib diikuti oleh semua pelaku usaha', su: 'Kudu diiluan ku sakumna nu usaha' } },
    { label: { id: 'Kapan terakhir SE dilakukan?', su: 'Iraha terakhir SE dilakukeun?' }, text: { id: 'SE terakhir: 2016', su: 'SE terakhir: 2016' } },
  ],
  jadwal: [
    { label: { id: 'Cara mengetahui petugas resmi', su: 'Kumaha nyaho petugas resmi' }, text: { id: 'SE2026 dilaksanakan Mei–Juni 2026', su: 'SE2026 dilakukeun bulan Méi–Juni 2026' } },
    { label: { id: 'Protokol keamanan saat pendataan', su: 'Protokol kaamanan waktos pendataan' }, text: { id: 'Petugas datang langsung atau kontak online', su: 'Petugas sumping langsung atawa ngontak online' } },
    { label: { id: 'Apakah data saya aman?', su: 'Naha data abdi aman?' }, text: { id: 'Data dijamin aman dan rahasia', su: 'Data dijamin aman jeung rahasia' } },
  ],
  cara: [
    { label: { id: 'Lokasi posko SE di kecamatan', su: 'Lokasi posko SE di kacamatan' }, text: { id: '1. Menerima petugas sensus', su: '1. Narima petugas sensus' } },
    { label: { id: 'Daftar pertanyaan yang ditanyakan', su: 'Daptar patarosan nu ditaroskeun' }, text: { id: '2. Menjawab pertanyaan dengan jujur', su: '2. Ngejawab patarosan kalayan jujur' } },
    { label: { id: 'Link e-form jika tersedia', su: 'Tautan e-form lamun aya' }, text: { id: 'Isi e-form online (jika tersedia)', su: 'Eusian e-form online (lamun aya)' } },
  ],
  faq: [
    { label: { id: 'Apakah saya wajib ikut SE?', su: 'Naha abdi kudu ilubiung SE?' }, text: { id: 'Ya, ini adalah program nasional.', su: 'Leres, ieu téh program nasional.' } },
    { label: { id: 'Apakah ada hadiah?', su: 'Aya hadiahna?' }, text: { id: 'Tidak. Ini bukan undian.', su: 'Henteu. Ieu sanés undian.' } },
    { label: { id: 'Apakah data saya akan dipublikasikan?', su: 'Naha data abdi baris disebarkeun?' }, text: { id: 'Data hanya untuk keperluan statistik.', su: 'Data ngan pikeun kaperluan statistik.' } },
  ],
  kontak: [
    { label: { id: 'Call Center BPS Tasikmalaya', su: 'Puseur Inpormasi BPS Tasikmalaya' }, text: { id: 'Telepon: (0265) XXX-XXX', su: 'Telepon: (0265) XXX-XXX' } },
    { label: { id: 'Email', su: 'Surélék' }, text: { id: 'Email: bpsxxxx@bps.go.id', su: 'Surélék: bpsxxxx@bps.go.id' } },
    { label: { id: 'Website', su: 'Situs Wéb' }, text: { id: 'www.bps.go.id', su: 'www.bps.go.id' } },
  ],
  unduh: [
    { label: { id: 'Brosur PDF', su: 'Brosur PDF' }, text: { id: '📄 Klik untuk download brosur.', su: '📄 Klik pikeun ngunduh brosur.' } },
    { label: { id: 'Infografis Pelaku Usaha', su: 'Infografis Nu Usaha' }, text: { id: '📊 Lihat infografis SE2026.', su: '📊 Tingali infografis SE2026.' } },
    { label: { id: 'Video Sosialisasi SE2026', su: 'Pidéo Sosialisasi SE2026' }, text: { id: '🎥 Tonton video sosialisasi.', su: '🎥 Lalajo pidéo sosialisasi.' } },
  ],
};

function selectMenu(option) {
  const items = submenus[option];
  let opening = '';

  switch (option) {
    case 'apa':
      opening =
        currentLanguage === 'id'
          ? `📌 <b>Sensus Ekonomi (SE)</b><br>Merupakan pendataan menyeluruh terhadap seluruh pelaku usaha, baik formal maupun informal di seluruh Indonesia.`
          : `📌 <b>Sénsus Ékonomi (SE)</b><br>Nyaéta pendataan sagemblengna pikeun sakabéh nu usaha, boh formal boh informal di sakuliah Indonésia.`;
      break;
    case 'jadwal':
      opening =
        currentLanguage === 'id' ? `📅 <b>Jadwal & Pelaksanaan SE2026</b><br>SE2026 dilaksanakan pada bulan Mei–Juni 2026.` : `📅 <b>Jadwal & Palaksanaan SE2026</b><br>SE2026 dilakukeun dina bulan Méi–Juni 2026.`;
      break;
    case 'cara':
      opening =
        currentLanguage === 'id' ? `✅ <b>Cara Berpartisipasi</b><br>Anda dapat menjawab petugas atau isi e-form online.` : `✅ <b>Kumaha cara ilubiung</b><br> Anjeun tiasa ngajawab patugas atawa eusian e-form online.`;
      break;
    case 'faq':
      opening = currentLanguage === 'id' ? `❓ <b>Pertanyaan Umum</b><br>Silakan pilih pertanyaan umum berikut:` : `❓ <b>Patarosan Umum</b><br>Mangga pilih patarosan di handap:`;
      break;
    case 'kontak':
      opening = currentLanguage === 'id' ? `📞 <b>Kontak Resmi BPS</b><br>Hubungi kami untuk informasi lebih lanjut.` : `📞 <b>Kontak Resmi BPS</b><br>Hubungi abdi kanggo inpormasi salajengna.`;
      break;
    case 'unduh':
      opening = currentLanguage === 'id' ? `📥 <b>Materi Sosialisasi SE2026</b><br>Silakan unduh materi berikut:` : `📥 <b>Materi Sosialisasi SE2026</b><br>Mangga unduh bahan di handap:`;
      break;
    default:
      opening = currentLanguage === 'id' ? 'Maaf, topik belum tersedia.' : 'Hapunten, topik tacan sayaga.';
  }

  displayHTMLBotMessage(opening, () => {
    displayBotMessage(langData[currentLanguage].submenuLabel, () => {
      const wrapper = document.createElement('div');
      wrapper.className = 'chat-message user-message';

      items.forEach((item) => {
        const button = document.createElement('button');
        button.innerText = item.label[currentLanguage];
        button.className = 'chat-button';
        button.onclick = () => displayBotMessage(item.text[currentLanguage]);
        wrapper.appendChild(button);
      });

      chatbox.appendChild(wrapper);
      chatbox.scrollTop = chatbox.scrollHeight;
    });
  });
}
