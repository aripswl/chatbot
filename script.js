const urlParams = new URLSearchParams(window.location.search);
let currentLanguage = urlParams.get('bahasa') || 'id'; // ambil bahasa dari URL
let userName = urlParams.get('nama') || ''; // (bisa kosong kalau tidak digunakan)
let userAge = urlParams.get('umur') || '';

const chatbox = document.getElementById('chatbox');

const langData = {
  id: {
    getWelcome: () => `👋 Selamat datang saya <b>Semar</b>! Anda sedang menggunakan <b>Bahasa Indonesia</b>. Silakan ketik pertanyaan seputar Sensus Ekonomi 2026, saya siap membantu!`,
    prompt: 'Silakan ketik pertanyaan Anda!',
    end: 'Terima kasih telah menggunakan layanan Chatbot Semar. Jangan lupa dukung Sensus Ekonomi demi Indonesia yang lebih maju!',
  },
  su: {
    getWelcome: () => `👋 Wilujeng sumping, abdi <b>Semar</b>. Anjeun nuju ngagunakeun <b>basa Sunda</b>. Mangga, simkuring sayaga pikeun ngabantuan panjenengan ngetikkeun patarosan perkawis Sénsus Ékonomi 2026.`,
    prompt: 'Mangga ketik patarosan anjeun!',
    end: 'Hatur nuhun parantos nganggo Semar. Dugi ka pendakan deui!',
  },
};

const responses = [
  {
    keywords: ['apa itu sensus ekonomi', 'pengertian sensus ekonomi', 'sensus ekonomi online itu apa', 'tujuan sensus ekonomi', 'sensus ekonomi dilakukan oleh siapa'],
    keywords_su: ['naon ari sénsus ekonomi', 'sénsus ekonomi téh naon', 'tujuan tina sénsus ekonomi', 'saha nu ngalakukeun sénsus ekonomi', 'sénsus ekonomi online téh naon'],
    id: 'Sensus Ekonomi adalah kegiatan pendataan yang dilakukan oleh Badan Pusat Statistik (BPS) untuk mengumpulkan informasi seluruh kegiatan usaha ekonomi di Indonesia, kecuali sektor pertanian.',
    su: 'Sénsus Ékonomi nya éta kagiatan pendataan sakumna usaha ékonomi, iwal ti sektor pertanian, anu dilakukeun ku Badan Pusat Statistik (BPS) pikeun nyayagikeun data dasar perekonomian nasional.',
  },
  {
    keywords: ['jadwal', 'kapan sensus', 'kapan', 'waktu sensus', 'kapan sensus ekonomi', 'kapan sensus ', 'jadwal sensus'],
    keywords_su: ['jadwal', 'kapan sénsus', 'kapan', 'waktu sénsus', 'kapan sénsus ekonomi', 'kapan sénsus kapan', 'iraha sensus'],
    id: 'Sensus Ekonomi 2026 dilaksanakan bulan Mei–Juni 2026 di seluruh Indonesia.',
    su: 'Sénsus Ékonomi 2026 dilaksanakeun dina bulan Méi–Juni 2026 di sakuliah Indonésia.',
  },
  {
    keywords: ['dimana sensus ekonomi dilakukan', 'lokasi sensus ekonomi 2026', 'tempat pelaksanaan sensus ekonomi', 'sensus dilakukan di mana'],
    keywords_su: ['lokasi sénsus ekonomi', 'tempat dilakukeun sénsus ekonomi', 'sénsus dilakukeun di lokasi mana', 'dimana tempat sénsus'],

    id: 'Sensus dilakukan di tempat usaha masyarakat di seluruh wilayah Indonesia, baik di kota maupun desa.Petugas BPS akan mendatangi langsung atau bisa juga dilakukan secara online.',
    su: ' Sénsus dilaksanakeun di tempat usaha masarakat di sakuliah wewengkon Indonésia, boh di kota atanapi di désa.Petugas BPS bade sumping langsung ka lokasi usaha atanapi tiasa ogé ngalakukeun pendataan sacara online.',
  },
  {
    keywords: ['apakah data sensus aman', 'kerahasiaan data sensus ekonomi', 'keamanan data usaha sensus', 'apakah data dijamin rahasia'],
    keywords_su: ['data usaha aman teu', 'karusiahan data sénsus', 'data sénsus dijamin rahasia', 'kaamanan informasi usaha'],

    id: 'Ya, data Anda dijamin kerahasiaannya sesuai UU Statistik. Hanya digunakan untuk keperluan statistik dan tidak dipublikasikan per individu.',
    su: 'Leres, data anjeun dijamin karusiahanana nurutkeun kana UU Statistik. Ngan dipaké pikeun statistik jeung henteu dipublikasikeun perorangan.',
  },
  {
    keywords: ['apakah usaha mikro didata', 'usaha rumahan termasuk sensus', 'jenis usaha mikro yang dicatat', 'usaha kecil masuk sensus ekonomi'],
    keywords_su: ['usaha mikro asup kana sénsus', 'usaha leutik didata sénsus', 'usaha rumahan kacatet dina sénsus', 'usaha alit kaasup sénsus'],

    id: 'Ya, semua jenis usaha termasuk usaha mikro, kecil, dan rumahan akan didata dalam Sensus Ekonomi.',
    su: 'Leres, sagala rupa usaha kaasup usaha mikro, leutik, jeung usaha imah baris didata dina Sénsus Ékonomi.',
  },
  {
    keywords: ['siapa yang menjadi petugas sensus', 'petugas sensus ekonomi berasal dari mana', 'petugas sensus menggunakan apa', 'identitas petugas sensus ekonomi'],
    keywords_su: ['petugas sénsus ti mana asalna', 'saha petugas sénsus ekonomi', 'petugas nyekel naon', 'kumaha tandana petugas sénsus'],

    id: 'Sensus Ekonomi dilakukan oleh petugas resmi dari Badan Pusat Statistik (BPS) yang sudah dibekali identitas dan surat tugas.',
    su: 'Sénsus Ékonomi dilakukeun ku petugas resmi ti BPS anu geus boga identitas jeung surat tugas.',
  },
  {
    keywords: ['nomor call center bps tasikmalaya', 'cara menghubungi bps', 'kontak resmi sensus ekonomi', 'nomor telepon sensus ekonomi 2026'],
    keywords_su: ['nomer call center bps', 'hubungi bps tasikmalaya dimana', 'telepon sénsus ekonomi', 'kontak resmi ti bps'],

    id: 'Silakan hubungi Call Center BPS Tasikmalaya di (0265) XXX-XXX pada jam kerja.',
    su: 'Mangga hubungi Call Center BPS Tasikmalaya di (0265) XXX-XXX dina jam damel.',
  },
  {
    keywords: ['terima kasih', 'makasih', 'thanks', 'terima kasih banyak', 'terimakasih', 'makasi'],
    keywords_su: ['hatur nuhun', 'nuhun', 'nuhun pisan', 'hatur nuhun sadayana', 'terima kasih', 'makasih'],
    id: 'Sama-sama! Senang bisa membantu 😊',
    su: 'Sareng sami! Bungah tiasa ngabantosan 😊',
  },
  {
    keywords: ['data apa saja yang dikumpulkan', 'jenis informasi yang dicatat sensus', 'data usaha yang direkam sensus', 'informasi yang diminta dalam sensus'],
    keywords_su: ['data naon anu dikumpulkeun', 'informasi usaha naon anu dicatet', 'jenis data dina sénsus ekonomi', 'data usaha naon wae'],

    id: 'Data yang dikumpulkan mencakup nama usaha, lokasi, jenis usaha, jumlah pekerja, pendapatan, dan pengeluaran.',
    su: 'Data anu dikumpulkeun ngawengku ngaran usaha, lokasi, jinis usaha, jumlah pagawé, panghasilan jeung pengeluaran.',
  },
  {
    keywords: ['bagaimana jika saya tidak di rumah saat sensus', 'jika tidak ada orang saat sensus', 'bagaimana kalau rumah kosong saat sensus', 'tidak sempat mengisi sensus ekonomi'],
    keywords_su: ['kumaha lamun teu di bumi waktu sénsus', 'henteu aya di imah iraha sénsus', 'imah kosong waktu sénsus datang', 'teu tiasa ilubiung dina sénsus'],

    id: 'Petugas sensus akan menjadwalkan ulang kunjungan atau menghubungi Anda melalui kontak yang tersedia.',
    su: 'Petugas sensus bakal ngajadwalkeun deui kadatangan atawa ngahubungi anjeun liwat kontak nu sayogi.',
  },
  {
    keywords: ['bagaimana cara isi sensus online', 'mengisi e-form sensus ekonomi', 'cara akses form sensus online', 'sensus lewat internet'],
    keywords_su: ['kumaha ngisi eform sénsus', 'sénsus online di mana ngaksesna', 'ngeusian e-form tina internét', 'ngaliwatan digital sensus ekonomi'],

    id: 'Jika tersedia, pengisian Sensus Ekonomi juga bisa dilakukan secara online melalui e-form resmi dari BPS.',
    su: 'Lamun sayogi, ngeusian Sénsus Ékonomi ogé tiasa dilakukeun sacara online ngaliwatan e-form resmi ti BPS.',
  },
  {
    keywords: ['apa manfaat sensus ekonomi', 'tujuan utama sensus ekonomi', 'kenapa sensus ekonomi dilakukan', 'fungsi dari sensus ekonomi'],
    keywords_su: ['manpaat tina sénsus ekonomi', 'tujuan ngalakukeun sénsus ekonomi', 'gunana sénsus ekonomi pikeun nagara', 'pentingna sénsus ekonomi'],

    id: 'Sensus Ekonomi memberikan data penting untuk perencanaan pembangunan, kebijakan ekonomi, dan investasi daerah.',
    su: 'Sénsus Ékonomi masihan data penting pikeun perencanaan pembangunan, kawijakan ékonomi, jeung investasi daérah.',
  },
  {
    keywords: ['apa itu se2026', 'pengertian se2026 dalam sensus', 'se2026 itu kegiatan apa', 'se2026 dijelaskan secara singkat'],
    keywords_su: ['se2026 téh naon maksudna', 'hartina se2026 dina sénsus', 'penjelasan ringkes se2026', 'ngarti kana se2026 éta kumaha'],

    id: 'SE2026 adalah kegiatan pendataan lengkap seluruh unit usaha di Indonesia yang dilakukan oleh BPS setiap 10 tahun sekali.',
    su: 'SE2026 téh pendataan lengkep kana sakabéh unit usaha di Indonesia, dilakukeun ku BPS unggal 10 taun sakali.',
  },
  {
    keywords: ['jadwal uji coba sensus ekonomi', 'uji coba tahap satu se2026', 'se2026 uji coba kapan dimulai', 'tahapan uji coba sensus ekonomi'],
    keywords_su: ['uji coba tahap hiji se2026', 'jadwal tahapan se2026', 'uji coba sénsus iraha dimimitian', 'tahapan uji coba sensus ékonomi'],

    id: 'Uji coba SE2026 Tahap 1 dilaksanakan pada 1–31 Juli 2024, dan tahap 2 pada Oktober 2024.',
    su: 'Uji coba SE2026 Tahap 1 dilaksanakeun tanggal 1–31 Juli 2024, jeung tahap 2 dina bulan Oktober 2024.',
  },
  {
    keywords: ['apakah usaha informal masuk sensus', 'usaha tidak resmi akan didata', 'usaha kecil tanpa izin tetap disensus', 'usaha rumahan tanpa izin'],
    keywords_su: ['usaha teu resmi kaasup sensus', 'usaha informal didata dina sénsus', 'warung teu boga ijin kaasup sensus', 'usaha leutik tanpa legalitas'],

    id: 'Usaha informal seperti warung, bengkel rumahan, dan usaha tanpa izin resmi tetap didata dalam SE2026.',
    su: 'Usaha informal saperti warung, bengkel, jeung usaha nu teu boga ijin resmi tetep didata dina SE2026.',
  },
  {
    keywords: ['metode pengumpulan data sensus', 'cara pengisian sensus ekonomi', 'wawancara sensus dilakukan bagaimana', 'pendataan dilakukan dengan cara apa'],
    keywords_su: ['kumaha cara ngumpulkeun data sensus', 'metoda nu dipaké dina sénsus ekonomi', 'wawancara dina sensus dipigawé kumaha', 'ngumpulkeun data ku cara naon'],

    id: 'SE2026 menggunakan metode PAPI, CAPI, dan CAWI sesuai kondisi responden dan lokasi.',
    su: 'SE2026 maké metode PAPI, CAPI, jeung CAWI nurutkeun kaayaan jeung tempatna.',
  },
  {
    keywords: ['jenis formulir yang digunakan dalam se2026', 'dokumen yang dipakai untuk sensus ekonomi', 'tr1 sensus ekonomi 2026 digunakan untuk apa', 'formulir utama se2026'],
    keywords_su: ['formulir utama dina sénsus ekonomi 2026', 'dokumén sénsus nu dipaké petugas', 'tr1 se2026 dipaké keur naon', 'kertas sénsus anu dipaké'],

    id: 'Formulir utama dalam SE2026 adalah TR1.SE2026-P, TR1.SE2026-L, dan TR1.SE2026-PSLS.',
    su: 'Formulir utama dina SE2026 nyaeta TR1.SE2026-P, TR1.SE2026-L, jeung TR1.SE2026-PSLS.',
  },
  {
    keywords: ['peta apa yang digunakan sensus ekonomi', 'penggunaan peta wilayah dalam sensus', 'fungsi peta sls sensus', 'peta administratif digunakan untuk apa'],
    keywords_su: ['peta naon anu dipaké dina sénsus', 'peta wilayah dipaké dina sensus', 'petugas maké peta sls keur naon', 'peta administrasi keur ngumpulkeun data'],

    id: 'Petugas dibekali Peta Wilayah Administratif dan Peta SLS untuk mengenali wilayah kerja.',
    su: 'Petugas dibekelan Peta Wilayah jeung Peta SLS pikeun ngarti kana wilayah kerja.',
  },
  {
    keywords: ['apa itu aplikasi fasih mobile', 'fungsi fasih bps dalam sensus', 'aplikasi pengumpulan data sensus', 'penggunaan fasih mobile untuk sensus'],
    keywords_su: ['fasih mobile téh naon', 'aplikasi fasih pikeun petugas sensus', 'fasih bps dipaké keur naon', 'fasih mobile keur input data sensus'],

    id: 'FASIH-Mobile adalah aplikasi resmi BPS yang digunakan petugas untuk mengisi data secara digital.',
    su: 'FASIH-Mobile téh aplikasi resmi ti BPS pikeun ngeusian data sacara digital di lapangan.',
  },
  {
    keywords: ['pengisian mandiri untuk usaha besar', 'bagaimana pengusaha besar mengisi sensus', 'usaha besar isi lewat fasih web', 'peran usaha besar dalam se2026'],
    keywords_su: ['usaha ageung ngeusian sorangan', 'ngisi sensus pikeun usaha gedé', 'fasih web keur usaha badag', 'pengusaha gede kudu ngeusian sorangan'],

    id: 'Usaha besar diminta mengisi kuesioner secara mandiri melalui FASIH-Web sebelum dikunjungi petugas.',
    su: 'Usaha gedé dipenta ngeusian kuesioner sorangan liwat FASIH-Web saméméh didatangan petugas.',
  },
  {
    keywords: ['bagaimana pembaruan data usaha dilakukan', 'update data usaha sensus ekonomi', 'perubahan usaha dicatat sensus', 'pemutakhiran data lapangan oleh petugas'],
    keywords_su: ['ngapdet data usaha di lapangan', 'kumaha petugas ngarobah data usaha', 'ngapdet usaha ku petugas sensus', 'pembaruan usaha dilakukeun iraha'],

    id: 'Petugas akan memperbarui data usaha berdasarkan hasil temuan lapangan dan konfirmasi responden.',
    su: 'Petugas baris ngapdet data usaha dumasar hasil panemuan jeung konfirmasi ti responden.',
  },
  {
    keywords: ['apa tugas koseka dalam sensus', 'peran koordinator sensus kecamatan', 'koseka bps bertanggung jawab untuk apa', 'fungsi koseka di lapangan'],
    keywords_su: ['peran koseka dina sénsus', 'koseka tanggung jawabna naon', 'fungsi koordinator lapang sensus', 'tugas koseka di lapangan'],

    id: 'Koseka adalah koordinator sensus di tingkat kecamatan yang mengatur dan mengawasi petugas lapangan.',
    su: 'Koseka téh koordinator sensus tingkat kacamatan nu ngatur jeung ngawasi petugas lapangan.',
  },
  {
    keywords: ['peralatan yang dibawa petugas sensus', 'apa saja yang dibawa petugas lapangan', 'identitas dan perlengkapan petugas sensus', 'alat kerja petugas se2026'],
    keywords_su: ['alat anu dibawa petugas sensus', 'barang-barang petugas di lapangan', 'sarupaning alat keur sensus', 'identitas resmi petugas'],

    id: 'Petugas sensus membawa ID resmi, surat tugas, peta wilayah, kuesioner, dan HP dengan FASIH-Mobile.',
    su: 'Petugas mawa ID resmi, surat tugas, peta, kuesioner, jeung HP anu aya FASIH-Mobile.',
  },
  {
    keywords: ['bagaimana jika usaha belum tercatat', 'usaha saya belum masuk data sensus', 'usaha baru tapi belum terdaftar sensus', 'tidak ada di prelist sensus'],
    keywords_su: ['usaha can kacatet dina sensus', 'kumaha lamun usaha teu kadaptar', 'usaha anyar teu kapilih', 'usaha henteu asup kana prelist'],

    id: 'Jika ada usaha belum tercatat, petugas akan menambahkannya langsung di lapangan.',
    su: 'Lamun aya usaha nu can kadaptar, petugas baris nambahkeun langsung waktu di lapangan.',
  },
  {
    keywords: ['perbedaan metode papi dan capi', 'apa itu metode papi dalam sensus', 'capi digunakan dalam kondisi apa', 'papi dan capi sensus ekonomi'],
    keywords_su: ['bédana antara capi jeung papi', 'papi digunakeun dina kaayaan kumaha', 'papi jeung capi dina sensus', 'capi téh naon gunana'],

    id: 'PAPI menggunakan kertas, sedangkan CAPI menggunakan aplikasi digital untuk wawancara.',
    su: 'PAPI maké kertas, sedengkeun CAPI maké aplikasi digital waktu wawancara.',
  },
  {
    keywords: ['kapan hasil se2026 diumumkan', 'jadwal publikasi data sensus ekonomi', 'waktu rilis hasil sensus ekonomi 2026', 'hasil akhir se2026 dipublikasikan'],
    keywords_su: ['hasil sénsus diumumkeun iraha', 'kapann hasil sensus dipidangkeun', 'rilis data sensus ékonomi kapan', 'publikasi hasil se2026 kaping sabaraha'],

    id: 'Hasil akhir SE2026 akan diumumkan pada tahun 2028 setelah semua data dianalisis.',
    su: 'Hasil SE2026 baris diumumkeun taun 2028 sanggeus data réngsé dianalisis.',
  },
  {
    keywords: ['bagaimana jika saya menolak mengisi sensus', 'saya tidak ingin menjawab pertanyaan sensus', 'menolak berpartisipasi dalam se2026', 'responden tidak mau di data'],
    keywords_su: ['mun nolak ilubiung dina sensus', 'kumaha lamun teu hayang ngeusian', 'nolak didata ku petugas', 'responden teu hayang ngajawab'],

    id: 'SE2026 dilindungi oleh undang-undang. Responden sangat dianjurkan untuk memberikan jawaban yang jujur.',
    su: 'SE2026 dilindungan ku undang-undang. Responden pisan dianjurkeun ngajawab kalayan jujur.',
  },
  {
    keywords: ['apa peran bps dalam se2026', 'lembaga penyelenggara sensus ekonomi', 'siapa yang menyelenggarakan sensus', 'fungsi utama bps di se2026'],
    keywords_su: ['bps nu nyusun sénsus ekonomi', 'fungsi lembaga bps dina sensus', 'peran bps dina palaksanaan se2026', 'bps pelaksana sénsus nasional'],

    id: 'Sensus Ekonomi 2026 diselenggarakan oleh Badan Pusat Statistik (BPS) sebagai lembaga resmi negara.',
    su: 'Sénsus Ékonomi 2026 dilaksanakeun ku BPS salaku lembaga resmi nagara.',
  },
  {
    keywords: ['apakah petani didata dalam se2026', 'usaha pertanian masuk sensus ekonomi tidak', 'tani termasuk dalam sensus ekonomi atau tidak', 'sensus sektor pertanian dijelaskan'],
    keywords_su: ['pertanian kaasup kana sensus ekonomi', 'petani didata dina se2026 atanapi henteu', 'usahatani asup kana se2026 henteu', 'tatanén kadaptar dina se2026 atanapi henteu'],

    id: 'Sektor pertanian tidak termasuk dalam cakupan SE2026. Sektor ini didata melalui Sensus Pertanian.',
    su: 'Sektor pertanian henteu kaasup kana SE2026. Éta didata maké Sensus Pertanian.',
  },
  {
    keywords: ['usaha musiman seperti jualan lebaran apakah didata', 'usaha tidak tetap apakah masuk sensus', 'jualan pasar malam disensus juga kah', 'apakah usaha sementara dihitung dalam se2026'],
    keywords_su: ['usaha musiman didata dina sensus', 'usaha teu tetep diasupkeun kana se2026', 'jualan lebaran kaasup sénsus atanapi henteu', 'pasar wengi didata ku petugas'],

    id: 'Usaha musiman seperti jualan lebaran atau pasar malam tetap didata jika masih aktif saat sensus.',
    su: 'Usaha musiman saperti jualan lebaran atanapi pasar malam tetep didata lamun keur aktif waktu sensus.',
  },
  {
    keywords: ['bagaimana proses verifikasi data sensus', 'validasi data usaha oleh bps', 'pengecekan ulang data oleh petugas', 'verifikasi sebelum publikasi hasil sensus'],
    keywords_su: ['verifikasi data usaha sensus', 'validasi hasil sénsus ku petugas', 'ngacek deui data usaha', 'verifikasi jeung konfirmasi data se2026'],

    id: 'BPS melakukan verifikasi dan validasi data sebelum hasil akhir diumumkan.',
    su: 'BPS ngalakukeun verifikasi jeung validasi data saméméh hasil ahir diumumkeun.',
  },
  {
    keywords: ['berapa jumlah petugas sensus ekonomi', 'jumlah pencacah lapangan se2026', 'berapa banyak petugas diterjunkan', 'jumlah orang bps yang bertugas'],
    keywords_su: ['jumlah petugas sénsus ékonomi', 'sabaraha petugas turun ka lapangan', 'petugas sabaraha urang sakabéhna', 'jumlah petugas lapang se2026'],

    id: 'Jumlah petugas disesuaikan dengan banyaknya wilayah kerja dan jumlah usaha yang perlu dicacah.',
    su: 'Jumlah petugas disaluyukeun jeung loba-na wilayah jeung usaha anu kudu didata.',
  },
  {
    keywords: ['siapa yang menjadi target sensus ekonomi', 'usaha apa saja yang didata dalam se2026', 'sasaran utama sensus ekonomi 2026', 'target responden sensus ekonomi'],
    keywords_su: ['saha nu didata dina sénsus ékonomi', 'responden utama dina se2026', 'sasaran utama se2026 éta naon', 'anu kacatet dina sensus ékonomi'],

    id: 'Sasaran SE2026 adalah seluruh unit usaha non-pertanian yang aktif di Indonesia, baik formal maupun informal.',
    su: 'Sasaran SE2026 nyaéta sagala unit usaha lian ti pertanian nu aktif, boh formal boh informal.',
  },
  {
    keywords: ['manfaat hasil sensus bagi pemerintah', 'gunanya data sensus untuk negara', 'penggunaan data se2026 oleh pemerintah', 'apa manfaat se2026 untuk pemda'],
    keywords_su: ['manpaatna keur pamaréntah daerah', 'gunana data sensus keur nagara', 'data sénsus dipaké keur pamaréntahan', 'kauntungan data keur pamaréntah'],

    id: 'Data SE2026 membantu pemerintah dalam membuat kebijakan ekonomi, pengembangan UMKM, dan pemerataan pembangunan.',
    su: 'Data SE2026 mantuan pamaréntah nyieun kawijakan ékonomi, ngembangkeun UMKM, jeung nyetél pamekaran nu adil.',
  },
  {
    keywords: ['kapan sensus ekonomi dilakukan terakhir', 'tahun berapa sensus sebelumnya dilakukan', 'riwayat sensus ekonomi bps', 'kapan se2016 dilaksanakan'],
    keywords_su: ['se2016 dilaksanakeun taun sabaraha', 'riwayat sensus ékonomi ti bps', 'sénsus saméméhna iraha dilaksanakeun', 'kapungkur sensus ékonomi iraha'],

    id: 'Sensus Ekonomi sebelumnya dilakukan tahun 2016. Sensus ini dilakukan setiap 10 tahun sekali.',
    su: 'Sénsus Ekonomi saméméhna dilaksanakeun taun 2016. Ieu sénsus lumangsung unggal 10 taun.',
  },
  {
    keywords: ['untuk apa data sensus ekonomi digunakan', 'tujuan pengumpulan data se2026', 'fungsi data se2026 bagi pembangunan', 'pemanfaatan hasil se2026'],
    keywords_su: ['guna hasil sénsus keur nagara', 'data hasil se2026 dipaké keur naon', 'fungsi data sénsus dina pembangunan', 'manfaat data se2026 keur pamaréntah'],

    id: 'Data hasil SE2026 digunakan untuk perencanaan pembangunan ekonomi dan investasi oleh pemerintah pusat dan daerah.',
    su: 'Data hasil SE2026 dipaké pikeun perencanaan pamekaran ékonomi jeung investasi ku pamaréntah puseur jeung daerah.',
  },
  {
    keywords: ['apa beda se2026 dengan sensus pertanian', 'perbedaan se dan sp dalam bps', 'sensus ekonomi vs sensus pertanian', 'apa perbedaan dua jenis sensus'],
    keywords_su: ['béda se jeung sp di bps', 'sénsus ékonomi atawa tatanén', 'béda jenis sénsus dina bps', 'béda se2026 jeung sp2023'],

    id: 'SE adalah Sensus Ekonomi untuk usaha non-pertanian, sedangkan SP adalah Sensus Pertanian khusus sektor pertanian.',
    su: 'SE téh Sénsus Ékonomi keur usaha salian tatanén, ari SP téh Sénsus Pertanian pikeun sektor tatanén.',
  },
  {
    keywords: ['siapa yang menjadi responden se2026', 'responden sensus ekonomi 2026 itu siapa', 'responden usaha yang diwawancara', 'yang diwawancarai dalam sensus'],
    keywords_su: ['responden sénsus ékonomi téh saha', 'saha nu jadi responden se2026', 'anu diwawancara ku petugas sensus', 'responden usaha dina se2026'],

    id: 'Responden SE2026 adalah pemilik atau pengelola usaha yang berada di wilayah Indonesia.',
    su: 'Responden SE2026 nyaéta nu boga atawa nu ngatur usaha di sakuliah Indonésia.',
  },
  {
    keywords: ['apakah sensus diumumkan dulu ke masyarakat', 'bagaimana bps memberitahu sensus', 'pengumuman resmi se2026 ke pelaku usaha', 'informasi sensus dari bps'],
    keywords_su: ['béwara sénsus ku bps kumaha', 'sosialisasi sénsus ka masyarakat', 'pangaweruh sénsus ti petugas', 'info ti bps ngeunaan sensus'],

    id: 'Sebelum pelaksanaan SE2026, BPS melakukan sosialisasi kepada masyarakat dan pelaku usaha.',
    su: 'Saméméh palaksanaan SE2026, BPS ngalakukeun sosialisasi ka masarakat jeung nu boga usaha.',
  },
  {
    keywords: ['dasar hukum pelaksanaan se2026', 'undang-undang tentang statistik bps', 'peraturan tentang sensus ekonomi 2026', 'uu statistik yang digunakan se2026'],
    keywords_su: ['aturan hukum ngeunaan sénsus', 'payung hukum se2026 di bps', 'uu statistik keur palaksanaan sensus', 'peraturan resmi ngeunaan se2026'],

    id: 'SE2026 dilaksanakan berdasarkan Undang-Undang Nomor 16 Tahun 1997 tentang Statistik.',
    su: 'SE2026 dilaksanakeun dumasar kana Undang-Undang Nomor 16 Taun 1997 ngeunaan Statistik.',
  },
  {
    keywords: ['dokumen apa saja dibawa petugas sensus', 'formulir yang diisi dalam sensus ekonomi', 'berkas sensus yang digunakan bps', 'dokumen utama dalam se2026'],
    keywords_su: ['formulir sénsus ékonomi anu dianggo', 'dokumén utama dina se2026', 'berkas nu dibawa petugas sensus', 'kuesioner sénsus ekonomi ti bps'],

    id: 'Petugas membawa dokumen seperti kuesioner, peta kerja, dan perangkat pengumpulan data.',
    su: 'Petugas mawa dokumén kawas kuesioner, peta kerja, jeung alat keur ngumpulkeun data.',
  },
  {
    keywords: ['bagaimana jika responden memberikan informasi palsu', 'apa yang terjadi jika jawaban tidak sesuai', 'konsekuensi dari jawaban bohong saat sensus', 'apa boleh mengisi data yang tidak benar'],
    keywords_su: ['jawaban teu leres waktu sénsus', 'data teu bener dina formulir sénsus', 'ngabohong ka petugas sensus', 'data bohong waktu di wawancara'],

    id: 'Diharapkan responden memberikan jawaban jujur dan benar agar data akurat dan bermanfaat.',
    su: 'Responden diharepkeun ngajawab jujur jeung leres supaya data akurat jeung manfaatna kacumponan.',
  },
  {
    keywords: ['bagaimana cara melaporkan petugas yang mencurigakan', 'petugas bps minta uang apakah bisa dilaporkan', 'verifikasi petugas sensus bps resmi', 'cara memastikan petugas benar dari bps'],
    keywords_su: ['lapor petugas curiga ka kantor bps', 'petugas curiga dina sénsus ékonomi', 'verifikasi petugas resmi ti bps', 'penipuan sensus ku petugas gadungan'],

    id: 'Jika menemukan petugas mencurigakan, laporkan ke kantor BPS terdekat atau hubungi call center.',
    su: 'Mun manggih petugas nu curiga, laporkeun ka kantor BPS pangcaketna atawa hubungi call center.',
  },
  {
    keywords: ['bagaimana jika pengusaha takut data bocor', 'apa data usaha bisa disalahgunakan bps', 'apakah privasi usaha terjaga oleh sensus', 'kekhawatiran pengusaha soal pendataan'],
    keywords_su: ['sieun data usaha bocor ka pihak luar', 'data usaha bisa dipaké ku pihak lain', 'privasi usaha dina sénsus ékonomi', 'usahawan sieun didata ku bps'],

    id: 'Semua data usaha dijamin kerahasiaannya dan hanya digunakan untuk keperluan statistik nasional.',
    su: 'Sagalana data usaha dijamin rahasia jeung ngan dipaké keur statistik nasional wungkul.',
  },
  {
    keywords: ['siapa yang wajib mengisi sensus ekonomi', 'apakah saya harus ikut sensus', 'bolehkah tidak menjawab pertanyaan sensus', 'kewajiban mengikuti se2026'],
    keywords_su: ['kudu partisipasi dina sensus ekonomi', 'wajib ngisi se2026 pikeun pengusaha', 'teu hayang ngajawab pertanyaan petugas', 'responden kudu ngiluan sensus'],

    id: 'Setiap pelaku usaha sangat dianjurkan untuk berpartisipasi dan memberikan jawaban yang benar.',
    su: 'Sakur nu boga usaha pisan dianjurkeun pikeun ngiluan jeung ngajawab leres.',
  },
  {
    keywords: ['bagaimana cara melihat hasil sensus ekonomi', 'apakah hasil se2026 bisa diakses online', 'hasil sensus diumumkan dimana', 'akses publik terhadap hasil se2026'],
    keywords_su: ['hasil sénsus bisa ditempo ku umum', 'nempo hasil se2026 sacara online', 'hasil sensus diumumkeun ka masyarakat', 'cara buka hasil sénsus ekonomi'],

    id: 'Hasil SE2026 dapat diakses melalui publikasi resmi BPS setelah diumumkan secara nasional.',
    su: 'Hasil SE2026 tiasa ditempo ngaliwatan publikasi resmi BPS sanggeus diumumkeun sacara nasional.',
  },
  {
    keywords: ['apakah sensus ekonomi gratis untuk responden', 'petugas bps boleh minta uang atau tidak', 'sensus dipungut biaya atau tidak', 'isi sensus ekonomi harus bayar?'],
    keywords_su: ['sénsus ékonomi gratis tanpa biaya', 'petugas ménta duit ka pengusaha', 'sénsus kudu mayar ku usaha', 'partisipasi dina sénsus dipungut waragad'],

    id: 'Pelaksanaan SE2026 tidak dipungut biaya. Petugas tidak diperbolehkan meminta uang kepada responden.',
    su: 'Palaksanaan SE2026 henteu dipungut biaya. Petugas henteu meunang narima atawa ménta duit ti responden.',
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
  const langKeywords = currentLanguage === 'su' ? 'keywords_su' : 'keywords';

  const input = document.getElementById('userInput');
  const message = input.value.trim();
  if (!message) return;

  displayUserMessage(message);
  input.value = '';

  const normalized = message.toLowerCase().replace(/[^\w\s]/g, '');
  const inputWords = normalized.split(/\s+/);

  let bestMatch = null;
  let highestScore = 0;
  let longestMatchedKeywordLength = 0;

  responses.forEach((r) => {
    let score = 0;
    let matchedKeywordLength = 0;

    (r[langKeywords] || []).forEach((keyword) => {
      const keywordWords = keyword.trim().toLowerCase().split(/\s+/);
      keywordWords.forEach((kw) => {
        inputWords.forEach((w) => {
          if (w === kw) {
            score += 2;
          } else if (w.includes(kw) || kw.includes(w)) {
            score += 1;
          }
        });
      });

      if (score >= highestScore) {
        if (score > highestScore || keyword.length > longestMatchedKeywordLength) {
          bestMatch = r;
          highestScore = score;
          longestMatchedKeywordLength = keyword.length;
        }
      }
    });
  });

  if (bestMatch && highestScore >= 3) {
    const response = bestMatch[currentLanguage] || bestMatch.id;
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
