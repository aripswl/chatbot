// ✅ Multi-Bahasa Chatbot SiTatik Versi Lengkap

let currentLanguage = 'id';
let userName = '';
let userAge = '';
const urlParams = new URLSearchParams(window.location.search);
userName = urlParams.get('nama');
userAge = urlParams.get('umur');

// Objek data bahasa
const langData = {
  id: {
    welcome: `👋 Halo <span id="welcomeUserName"></span>! Selamat datang di Layanan Informasi Sensus Ekonomi 2026 Kabupaten Tasikmalaya.\nSaya SiTatik, siap membantu Anda!`,
    prompt: 'Silakan pilih menu di bawah!',
    submenuLabel: 'Pilihan lanjutan:',
    end: 'Terima kasih telah menggunakan layanan Chatbot SiTatik. Jangan lupa dukung Sensus Ekonomi demi Indonesia yang lebih maju!',
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
    welcome: `👋 Wilujeng sumping <span id="welcomeUserName"></span> di Layanan Sensus Ekonomi 2026 Kab. Tasikmalaya.\nAbdi SiTatik, siap ngabantosan anjeun!`,
    prompt: 'Mangga pilih ménu di handap!',
    submenuLabel: 'Pilihan tambahan:',
    end: 'Hatur nuhun parantos nganggo SiTatik. Dugi ka pendakan deui!',
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
    const nama = userName || 'Pengguna';
    const welcomeRaw = langData[currentLanguage].welcome;
    const welcomeWithName = welcomeRaw.replace('<span id="welcomeUserName"></span>', `<b>${nama}</b>`);
    displayHTMLBotMessage(welcomeWithName, () => {
      displayBotButtons();
    });
  }, 1000);
};

function displayBotMessage(message, callback) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = message;
  const cleaned = tempDiv.textContent || tempDiv.innerText || '';
  if (!cleaned.trim()) return;

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

function displayHTMLBotMessage(html, callback) {
  displayBotMessage(html, callback);
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
  wrapper.className = 'button-wrapper';
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

document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('userInput');
  const sendButton = document.querySelector('.text-input-area button');
  if (input && sendButton) {
    input.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleTextInput();
      }
    });
    sendButton.addEventListener('click', handleTextInput);
  }
});

function toggleMenu() {
  const menu = document.getElementById('menuDropdown');
  if (menu) {
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
  }
}

function changeLanguage(lang) {
  currentLanguage = lang;
  chatbox.innerHTML = '';
  const nama = userName || 'Pengguna';
  const welcomeRaw = langData[lang].welcome;
  const welcomeWithName = welcomeRaw.replace('<span id="welcomeUserName"></span>', `<b>${nama}</b>`);
  displayHTMLBotMessage(welcomeWithName, () => {
    displayBotButtons();
  });
  toggleMenu();
}

function endChat() {
  displayBotMessage(langData[currentLanguage].end);
  toggleMenu();
  document.getElementById('userInput').disabled = true;
  document.querySelector('.text-input-area button').disabled = true;
}

// Objek yang berisi data submenu untuk setiap opsi utama
const submenus = {
  apa: [
    { label: { id: 'Manfaat SE bagi pelaku usaha', su: 'Mangpaatna SE pikeun nu usaha' }, text: { id: 'Untuk kebijakan ekonomi', su: 'Pikeun kabijakan ékonomi' } },
    { label: { id: 'Siapa yang wajib didata?', su: 'Saha nu kudu didata?' }, text: { id: 'Wajib diikuti oleh semua pelaku usaha', su: 'Kudu diiluan ku sakumna nu usaha' } },
    { label: { id: 'Kapan terakhir SE dilakukan?', su: 'Iraha terakhir SE dilakukeun?' }, text: { id: 'SE terakhir: 2016', su: 'SE terakhir: 2016' } },
  ],
  jadwal: [
    {
      label: { id: 'Cara mengetahui petugas resmi', su: 'Kumaha nyaho petugas resmi' },
      text: { id: 'Petugas SE2026 bisa dicek melalui aplikasi resmi BPS atau website.', su: 'Petugas SE2026 tiasa dipariksa ngalangkungan aplikasi resmi BPS atanapi halaman wéb.' },
    },
    {
      label: { id: 'Protokol keamanan saat pendataan', su: 'Protokol kaamanan waktos pendataan' },
      text: { id: 'Petugas datang langsung atau kontak online sesuai jadwal yang disepakati.', su: 'Petugas sumping langsung atawa ngontak online saluyu jadwal nu geus disatujuan.' },
    },
    {
      label: { id: 'Apakah data saya aman?', su: 'Naha data abdi aman?' },
      text: {
        id: 'Data yang Anda berikan dijamin aman dan rahasia, hanya untuk keperluan statistik dan tidak akan dipublikasikan secara individu.',
        su: 'Data nu ku anjeun dipasihkeun dijamin aman jeung rahasia, ngan pikeun kaperluan statistik sarta moal dipublikasikeun sacara individu.',
      },
    },
  ],
  cara: [
    {
      label: { id: 'Lokasi posko SE di kecamatan', su: 'Lokasi posko SE di kacamatan' },
      text: {
        id: 'Posko Sensus Ekonomi biasanya tersedia di kantor BPS Kabupaten/Kota atau kantor kecamatan terdekat selama masa sensus.',
        su: 'Posko Sensus Ekonomi biasana sayogi di kantor BPS Kabupaten/Kota atawa kantor kecamatan caket dieu salami sensus.',
      },
    },
    {
      label: { id: 'Daftar pertanyaan yang ditanyakan', su: 'Daptar patarosan nu ditaroskeun' },
      text: {
        id: 'Pertanyaan mencakup identitas usaha, jenis kegiatan, jumlah tenaga kerja, pendapatan, pengeluaran, dll.',
        su: 'Patarosan ngawengku idéntitas usaha, jinis kagiatan, jumlah tanaga gawé, panghasilan, pengeluaran, jst.',
      },
    },
    {
      label: { id: 'Link e-form jika tersedia', su: 'Tautan e-form lamun aya' },
      text: { id: 'Jika tersedia, link e-form akan diumumkan melalui website resmi BPS atau media sosial.', su: 'Lamun aya, tautan e-form bakal diumumkeun ngalangkungan halaman wéb resmi BPS atawa média sosial.' },
    },
  ],
  faq: [
    {
      label: { id: 'Apakah saya wajib ikut SE?', su: 'Naha abdi kudu ilubiung SE?' },
      text: { id: 'Ya, partisipasi dalam Sensus Ekonomi adalah wajib dan diatur oleh undang-undang.', su: 'Leres, partisipasi dina Sensus Ekonomi wajib sareng diatur ku undang-undang.' },
    },
    {
      label: { id: 'Apakah ada hadiah?', su: 'Aya hadiahna?' },
      text: { id: 'Tidak. Sensus Ekonomi adalah kegiatan pendataan resmi pemerintah, bukan undian atau promosi.', su: 'Henteu. Sensus Ekonomi nyaéta kagiatan pendataan resmi pamaréntah, sanés undian atawa promosi.' },
    },
    {
      label: { id: 'Apakah data saya akan dipublikasikan?', su: 'Naha data abdi baris disebarkeun?' },
      text: {
        id: 'Data Anda dijamin kerahasiaannya dan hanya digunakan untuk keperluan statistik agregat, tidak dipublikasikan secara individu.',
        su: 'Data anjeun dijamin karusiahanana sarta ngan dipaké pikeun kaperluan statistik agregate, henteu dipublikasikeun sacara individu.',
      },
    },
  ],
  kontak: [
    { label: { id: 'Call Center BPS Tasikmalaya', su: 'Puseur Inpormasi BPS Tasikmalaya' }, text: { id: 'Telepon: (0265) XXX-XXX (Jam Kerja)', su: 'Telepon: (0265) XXX-XXX (Jam Damel)' } },
    { label: { id: 'Email', su: 'Surélék' }, text: { id: 'Email: bpsxxxx@bps.go.id (Ganti XXXX dengan kode BPS Tasikmalaya)', su: 'Surélék: bpsxxxx@bps.go.id (Ganti XXXX ku kode BPS Tasikmalaya)' } },
    { label: { id: 'Website', su: 'Situs Wéb' }, text: { id: 'Kunjungi website resmi kami: www.bps.go.id/tasikmalayakab', su: 'Angjangi halaman wéb resmi kami: www.bps.go.id/tasikmalayakab' } },
  ],
  unduh: [
    {
      label: { id: 'Brosur PDF', su: 'Brosur PDF' },
      text: { id: '<a href="#" target="_blank">📄 Klik untuk download brosur Sensus Ekonomi 2026.</a>', su: '<a href="#" target="_blank">📄 Klik pikeun ngunduh brosur Sensus Ekonomi 2026.</a>' },
    },
    {
      label: { id: 'Infografis Pelaku Usaha', su: 'Infografis Nu Usaha' },
      text: { id: '<a href="#" target="_blank">📊 Lihat infografis SE2026 untuk pelaku usaha.</a>', su: '<a href="#" target="_blank">📊 Tingali infografis SE2026 pikeun nu usaha.</a>' },
    },
    {
      label: { id: 'Video Sosialisasi SE2026', su: 'Pidéo Sosialisasi SE2026' },
      text: { id: '<a href="#" target="_blank">🎥 Tonton video sosialisasi Sensus Ekonomi 2026.</a>', su: '<a href="#" target="_blank">🎥 Lalajo pidéo sosialisasi Sensus Ekonomi 2026.</a>' },
    },
  ],
};

/**
 * Menanggapi pilihan menu atau submenu dari pengguna.
 * @param {string} option - Aksi yang dipilih (misal: 'apa', 'jadwal', dll.).
 */
function selectMenu(option) {
  const items = submenus[option];
  let openingMessage = '';

  // Logika untuk menentukan pesan pembuka berdasarkan pilihan menu
  switch (option) {
    case 'apa':
      openingMessage =
        currentLanguage === 'id'
          ? `📌 <b>Sensus Ekonomi (SE)</b><br>Merupakan pendataan menyeluruh terhadap seluruh pelaku usaha, baik formal maupun informal di seluruh Indonesia. Tujuannya adalah untuk mendapatkan data dasar ekonomi nasional.`
          : `📌 <b>Sénsus Ékonomi (SE)</b><br>Nyaéta pendataan sagemblengna pikeun sakabéh nu usaha, boh formal boh informal di sakuliah Indonésia. Tujuanana nyaéta pikeun meunangkeun data dasar ékonomi nasional.`;
      break;
    case 'jadwal':
      openingMessage =
        currentLanguage === 'id'
          ? `📅 <b>Jadwal & Pelaksanaan SE2026</b><br>Sensus Ekonomi 2026 direncanakan akan dilaksanakan pada bulan Mei–Juni 2026 secara serentak di seluruh Indonesia. Persiapan dimulai sejak tahun 2025.`
          : `📅 <b>Jadwal & Palaksanaan SE2026</b><br>Sénsus Ékonomi 2026 direncanakeun baris dilaksanakeun dina bulan Méi–Juni 2026 sacara serentak di sakuliah Indonésia. Persiapan dimimitian ti taun 2025.`;
      break;
    case 'cara':
      openingMessage =
        currentLanguage === 'id'
          ? `✅ <b>Cara Berpartisipasi</b><br>Anda dapat berpartisipasi dengan menerima kunjungan petugas sensus, menjawab pertanyaan dengan jujur, atau mengisi e-form online jika tersedia.`
          : `✅ <b>Kumaha cara ilubiung</b><br>Anjeun tiasa partisipasi ku cara narima kunjungan petugas sensus, ngajawab patarosan kalayan jujur, atawa ngeusian e-form online lamun sayogi.`;
      break;
    case 'faq':
      openingMessage =
        currentLanguage === 'id'
          ? `❓ <b>Pertanyaan Umum</b><br>Silakan pilih pertanyaan umum berikut untuk mendapatkan informasi lebih lanjut:`
          : `❓ <b>Patarosan Umum</b><br>Mangga pilih patarosan umum di handap ieu pikeun meunangkeun inpormasi salajengna:`;
      break;
    case 'kontak':
      openingMessage =
        currentLanguage === 'id'
          ? `📞 <b>Kontak Resmi BPS</b><br>Untuk informasi lebih lanjut, Anda dapat menghubungi kontak resmi BPS berikut:`
          : `📞 <b>Kontak Resmi BPS</b><br>Pikeun inpormasi salajengna, anjeun tiasa ngahubungi kontak resmi BPS ieu:`;
      break;
    case 'unduh':
      openingMessage =
        currentLanguage === 'id'
          ? `📥 <b>Materi Sosialisasi SE2026</b><br>Silakan unduh materi berikut untuk informasi lebih lengkap:`
          : `📥 <b>Materi Sosialisasi SE2026</b><br>Mangga unduh materi ieu pikeun inpormasi nu langkung lengkep:`;
      break;
    default:
      openingMessage = currentLanguage === 'id' ? 'Maaf, topik belum tersedia.' : 'Hapunten, topik tacan sayaga.';
  }

  // Tampilkan pesan pembuka
  displayHTMLBotMessage(openingMessage, () => {
    // Tampilkan label submenu, lalu tombol-tombol submenu
    displayBotMessage(langData[currentLanguage].submenuLabel, () => {
      const wrapper = document.createElement('div');
      wrapper.className = 'button-wrapper'; // Menggunakan gaya user-message untuk wrapper tombol submenu

      // Buat tombol untuk setiap item di submenu
      items.forEach((item) => {
        const button = document.createElement('button');
        button.innerText = item.label[currentLanguage];
        button.className = 'chat-button';
        // Saat tombol submenu diklik, tampilkan teks responsnya
        button.onclick = () => displayBotMessage(item.text[currentLanguage]);
        wrapper.appendChild(button);
      });

      chatbox.appendChild(wrapper);
      chatbox.scrollTop = chatbox.scrollHeight;
    });
  });
}
