# TokoKita - Katalog Produk Web

Tugas 2 Praktikum Pemrograman Front-End (IF220). Implementasi antarmuka web berbasis HTML, CSS, dan JavaScript murni tanpa framework tambahan.

## Deskripsi

Proyek ini merupakan halaman katalog toko online (e-commerce) sederhana yang menampilkan daftar produk teknologi, filter kategori, keranjang belanja interaktif, form langganan diskon, serta fitur tema gelap/terang

## Struktur Proyek

```text
.
├── index.html     # Struktur halaman utama (HTML5 semantik)
├── styles.css     # Styling tampilan dan tema (CSS murni & responsif)
├── script.js      # Interaktivitas web (keranjang, filter, form validasi)
└── README.md      # Dokumentasi singkat proyek
```

## Komponen yang Diimplementasikan

1. **Header & Navigasi**: Menu navigasi sticky, toggle menu hamburger untuk mobile, serta tombol switch tema (dark mode).
2. **Hero Banner**: Banner promosi produk utama dengan tombol aksi (*call-to-action*).
3. **Katalog Produk**: Daftar kartu produk dengan sistem filter kategori (Semua, Audio, Wearable, Aksesoris).
4. **Keranjang Belanja**: Drawer samping interaktif untuk menambah, melihat, dan menghapus item serta menghitung total harga secara otomatis.
5. **Formulir Kontak / Promo**: Form dengan validasi input (nama dan email) langsung di sisi klien sebelum pengiriman data.
6. **Footer**: Informasi navigasi cepat, kategori, dan kontak resmi