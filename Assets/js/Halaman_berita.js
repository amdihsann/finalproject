const apiKey = '1ad688d26d524daf808566cf63fcae94'; // Ganti dengan API Key News API Anda
const query = 'kesehatan mental'; // Kata kunci untuk pencarian berita
const apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=id&sortBy=publishedAt&apiKey=${apiKey}`;

async function fetchBeritaKesehatanMental() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Gagal mengambil berita: ${response.status}`);
    }
    const data = await response.json();

    if (data.articles && data.articles.length > 0) {
      // Filter artikel yang relevan dengan kesehatan mental berdasarkan kata kunci tambahan
      const filteredArticles = data.articles.filter((article) => article.title.toLowerCase().includes('mental') || (article.description && article.description.toLowerCase().includes('mental')));

      if (filteredArticles.length > 0) {
        tampilkanBerita(filteredArticles);
      } else {
        tampilkanError('Tidak ada berita tentang kesehatan mental yang ditemukan.');
      }
    } else {
      tampilkanError('Tidak ada berita tentang kesehatan mental yang ditemukan.');
    }
  } catch (error) {
    console.error('Error:', error);
    tampilkanError('Terjadi kesalahan saat mengambil berita.');
  }
}

function tampilkanBerita(articles) {
  const newsSection = document.getElementById('news-section');
  newsSection.innerHTML = ''; // Kosongkan kontainer sebelum menampilkan berita baru

  articles.forEach((article) => {
    const newsItem = document.createElement('div');
    newsItem.classList.add('news-item');

    const imageUrl = article.urlToImage || 'https://via.placeholder.com/600x400?text=Gambar+Tidak+Tersedia';

    newsItem.innerHTML = `
      <img src="${imageUrl}" alt="Gambar Berita" class="news-image">
      <h3 class="news-title">${article.title}</h3>
      <p class="news-description">${article.description || 'Deskripsi tidak tersedia.'}</p>
      <a href="${article.url}" target="_blank" class="news-link">Baca selengkapnya</a>
    `;
    newsSection.appendChild(newsItem);
  });
}

function tampilkanError(message) {
  const newsSection = document.getElementById('news-section');
  newsSection.innerHTML = `<p>${message}</p>`;
}

// Jalankan fungsi untuk mengambil berita saat halaman dimuat
document.addEventListener('DOMContentLoaded', fetchBeritaKesehatanMental);

// Navbar Toggle
// Toggle class active
const navbarNav = document.querySelector(".navbar-nav");

// Pas hamburger-menu di klik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// Klik diluar sidebar buat hilangin nav
const hamburger = document.querySelector("#hamburger-menu");

document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});
