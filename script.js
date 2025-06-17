// ✅ Sambutan awal saat halaman dibuka
window.onload = function () {
  const welcomeMessage = `👋 Halo! Selamat datang di Layanan Informasi Sensus Ekonomi 2026 Kabupaten Tasikmalaya.\nSaya SiTatik, siap membantu Anda!`;
  displayBotMessage(welcomeMessage);
};

const chatbox = document.getElementById('chatbox');

function displayBotMessage(message) {
  const msg = document.createElement('div');
  msg.className = 'chat-message';
  msg.innerText = message;
  chatbox.appendChild(msg);
  chatbox.scrollTop = chatbox.scrollHeight;
}

function displayHTMLBotMessage(html) {
  const msg = document.createElement('div');
  msg.className = 'chat-message';
  msg.innerHTML = html;
  chatbox.appendChild(msg);
  chatbox.scrollTop = chatbox.scrollHeight;
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
    displayBotMessage('Silakan pilih menu di bawah!');
    displayBotButtons();
  }, 300);

  input.value = '';
}

function displayBotButtons() {
  const wrapper = document.createElement('div');
  wrapper.className = 'chat-message user-message';

  const buttons = [
    { label: 'Apa itu Sensus Ekonomi', action: 'apa' },
    { label: 'Jadwal & Pelaksanaan', action: 'jadwal' },
    { label: 'Cara Berpartisipasi', action: 'cara' },
    { label: 'FAQ', action: 'faq' },
    { label: 'Kontak', action: 'kontak' },
    { label: 'Unduh Publikasi', action: 'unduh' },
  ];

  buttons.forEach((btn) => {
    const button = document.createElement('button');
    button.innerText = btn.label;
    button.className = 'chat-button';
    button.onclick = () => selectMenu(btn.action);
    wrapper.appendChild(button);
  });

  chatbox.appendChild(wrapper);
  chatbox.scrollTop = chatbox.scrollHeight;
}

// SUBMENU DATA
const submenus = {
  apa: [
    { label: 'Manfaat SE bagi pelaku usaha ', text: ' untuk kebijakan ekonomi' },
    { label: 'KeSiapa yang wajib didata? ', text: ' Wajib diikuti oleh semua pelaku usaha' },
    { label: 'Kapan terakhir SE dilakukan? ', text: ' SE terakhir: 2016' },
  ],
  jadwal: [
    { label: 'Cara mengetahui petugas resmi ', text: ' SE2026 dilaksanakan Mei–Juni 2026' },
    { label: 'Protokol keamanan saat pendataan ', text: 'Petugas datang langsung atau kontak online' },
    { label: 'Apakah data saya aman? ', text: 'Data dijamin aman dan rahasia' },
  ],
  cara: [
    { label: 'Lokasi posko SE di kecamatan ', text: '1. Menerima petugas sensus' },
    { label: 'Daftar pertanyaan yang ditanyakan ', text: '2. Menjawab pertanyaan dengan jujur' },
    { label: 'Link e-form jika tersedia ', text: 'Isi e-form online (jika tersedia)' },
  ],
  faq: [
    { label: 'Apakah saya wajib ikut SE? ', text: '• Ya, ini adalah program nasional.' },
    { label: 'Apakah ada hadiah? ', text: '• Tidak. Ini bukan undian.' },
    { label: 'Apakah data saya akan dipublikasikan? ', text: '• Data hanya untuk keperluan statistik.' },
  ],
  kontak: [
    { label: 'Call Center BPS Tasikmalaya', text: '• Telepon: (0265) XXX-XXX' },
    { label: 'Email', text: '• Email: bpsxxxx@bps.go.id' },
    { label: 'Website', text: '• www.bps.go.id' },
  ],
  unduh: [
    { label: 'Brosur PDF', text: '📄 Klik untuk download brosur.' },
    { label: 'Infografis Pelaku Usaha ', text: '📊 Lihat infografis SE2026.' },
    { label: 'Video Sosialisasi SE2026 ', text: '🎥 Tonton video sosialisasi.' },
  ],
};

function selectMenu(option) {
  const items = submenus[option];
  let opening = '';

  switch (option) {
    case 'apa':
      opening = `📌 <b>Sensus Ekonomi (SE)</b> Sensus Ekonomi (SE) adalah pendataan menyeluruh terhadap seluruh pelaku 
usaha, baik formal maupun informal di seluruh Indonesia. Tujuannya untuk 
mengetahui kondisi dan potensi ekonomi nasional secara lengkap. `;
      break;
    case 'jadwal':
      opening = `📅 <b>Jadwal & Pelaksanaan SE2026</b><br>SE2026 akan dilaksanakan pada bulan Mei–Juni 2026. Petugas sensus akan 
mendatangi pelaku usaha secara langsung atau menghubungi melalui online. `;
      break;
    case 'cara':
      opening = `✅ <b>Cara Berpartisipasi</b><br>Anda dapat berpartisipasi dengan menerima petugas sensus, menjawab pertanyaan 
dengan jujur, atau mengisi data melalui tautan online jika tersedia.`;
      break;
    case 'faq':
      opening = `❓ <b>Pertanyaan Umum</b><br>Silakan pilih pertanyaan umum berikut atau ketik langsung pertanyaan Anda. `;
      break;
    case 'kontak':
      opening = `📞 <b>Kontak Resmi BPS Kabupaten Tasikmalaya</b><br>Berikut kontak yang bisa Anda hubungi untuk info lebih lanjut: `;
      break;
    case 'unduh':
      opening = `📥 <b>Materi Sosialisasi SE2026</b><br>Silakan unduh materi sosialisasi SE2026 berikut: `;
      break;
    default:
      opening = 'Maaf, topik belum tersedia.';
  }

  displayHTMLBotMessage(opening);

  if (items) {
    // Tampilkan label "Pilihan lanjutan:"
    const label = document.createElement('div');
    label.className = 'chat-message';
    label.innerText = 'Pilihan lanjutan:';
    chatbox.appendChild(label);

    // Tampilkan tombol-tombol submenu
    const wrapper = document.createElement('div');
    wrapper.className = 'chat-message user-message';

    items.forEach((item) => {
      const button = document.createElement('button');
      button.innerText = item.label;
      button.className = 'chat-button';
      button.onclick = () => displayBotMessage(item.text);
      wrapper.appendChild(button);
    });
    chatbox.appendChild(wrapper);
    chatbox.scrollTop = chatbox.scrollHeight;
  }
}
