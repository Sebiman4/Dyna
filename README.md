# 🎮 Dyna - Steam Game Finder

Sebuah aplikasi web modern untuk mencari dan menemukan game favorit Anda di Steam! Dibangun dengan Next.js 16 dan Tailwind CSS untuk pengalaman pengguna yang smooth dan menarik.

## ✨ Fitur

- 🔍 **Pencarian Game** - Cari game Steam dengan mudah dan cepat
- 📱 **Responsive Design** - Tampilan yang optimal di semua perangkat
- 🎨 **UI Modern** - Desain yang clean dengan animasi smooth
- 🖼️ **Detail Lengkap** - Lihat informasi game, screenshot, harga, developer, dan banyak lagi
- ⚡ **Fast Loading** - Dioptimasi untuk performa terbaik
- 🌙 **Dark Theme** - Tampilan dark yang nyaman untuk mata

## 🚀 Cara Menjalankan

### 1. Clone Repository
```bash
git clone https://github.com/Sebiman4/Dyna.git
cd Dyna
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Buat file `.env.local` di root folder dan tambahkan API key (opsional):
```bash
NEXT_PUBLIC_RAWG_API_KEY=your_api_key_here
```

### 4. Jalankan Development Server
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda dan mulai menjelajah!

## 🛠️ Teknologi yang Digunakan

- **[Next.js 16](https://nextjs.org)** - React framework dengan Turbopack
- **[TypeScript](https://www.typescriptlang.org)** - JavaScript dengan type safety
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[Steam API](https://steamcommunity.com/dev)** - Data game dari Steam

## 📁 Struktur Folder

```
Dyna/
├── app/
│   ├── api/              # API routes
│   │   ├── game/         # Detail game endpoint
│   │   └── search/       # Search game endpoint
│   ├── game/
│   │   └── [appid]/      # Halaman detail game
│   ├── page.tsx          # Halaman utama
│   ├── layout.tsx        # Layout aplikasi
│   └── globals.css       # Global styles
├── public/               # Static assets
├── package.json          # Dependencies
└── README.md             # Dokumentasi ini
```

## 🎯 Cara Menggunakan

1. **Cari Game** - Ketik nama game yang ingin Anda cari di search bar
2. **Tekan Enter atau Klik Search** - Aplikasi akan menampilkan hasil pencarian
3. **Lihat Detail** - Klik pada kartu game untuk melihat informasi lengkap
4. **Buka di Steam** - Klik tombol "View on Steam Store" untuk membuka halaman game di Steam

## 🐛 Troubleshooting

**Port sudah digunakan?**
```bash
npm run dev -- -p 3001  # Gunakan port lain
```

**Dependencies error?**
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📝 Build untuk Production

```bash
npm run build
npm run start
```

## 🤝 Kontribusi

Kontribusi selalu diterima! Silakan buat pull request atau buka issue untuk saran dan perbaikan.

## 📄 Lisensi

MIT License - Silakan digunakan untuk pembelajaran atau proyek pribadi!

---

**Dibuat dengan ❤️ menggunakan Next.js**
