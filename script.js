document.addEventListener('DOMContentLoaded', () => {
  let cartItems = [];

  // Helper format mata uang Rupiah
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number);
  };

  const toastContainer = document.getElementById('toastNotification');

  const showToast = (message, duration = 3000) => {
    const toast = document.createElement('div');
    toast.className = 'toast-item';
    toast.textContent = message;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  };

  const navToggle = document.getElementById('navToggle');
  const primaryNav = document.getElementById('primaryNav');

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = primaryNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Menutup menu saat tautan diklik pada layar kecil
    primaryNav.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        primaryNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Toggle Dark Mode
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = themeToggleBtn.querySelector('.theme-icon');

  // Cek preferensi tersimpan di LocalStorage
  const savedTheme = localStorage.getItem('tokokita_theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    if (themeIcon) themeIcon.textContent = '☀️';
  }

  themeToggleBtn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-theme');
    themeIcon.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('tokokita_theme', isDark ? 'dark' : 'light');
    showToast(isDark ? 'Mode Gelap diaktifkan' : 'Mode Terang diaktifkan');
  });

  // ------------------------------------------------------------------------
  // 4. KOMPONEN 3: FILTER KATEGORI PRODUK
  // ------------------------------------------------------------------------
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      // Perbarui kelas tombol aktif
      filterButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      // Filter kartu produk dengan transisi
      productCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  const cartBtn = document.getElementById('cartBtn');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const cartDrawer = document.getElementById('cartDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const cartBadge = document.getElementById('cartBadge');
  const cartItemList = document.getElementById('cartItemList');
  const cartTotalPrice = document.getElementById('cartTotalPrice');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const clearCartBtn = document.getElementById('clearCartBtn');

  // Buka & Tutup Drawer
  const openCart = () => {
    cartDrawer.classList.add('open');
    cartDrawer.setAttribute('aria-hidden', 'false');
    drawerOverlay.classList.add('active');
  };

  const closeCart = () => {
    cartDrawer.classList.remove('open');
    cartDrawer.setAttribute('aria-hidden', 'true');
    drawerOverlay.classList.remove('active');
  };

  cartBtn.addEventListener('click', openCart);
  closeCartBtn.addEventListener('click', closeCart);
  drawerOverlay.addEventListener('click', closeCart);

  // Perbarui UI Keranjang
  const updateCartUI = () => {
    // Hitung total item & total harga
    const totalCount = cartItems.length;
    cartBadge.textContent = totalCount;

    const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);
    cartTotalPrice.textContent = formatRupiah(totalAmount);

    // Render daftar item di drawer
    if (totalCount === 0) {
      cartItemList.innerHTML = '<p class="empty-cart-message">Keranjang belanja kamu masih kosong.</p>';
      checkoutBtn.disabled = true;
    } else {
      cartItemList.innerHTML = '';
      cartItems.forEach((item, index) => {
        const row = document.createElement('div');
        row.className = 'cart-item-row';
        row.innerHTML = `
          <div class="cart-item-info">
            <h3 class="cart-item-title">${item.name}</h3>
            <span>${formatRupiah(item.price)}</span>
          </div>
          <button class="cart-item-remove" data-index="${index}" aria-label="Hapus ${item.name}">Hapus</button>
        `;
        cartItemList.appendChild(row);
      });
      checkoutBtn.disabled = false;
    }
  };

  // Delegasi Event Hapus Item
  cartItemList.addEventListener('click', (e) => {
    if (e.target.classList.contains('cart-item-remove')) {
      const indexToRemove = parseInt(e.target.getAttribute('data-index'), 10);
      const removedItem = cartItems.splice(indexToRemove, 1)[0];
      updateCartUI();
      showToast(`Dihapus: ${removedItem.name}`);
    }
  });

  // Tombol Tambah ke Keranjang
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  addToCartButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-name');
      const price = parseFloat(btn.getAttribute('data-price'));

      cartItems.push({ name, price });
      updateCartUI();
      showToast(`Berhasil ditambahkan: ${name}`);

      // Animasi feedback tombol
      btn.textContent = '✓ Ditambahkan';
      btn.style.backgroundColor = 'var(--color-success)';
      btn.style.color = '#fff';
      setTimeout(() => {
        btn.textContent = '+ Keranjang';
        btn.style.backgroundColor = '';
        btn.style.color = '';
      }, 1000);
    });
  });

  // Kosongkan keranjang
  clearCartBtn.addEventListener('click', () => {
    if (cartItems.length > 0) {
      cartItems = [];
      updateCartUI();
      showToast('Keranjang belanja dikosongkan.');
    }
  });

  // Checkout simulasi
  checkoutBtn.addEventListener('click', () => {
    alert(`Terima kasih! Pesanan Anda diproses sebesar ${cartTotalPrice.textContent}.`);
    cartItems = [];
    updateCartUI();
    closeCart();
  });

  const contactForm = document.getElementById('contactForm');
  const userNameInput = document.getElementById('userName');
  const userEmailInput = document.getElementById('userEmail');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const formSuccess = document.getElementById('formSuccess');

  // Validasi format email dengan RegEx standar
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateName = () => {
    const val = userNameInput.value.trim();
    if (!val) {
      nameError.textContent = 'Nama lengkap wajib diisi.';
      userNameInput.classList.add('invalid');
      return false;
    }
    if (val.length < 3) {
      nameError.textContent = 'Nama minimal harus terdiri dari 3 karakter.';
      userNameInput.classList.add('invalid');
      return false;
    }
    nameError.textContent = '';
    userNameInput.classList.remove('invalid');
    return true;
  };

  const validateEmail = () => {
    const val = userEmailInput.value.trim();
    if (!val) {
      emailError.textContent = 'Alamat email wajib diisi.';
      userEmailInput.classList.add('invalid');
      return false;
    }
    if (!isValidEmail(val)) {
      emailError.textContent = 'Format alamat email tidak valid (contoh: user@mail.com).';
      userEmailInput.classList.add('invalid');
      return false;
    }
    emailError.textContent = '';
    userEmailInput.classList.remove('invalid');
    return true;
  };

  // Real-time listener saat input diketik
  userNameInput.addEventListener('input', validateName);
  userEmailInput.addEventListener('input', validateEmail);

  // Submit Handler
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();

    if (isNameValid && isEmailValid) {
      // Sukses
      formSuccess.hidden = false;
      showToast('🎉 Voucher berhasil diklaim!');
      contactForm.reset();

      setTimeout(() => {
        formSuccess.hidden = true;
      }, 5000);
    } else {
      showToast('⚠️ Silakan periksa kembali isian formulir.');
    }
  });

  // Tombol Hero CTA: Klaim Voucher
  const promoInfoBtn = document.getElementById('promoInfoBtn');
  if (promoInfoBtn) {
    promoInfoBtn.addEventListener('click', () => {
      const contactSection = document.getElementById('kontak');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        userNameInput.focus();
      }
    });
  }
});
