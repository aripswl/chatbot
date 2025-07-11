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
    keywords: ['sensus ekonomi', 'apa itu sensus', 'sensus ekonomi ', 'sensus ekonomi online', 'sensus ekonomi bps'],
    keywords_su: ['sénsus ekonomi', 'naon ari sénsus', 'sénsus ekonomi', 'naon sensus'],
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
    keywords: ['dimana sensus', 'tempat sensus'],
    keywords_su: ['dimana sensus', 'tempat senus'],
    id: 'Sensus dilakukan di tempat usaha masyarakat di seluruh wilayah Indonesia, baik di kota maupun desa.Petugas BPS akan mendatangi langsung atau bisa juga dilakukan secara online.',
    su: ' Sénsus dilaksanakeun di tempat usaha masarakat di sakuliah wewengkon Indonésia, boh di kota atanapi di désa.Petugas BPS bade sumping langsung ka lokasi usaha atanapi tiasa ogé ngalakukeun pendataan sacara online.',
  },
  {
    keywords: ['kerahasiaan', 'data aman', 'keamanan data', 'pengumpulan data aman', 'data aman rahasia', 'data aman disimpan'],
    keywords_su: ['kerahasiaan', 'data aman', 'keamanan data', 'pengumpulan data aman', 'data aman rahasia', 'data aman disimpan'],
    id: 'Ya, data Anda dijamin kerahasiaannya sesuai UU Statistik. Hanya digunakan untuk keperluan statistik dan tidak dipublikasikan per individu.',
    su: 'Leres, data anjeun dijamin karusiahanana nurutkeun kana UU Statistik. Ngan dipaké pikeun statistik jeung henteu dipublikasikeun perorangan.',
  },
  {
    keywords: ['usaha mikro', 'usaha kecil', 'usaha rumahan', 'jenis usaha mikro', 'usaha mikro rumahan', 'usaha mikro mikro'],
    keywords_su: ['usaha mikro', 'usaha kecil', 'usaha rumahan', 'jenis usaha mikro', 'usaha mikro rumahan', 'usaha mikro mikro'],
    id: 'Ya, semua jenis usaha termasuk usaha mikro, kecil, dan rumahan akan didata dalam Sensus Ekonomi.',
    su: 'Leres, sagala rupa usaha kaasup usaha mikro, leutik, jeung usaha imah baris didata dina Sénsus Ékonomi.',
  },
  {
    keywords: ['petugas sensus', 'siapa yang melakukan', 'petugas', 'petugas sensus ekonomi', 'petugas sensus kapan', 'petugas sensus online'],
    keywords_su: ['petugas sénsus', 'siapa yang melakukan', 'petugas', 'petugas sénsus ekonomi', 'petugas sénsus kapan', 'petugas sénsus online'],
    id: 'Sensus Ekonomi dilakukan oleh petugas resmi dari Badan Pusat Statistik (BPS) yang sudah dibekali identitas dan surat tugas.',
    su: 'Sénsus Ékonomi dilakukeun ku petugas resmi ti BPS anu geus boga identitas jeung surat tugas.',
  },
  {
    keywords: ['call center', 'hubungi', 'kontak yang dapat dihubungi', 'nomor bps', 'telepon sensus', 'hubungi bps'],
    keywords_su: ['call center', 'hubungi', 'kontak', 'nomor bps', 'telepon sénsus', 'hubungi bps', 'urang kudu ngahubungan kamana', 'ngahubungan'],
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
    keywords: ['data dikumpulkan', 'jenis data', 'data usaha', 'informasi apa saja', 'data apa dicatat', 'data dicatat sensus'],
    keywords_su: ['data dikumpulkeun', 'jenis data', 'data usaha', 'data naon wae', 'data dicatet', 'informasi sensus'],
    id: 'Data yang dikumpulkan mencakup nama usaha, lokasi, jenis usaha, jumlah pekerja, pendapatan, dan pengeluaran.',
    su: 'Data anu dikumpulkeun ngawengku ngaran usaha, lokasi, jinis usaha, jumlah pagawé, panghasilan jeung pengeluaran.',
  },
  {
    keywords: ['tidak di rumah', 'saya tidak di tempat', 'tidak ada orang', 'rumah kosong', 'tidak sempat sensus', 'tidak sempat isi'],
    keywords_su: ['henteu di imah', 'abdi teu aya', 'imah kosong', 'teu acan tiasa', 'leumpang', 'bisi euweuh di bumi'],
    id: 'Petugas sensus akan menjadwalkan ulang kunjungan atau menghubungi Anda melalui kontak yang tersedia.',
    su: 'Petugas sensus bakal ngajadwalkeun deui kadatangan atawa ngahubungi anjeun liwat kontak nu sayogi.',
  },
  {
    keywords: ['e-form', 'isi online', 'online', 'form sensus online', 'eform bps', 'sensus lewat internet'],
    keywords_su: ['e-form', 'ngeusian online', 'sénsus online', 'ngisi eform', 'ngaliwatan internet', 'ngisi digital'],
    id: 'Jika tersedia, pengisian Sensus Ekonomi juga bisa dilakukan secara online melalui e-form resmi dari BPS.',
    su: 'Lamun sayogi, ngeusian Sénsus Ékonomi ogé tiasa dilakukeun sacara online ngaliwatan e-form resmi ti BPS.',
  },
  {
    keywords: ['manfaat sensus', 'kenapa sensus', 'tujuan sensus', 'fungsi sensus', 'gunanya sensus', 'pentingnya sensus'],
    keywords_su: ['kauntungan sénsus', 'naon manfaat sénsus', 'tujuan sénsus', 'fungsi sénsus', 'pentingna sénsus', 'gunana sénsus'],
    id: 'Sensus Ekonomi memberikan data penting untuk perencanaan pembangunan, kebijakan ekonomi, dan investasi daerah.',
    su: 'Sénsus Ékonomi masihan data penting pikeun perencanaan pembangunan, kawijakan ékonomi, jeung investasi daérah.',
  },
  {
    keywords: ['apa itu se2026', 'pengertian se2026', 'kepanjangan se2026', 'se2026 dijelaskan', 'se2026 itu apa'],
    keywords_su: ['se2026', 'hartina se2026', 'penjelasan se2026', 'se2026 téh naon', 'ngarti se2026'],
    id: 'SE2026 adalah kegiatan pendataan lengkap seluruh unit usaha di Indonesia yang dilakukan oleh BPS setiap 10 tahun sekali.',
    su: 'SE2026 téh pendataan lengkep kana sakabéh unit usaha di Indonesia, dilakukeun ku BPS unggal 10 taun sakali.',
  },
  {
    keywords: ['uji coba tahap 1', 'jadwal uji coba', 'se2026 tahap 1', 'uji coba sensus', 'tahapan sensus'],
    keywords_su: ['uji coba tahap 1', 'jadwal uji coba', 'tahapan se2026', 'uji coba sensus', 'tahapan uji coba'],
    id: 'Uji coba SE2026 Tahap 1 dilaksanakan pada 1–31 Juli 2024, dan tahap 2 pada Oktober 2024.',
    su: 'Uji coba SE2026 Tahap 1 dilaksanakeun tanggal 1–31 Juli 2024, jeung tahap 2 dina bulan Oktober 2024.',
  },
  {
    keywords: ['usaha informal', 'usaha tidak resmi', 'usaha kecil non formal', 'warung tanpa izin', 'usaha rumahan tidak resmi'],
    keywords_su: ['usaha informal', 'usaha leutik teu resmi', 'warung teu aya ijin', 'usaha non formal', 'usaha henteu kadaptar'],
    id: 'Usaha informal seperti warung, bengkel rumahan, dan usaha tanpa izin resmi tetap didata dalam SE2026.',
    su: 'Usaha informal saperti warung, bengkel, jeung usaha nu teu boga ijin resmi tetep didata dina SE2026.',
  },
  {
    keywords: ['metode pendataan', 'cara wawancara sensus', 'cara pengisian sensus', 'pendataan dilakukan bagaimana', 'pendataan metode'],
    keywords_su: ['cara pendataan', 'kumaha ngumpulkeun data', 'wawancara sénsus', 'metoda sensus', 'ngumpulkeun data kumaha'],
    id: 'SE2026 menggunakan metode PAPI, CAPI, dan CAWI sesuai kondisi responden dan lokasi.',
    su: 'SE2026 maké metode PAPI, CAPI, jeung CAWI nurutkeun kaayaan jeung tempatna.',
  },
  {
    keywords: ['dokumen sensus', 'form sensus', 'formulir se2026', 'form yang digunakan', 'tr1 se2026'],
    keywords_su: ['dokumén sénsus', 'formulir sénsus', 'tr1 se2026', 'kertas sensus', 'form nu dipaké'],
    id: 'Formulir utama dalam SE2026 adalah TR1.SE2026-P, TR1.SE2026-L, dan TR1.SE2026-PSLS.',
    su: 'Formulir utama dina SE2026 nyaeta TR1.SE2026-P, TR1.SE2026-L, jeung TR1.SE2026-PSLS.',
  },
  {
    keywords: ['penggunaan peta', 'peta wilayah', 'peta sensus', 'peta sls', 'peta administratif'],
    keywords_su: ['ngagunakeun peta', 'peta wewengkon', 'peta sénsus', 'peta sls', 'peta administrasi'],
    id: 'Petugas dibekali Peta Wilayah Administratif dan Peta SLS untuk mengenali wilayah kerja.',
    su: 'Petugas dibekelan Peta Wilayah jeung Peta SLS pikeun ngarti kana wilayah kerja.',
  },
  {
    keywords: ['fasih mobile', 'aplikasi fasih', 'digital sensus', 'fasih bps', 'aplikasi pengumpulan data'],
    keywords_su: ['fasih-mobile', 'aplikasi fasih', 'apk bps', 'aplikasi digital sénsus', 'fasih aplikasi'],
    id: 'FASIH-Mobile adalah aplikasi resmi BPS yang digunakan petugas untuk mengisi data secara digital.',
    su: 'FASIH-Mobile téh aplikasi resmi ti BPS pikeun ngeusian data sacara digital di lapangan.',
  },
  {
    keywords: ['usaha besar', 'pengisian mandiri usaha besar', 'fasih web', 'usaha besar isi sendiri', 'pengusaha besar'],
    keywords_su: ['usaha ageung', 'ngisi sorangan usaha gedé', 'fasih-web', 'usaha gedé sorangan', 'usaha gede'],
    id: 'Usaha besar diminta mengisi kuesioner secara mandiri melalui FASIH-Web sebelum dikunjungi petugas.',
    su: 'Usaha gedé dipenta ngeusian kuesioner sorangan liwat FASIH-Web saméméh didatangan petugas.',
  },
  {
    keywords: ['pemutakhiran data', 'update usaha', 'data diperbarui', 'perubahan usaha', 'data baru'],
    keywords_su: ['ngapdet data', 'pembaruan usaha', 'ngarobah data', 'update informasi', 'ngapdet usaha'],
    id: 'Petugas akan memperbarui data usaha berdasarkan hasil temuan lapangan dan konfirmasi responden.',
    su: 'Petugas baris ngapdet data usaha dumasar hasil panemuan jeung konfirmasi ti responden.',
  },
  {
    keywords: ['tugas koseka', 'peran koordinator', 'koordinator sensus', 'koseka bps', 'fungsi koseka'],
    keywords_su: ['koseka', 'peran koseka', 'koordinator lapang', 'koordinator sensus', 'fungsi koseka'],
    id: 'Koseka adalah koordinator sensus di tingkat kecamatan yang mengatur dan mengawasi petugas lapangan.',
    su: 'Koseka téh koordinator sensus tingkat kacamatan nu ngatur jeung ngawasi petugas lapangan.',
  },
  {
    keywords: ['alat kerja petugas', 'apa dibawa sensus', 'peralatan sensus', 'petugas bawa apa', 'identitas petugas'],
    keywords_su: ['alat kerja', 'barang petugas', 'nu dibawa petugas', 'sarupaning alat sensus', 'id petugas'],
    id: 'Petugas sensus membawa ID resmi, surat tugas, peta wilayah, kuesioner, dan HP dengan FASIH-Mobile.',
    su: 'Petugas mawa ID resmi, surat tugas, peta, kuesioner, jeung HP anu aya FASIH-Mobile.',
  },
  {
    keywords: ['usaha tidak terdaftar', 'tidak di prelist', 'tidak tercatat', 'usaha baru', 'usaha belum masuk data'],
    keywords_su: ['usaha teu kadaptar', 'usaha can kacatet', 'usaha anyar', 'usaha teu ka prelist', 'usaha anyar'],
    id: 'Jika ada usaha belum tercatat, petugas akan menambahkannya langsung di lapangan.',
    su: 'Lamun aya usaha nu can kadaptar, petugas baris nambahkeun langsung waktu di lapangan.',
  },
  {
    keywords: ['papi vs capi', 'perbedaan capi dan papi', 'apa itu papi', 'apa itu capi', 'metode interview'],
    keywords_su: ['papi jeung capi', 'bédana capi jeung papi', 'papi éta naon', 'capi éta naon', 'cara wawancara'],
    id: 'PAPI menggunakan kertas, sedangkan CAPI menggunakan aplikasi digital untuk wawancara.',
    su: 'PAPI maké kertas, sedengkeun CAPI maké aplikasi digital waktu wawancara.',
  },
  {
    keywords: ['waktu publikasi hasil', 'hasil se2026 diumumkan', 'kapan hasil sensus', 'hasil diumumkan', 'rilis data sensus'],
    keywords_su: ['hasil sénsus iraha', 'kapann hasil diumumkeun', 'rilis hasil', 'hasil se2026 iraha', 'publikasi hasil sensus'],
    id: 'Hasil akhir SE2026 akan diumumkan pada tahun 2028 setelah semua data dianalisis.',
    su: 'Hasil SE2026 baris diumumkeun taun 2028 sanggeus data réngsé dianalisis.',
  },
  {
    keywords: ['kalau saya nolak isi', 'tidak mau jawab sensus', 'tidak ingin isi', 'menolak sensus', 'tidak menjawab'],
    keywords_su: ['mun nolak', 'teu hayang ngeusian', 'nolak sensus', 'teu ngajawab', 'moal ngeusian'],
    id: 'SE2026 dilindungi oleh undang-undang. Responden sangat dianjurkan untuk memberikan jawaban yang jujur.',
    su: 'SE2026 dilindungan ku undang-undang. Responden pisan dianjurkeun ngajawab kalayan jujur.',
  },
  {
    keywords: ['fungsi bps', 'siapa penyelenggara sensus', 'bps yang buat sensus', 'tugas bps', 'penyelenggara se2026'],
    keywords_su: ['fungsi bps', 'nu nyieun sénsus', 'bps nu nyusun', 'bps éta saha', 'bps pelaksana'],
    id: 'Sensus Ekonomi 2026 diselenggarakan oleh Badan Pusat Statistik (BPS) sebagai lembaga resmi negara.',
    su: 'Sénsus Ékonomi 2026 dilaksanakeun ku BPS salaku lembaga resmi nagara.',
  },
  {
    keywords: ['sektor pertanian sensus', 'pertanian didata gak', 'apakah tani didata', 'tani masuk sensus', 'petani termasuk'],
    keywords_su: ['tatanén asup sénsus', 'pertanian didata henteu', 'petani didata', 'usahatani didata', 'tatanén kaasup'],
    id: 'Sektor pertanian tidak termasuk dalam cakupan SE2026. Sektor ini didata melalui Sensus Pertanian.',
    su: 'Sektor pertanian henteu kaasup kana SE2026. Éta didata maké Sensus Pertanian.',
  },
  {
    keywords: ['usaha sementara', 'usaha musiman', 'usaha tidak tetap', 'jualan lebaran', 'pasar malam'],
    keywords_su: ['usaha samentawis', 'usaha musiman', 'usaha teu tetep', 'jualan lebaran', 'pasar wengi'],
    id: 'Usaha musiman seperti jualan lebaran atau pasar malam tetap didata jika masih aktif saat sensus.',
    su: 'Usaha musiman saperti jualan lebaran atanapi pasar malam tetep didata lamun keur aktif waktu sensus.',
  },
  {
    keywords: ['verifikasi data sensus', 'cek ulang usaha', 'validasi data', 'verifikasi sensus', 'periksa ulang'],
    keywords_su: ['verifikasi data', 'validasi data usaha', 'ngacek deui', 'verifikasi sénsus', 'data dipariksa'],
    id: 'BPS melakukan verifikasi dan validasi data sebelum hasil akhir diumumkan.',
    su: 'BPS ngalakukeun verifikasi jeung validasi data saméméh hasil ahir diumumkeun.',
  },
  {
    keywords: ['jumlah petugas', 'berapa petugas sensus', 'jumlah orang bps', 'jumlah pencacah', 'berapa banyak petugas'],
    keywords_su: ['jumlah petugas', 'sabaraha petugas sénsus', 'petugas sabaraha urang', 'jumlah petugas lapang', 'petugas sabaraha'],
    id: 'Jumlah petugas disesuaikan dengan banyaknya wilayah kerja dan jumlah usaha yang perlu dicacah.',
    su: 'Jumlah petugas disaluyukeun jeung loba-na wilayah jeung usaha anu kudu didata.',
  },
  {
    keywords: ['sasaran sensus', 'siapa yang didata', 'target responden', 'sasaran se2026', 'yang didata'],
    keywords_su: ['sasaranna sénsus', 'saha nu didata', 'responden se2026', 'anu kacatet', 'sasaran pendataan'],
    id: 'Sasaran SE2026 adalah seluruh unit usaha non-pertanian yang aktif di Indonesia, baik formal maupun informal.',
    su: 'Sasaran SE2026 nyaéta sagala unit usaha lian ti pertanian nu aktif, boh formal boh informal.',
  },
  {
    keywords: ['apa manfaat buat pemerintah', 'sensus untuk pemerintah', 'guna sensus untuk negara', 'manfaat untuk pemerintah', 'data untuk pemerintah'],
    keywords_su: ['kauntungan keur pamaréntah', 'gunana keur pamaréntah', 'sénsus pikeun pamaréntah', 'data keur nagara', 'manpaatna keur nagara'],
    id: 'Data SE2026 membantu pemerintah dalam membuat kebijakan ekonomi, pengembangan UMKM, dan pemerataan pembangunan.',
    su: 'Data SE2026 mantuan pamaréntah nyieun kawijakan ékonomi, ngembangkeun UMKM, jeung nyetél pamekaran nu adil.',
  },
  {
    keywords: ['sensus sebelumnya', 'riwayat sensus', 'se2016', 'sensus dulu kapan', 'se sebelumnya'],
    keywords_su: ['sénsus saacanna', 'se2016', 'riwayat sénsus', 'kapungkur iraha', 'sénsus kapungkur'],
    id: 'Sensus Ekonomi sebelumnya dilakukan tahun 2016. Sensus ini dilakukan setiap 10 tahun sekali.',
    su: 'Sénsus Ekonomi saméméhna dilaksanakeun taun 2016. Ieu sénsus lumangsung unggal 10 taun.',
  },
  {
    keywords: ['hasil sensus digunakan untuk apa', 'data dipakai untuk apa', 'tujuan data sensus', 'fungsi data se2026', 'penggunaan data se2026'],
    keywords_su: ['data dipaké pikeun naon', 'hasil sénsus dipaké keur naon', 'fungsi data se2026', 'manfaat data se2026', 'guna hasil sénsus'],
    id: 'Data hasil SE2026 digunakan untuk perencanaan pembangunan ekonomi dan investasi oleh pemerintah pusat dan daerah.',
    su: 'Data hasil SE2026 dipaké pikeun perencanaan pamekaran ékonomi jeung investasi ku pamaréntah puseur jeung daerah.',
  },
  {
    keywords: ['apa bedanya se dengan sp', 'se vs sp', 'sensus ekonomi atau pertanian', 'beda sensus ekonomi dan pertanian', 'perbedaan se sp'],
    keywords_su: ['béda se jeung sp', 'sénsus ékonomi atawa tatanén', 'béda sénsus', 'béda se sp', 'béda jenis sénsus'],
    id: 'SE adalah Sensus Ekonomi untuk usaha non-pertanian, sedangkan SP adalah Sensus Pertanian khusus sektor pertanian.',
    su: 'SE téh Sénsus Ékonomi keur usaha salian tatanén, ari SP téh Sénsus Pertanian pikeun sektor tatanén.',
  },
  {
    keywords: ['responden sensus', 'siapa responden', 'responden se2026', 'yang jadi responden', 'responden usaha'],
    keywords_su: ['responden sénsus', 'saha nu jadi responden', 'responden usaha', 'anu diwawancara', 'responden se2026'],
    id: 'Responden SE2026 adalah pemilik atau pengelola usaha yang berada di wilayah Indonesia.',
    su: 'Responden SE2026 nyaéta nu boga atawa nu ngatur usaha di sakuliah Indonésia.',
  },
  {
    keywords: ['pemberitahuan sensus', 'info dari bps', 'pengumuman sensus', 'diberitahu sensus', 'sosialisasi sensus'],
    keywords_su: ['béwara sénsus', 'info ti bps', 'pangaweruh sénsus', 'diberitahukan sénsus', 'sosialisasi'],
    id: 'Sebelum pelaksanaan SE2026, BPS melakukan sosialisasi kepada masyarakat dan pelaku usaha.',
    su: 'Saméméh palaksanaan SE2026, BPS ngalakukeun sosialisasi ka masarakat jeung nu boga usaha.',
  },
  {
    keywords: ['aturan hukum sensus', 'uu statistik', 'payung hukum sensus', 'dasar hukum se2026', 'peraturan sensus'],
    keywords_su: ['aturan hukum sénsus', 'uu statistik', 'payung hukum', 'hukum se2026', 'peraturan sénsus'],
    id: 'SE2026 dilaksanakan berdasarkan Undang-Undang Nomor 16 Tahun 1997 tentang Statistik.',
    su: 'SE2026 dilaksanakeun dumasar kana Undang-Undang Nomor 16 Taun 1997 ngeunaan Statistik.',
  },
  {
    keywords: ['berkas sensus', 'formulir sensus', 'dokumen sensus ekonomi', 'apa yang diisi', 'dokumen yang dibawa'],
    keywords_su: ['berkas sénsus', 'formulir sénsus', 'dokumén se2026', 'anu diisi', 'dokumén sénsus ekonomi'],
    id: 'Petugas membawa dokumen seperti kuesioner, peta kerja, dan perangkat pengumpulan data.',
    su: 'Petugas mawa dokumén kawas kuesioner, peta kerja, jeung alat keur ngumpulkeun data.',
  },
  {
    keywords: ['informasi palsu', 'data tidak sesuai', 'jawaban salah', 'bohong saat sensus', 'tidak jujur isi'],
    keywords_su: ['jawaban salah', 'bohong di sénsus', 'jawaban teu leres', 'data teu bener', 'ngabohong'],
    id: 'Diharapkan responden memberikan jawaban jujur dan benar agar data akurat dan bermanfaat.',
    su: 'Responden diharepkeun ngajawab jujur jeung leres supaya data akurat jeung manfaatna kacumponan.',
  },
  {
    keywords: ['lapor petugas', 'petugas mencurigakan', 'verifikasi petugas', 'cek petugas', 'penipuan sensus'],
    keywords_su: ['lapor petugas', 'petugas curiga', 'verifikasi petugas', 'cek petugas sénsus', 'penipuan sénsus'],
    id: 'Jika menemukan petugas mencurigakan, laporkan ke kantor BPS terdekat atau hubungi call center.',
    su: 'Mun manggih petugas nu curiga, laporkeun ka kantor BPS pangcaketna atawa hubungi call center.',
  },
  {
    keywords: ['pengusaha takut data bocor', 'data usaha disalahgunakan', 'privasi usaha', 'rahasia usaha', 'usaha takut didata'],
    keywords_su: ['sieun data bocor', 'sieun data dipaké salah', 'privasi usaha', 'sieun didata', 'usaha sieun'],
    id: 'Semua data usaha dijamin kerahasiaannya dan hanya digunakan untuk keperluan statistik nasional.',
    su: 'Sagalana data usaha dijamin rahasia jeung ngan dipaké keur statistik nasional wungkul.',
  },
  {
    keywords: ['siapa yang wajib jawab sensus', 'saya harus isi?', 'wajib isi sensus', 'kewajiban sensus', 'boleh tidak ikut'],
    keywords_su: ['kudu ngajawab?', 'wajib ngisi?', 'kudu partisipasi', 'teu hayang jawab', 'kudu ngiluan?'],
    id: 'Setiap pelaku usaha sangat dianjurkan untuk berpartisipasi dan memberikan jawaban yang benar.',
    su: 'Sakur nu boga usaha pisan dianjurkeun pikeun ngiluan jeung ngajawab leres.',
  },
  {
    keywords: ['akses hasil sensus', 'buka hasil se2026', 'lihat hasil sensus', 'hasil bisa dilihat?', 'hasil sensus online'],
    keywords_su: ['hasil bisa ditempo', 'hasil se2026', 'nempo hasil sensus', 'akses hasil', 'buka hasil'],
    id: 'Hasil SE2026 dapat diakses melalui publikasi resmi BPS setelah diumumkan secara nasional.',
    su: 'Hasil SE2026 tiasa ditempo ngaliwatan publikasi resmi BPS sanggeus diumumkeun sacara nasional.',
  },
  {
    keywords: ['apakah sensus gratis', 'bayar isi sensus', 'apakah sensus dipungut biaya', 'sensus bayar?', 'petugas minta uang'],
    keywords_su: ['sénsus gratis', 'sénsus kudu mayar?', 'bayar sénsus?', 'petugas narima duit', 'petugas ménta'],
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
  // Gunakan keyword sesuai bahasa
  const langKeywords = currentLanguage === 'su' ? 'keywords_su' : 'keywords';

  const input = document.getElementById('userInput');
  const message = input.value.trim();
  if (!message) return;

  displayUserMessage(message);
  input.value = '';

  const normalized = message.toLowerCase().replace(/[^\w\s]/g, '');

  // Split kata input user
  const inputWords = normalized.split(/\s+/);

  // Cari kecocokan berdasarkan kata kunci fleksibel
  let bestMatch = null;
  let highestScore = 0;

  responses.forEach((r) => {
    let score = 0;
    (r[langKeywords] || []).forEach((keyword) => {
      const keywordWords = keyword.trim().toLowerCase().split(/\s+/);
      keywordWords.forEach((kw) => {
        inputWords.forEach((w) => {
          if (w.includes(kw) || kw.includes(w)) {
            score++;
          }
        });
      });
    });

    if (score > highestScore) {
      highestScore = score;
      bestMatch = r;
    }
  });

  if (bestMatch && highestScore >= 2) {
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
