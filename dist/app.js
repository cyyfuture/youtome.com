const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-nav');
const isKazakh = document.documentElement.lang === 'kk';
const isRussian = document.documentElement.lang === 'ru';
const isChinese = document.documentElement.lang.startsWith('zh');
const isSpanish = document.documentElement.lang === 'es';
const isArabic = document.documentElement.lang === 'ar';
const isFrench = document.documentElement.lang === 'fr';
const isTurkish = document.documentElement.lang === 'tr';
const isGerman = document.documentElement.lang === 'de';
const isPortuguese = document.documentElement.lang === 'pt';
const isUzbek = document.documentElement.lang === 'uz';
const isKorean = document.documentElement.lang === 'ko';
function koreanText(en) {
  if (en.startsWith('Prefab home enquiry — ')) return `조립식 주택 문의 — ${en.slice('Prefab home enquiry — '.length)}`;
  return {
    'Close menu':'메뉴 닫기',
    'Open menu':'메뉴 열기',
    'Copied. Save these details and send them when our contact channel is available.':'복사했습니다. 연락 채널이 준비되면 이 내용을 보내주세요.',
    'Copy unavailable in this browser. Please select and copy your details from the form.':'이 브라우저에서는 자동 복사가 불가능합니다. 입력한 내용을 직접 선택해 복사해 주세요.'
  }[en] || en;
}
const languageText = (kk, ru, zh, es, ar, fr, tr, de, pt, uz, en) => isKorean ? koreanText(en) : isKazakh ? kk : isRussian ? ru : isChinese ? zh : isSpanish ? es : isArabic ? ar : isFrench ? fr : isTurkish ? tr : isGerman ? de : isPortuguese ? pt : isUzbek ? uz : en;
if (menuButton && mobileMenu) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? languageText('Мәзірді жабу','Закрыть меню','关闭菜单','Cerrar menú','إغلاق القائمة','Fermer le menu','Menüyü kapat','Menü schließen','Fechar menu','Menyuni yopish','Close menu') : languageText('Мәзірді ашу','Открыть меню','打开菜单','Abrir menú','فتح القائمة','Ouvrir le menu','Menüyü aç','Menü öffnen','Abrir menu','Menyuni ochish','Open menu'));
    mobileMenu.hidden = !open;
    document.body.classList.toggle('menu-open', open);
  });
}

const filters = [...document.querySelectorAll('[data-filter]')];
const cards = [...document.querySelectorAll('[data-category]')];
function applyFilter(value) {
  filters.forEach(button => {
    const active = button.dataset.filter === value;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  cards.forEach(card => { card.hidden = value !== 'all' && card.dataset.category !== value; });
}
filters.forEach(button => button.addEventListener('click', () => applyFilter(button.dataset.filter)));
const initial = location.hash.slice(1);
if (filters.length && ['capsule','apple','expandable'].includes(initial)) applyFilter(initial);
window.addEventListener('hashchange', () => {
  const value = location.hash.slice(1);
  if (filters.length && ['capsule','apple','expandable'].includes(value)) applyFilter(value);
});

const quoteForm = document.getElementById('quote-form');
if (quoteForm) {
  const model = new URLSearchParams(location.search).get('model');
  if (model) {
    const select = quoteForm.elements.model;
    if (![...select.options].some(option => option.value === model)) select.add(new Option(model, model));
    select.value = model;
  }
  quoteForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!quoteForm.reportValidity()) return;
    const data = new FormData(quoteForm);
    const subject = languageText(`Құрама үй туралы сұрау — ${data.get('model') || 'Жаңа жоба'}`,`Запрос о сборном доме — ${data.get('model') || 'Новый проект'}`,`预制房屋项目咨询 — ${data.get('model') || '新项目'}`,`Consulta de vivienda prefabricada — ${data.get('model') || 'Nuevo proyecto'}`,`استفسار عن منزل مسبق الصنع — ${data.get('model') || 'مشروع جديد'}`,`Demande de maison préfabriquée — ${data.get('model') || 'Nouveau projet'}`,`Prefabrik ev talebi — ${data.get('model') || 'Yeni proje'}`,`Fertighaus-Anfrage — ${data.get('model') || 'Neues Projekt'}`,`Consulta sobre casa pré-fabricada — ${data.get('model') || 'Novo projeto'}`,`Yig‘ma uy bo‘yicha so‘rov — ${data.get('model') || 'Yangi loyiha'}`,`Prefab home enquiry — ${data.get('model') || 'New project'}`);
    const body = isKazakh
      ? `Аты: ${data.get('name')}\nЭлектрондық пошта: ${data.get('email')}\nЕл / өңір: ${data.get('country') || 'Көрсетілмеген'}\nҚызықтыратын өнім: ${data.get('model') || 'Әзірге білмеймін'}\n\nЖоба туралы:\n${data.get('message')}`
      : isRussian
      ? `Имя: ${data.get('name')}\nЭлектронная почта: ${data.get('email')}\nСтрана / регион: ${data.get('country') || 'Не указано'}\nИнтересующая модель: ${data.get('model') || 'Пока не знаю'}\n\nО проекте:\n${data.get('message')}`
      : isChinese
      ? `姓名：${data.get('name')}\n邮箱：${data.get('email')}\n国家 / 地区：${data.get('country') || '未填写'}\n意向产品：${data.get('model') || '暂未确定'}\n\n项目说明：\n${data.get('message')}`
      : isSpanish
      ? `Nombre: ${data.get('name')}\nCorreo: ${data.get('email')}\nPaís / región: ${data.get('country') || 'No indicado'}\nModelo de interés: ${data.get('model') || 'Aún no lo sé'}\n\nDetalles del proyecto:\n${data.get('message')}`
      : isArabic
      ? `الاسم: ${data.get('name')}\nالبريد الإلكتروني: ${data.get('email')}\nالبلد / المنطقة: ${data.get('country') || 'غير محدد'}\nالمنتج المطلوب: ${data.get('model') || 'لم أحدد بعد'}\n\nتفاصيل المشروع:\n${data.get('message')}`
      : isFrench
      ? `Nom : ${data.get('name')}\nE-mail : ${data.get('email')}\nPays / région : ${data.get('country') || 'Non indiqué'}\nModèle souhaité : ${data.get('model') || 'Pas encore décidé'}\n\nDétails du projet :\n${data.get('message')}`
      : isTurkish
      ? `Ad: ${data.get('name')}\nE-posta: ${data.get('email')}\nÜlke / bölge: ${data.get('country') || 'Belirtilmedi'}\nİlgilenilen model: ${data.get('model') || 'Henüz karar vermedim'}\n\nProje ayrıntıları:\n${data.get('message')}`
      : isGerman
      ? `Name: ${data.get('name')}\nE-Mail: ${data.get('email')}\nLand / Region: ${data.get('country') || 'Nicht angegeben'}\nInteresse an: ${data.get('model') || 'Noch nicht sicher'}\n\nProjektdetails:\n${data.get('message')}`
      : isPortuguese
      ? `Nome: ${data.get('name')}\nE-mail: ${data.get('email')}\nPaís / região: ${data.get('country') || 'Não informado'}\nModelo de interesse: ${data.get('model') || 'Ainda não sei'}\n\nDetalhes do projeto:\n${data.get('message')}`
      : isUzbek
      ? `Ism: ${data.get('name')}\nE-pochta: ${data.get('email')}\nMamlakat / hudud: ${data.get('country') || 'Ko‘rsatilmagan'}\nQiziqtirgan model: ${data.get('model') || 'Hali bilmayman'}\n\nLoyiha tafsilotlari:\n${data.get('message')}`
      : isKorean
      ? `이름: ${data.get('name')}\n이메일: ${data.get('email')}\n국가 / 지역: ${data.get('country') || '미입력'}\n관심 모델: ${data.get('model') || '미정'}\n\n프로젝트 내용:\n${data.get('message')}`
      : `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nCountry / region: ${data.get('country') || 'Not specified'}\nInterested in: ${data.get('model') || 'Not sure yet'}\n\nProject details:\n${data.get('message')}`;
    const text = subject + '\n\n' + body;
    navigator.clipboard.writeText(text).then(() => {
      const note = quoteForm.querySelector('.form-note');
      note.textContent = languageText('Көшірілді. Деректерді сақтап, байланыс арнасы ашылғанда бізге жіберіңіз.','Скопировано. Сохраните данные и отправьте их, когда появится контактный канал.','已复制。请保存需求，待联系渠道上线后发送给我们。','Copiado. Guarde los datos y envíelos cuando el canal de contacto esté disponible.','تم النسخ. احفظ التفاصيل وأرسلها إلينا عند توفر وسيلة التواصل.','Copié. Conservez ces informations et envoyez-les-nous lorsque nos coordonnées seront disponibles.','Kopyalandı. Bilgileri saklayın ve iletişim kanalımız açıldığında bize gönderin.','Kopiert. Speichern Sie die Angaben und senden Sie sie uns, sobald unsere Kontaktkanäle verfügbar sind.','Copiado. Guarde os dados e envie-os quando nosso canal de contato estiver disponível.','Nusxalandi. Ma’lumotlarni saqlang va aloqa kanali ishga tushgach bizga yuboring.','Copied. Save these details and send them when our contact channel is available.');
      note.setAttribute('role', 'status');
    }).catch(() => {
      const note = quoteForm.querySelector('.form-note');
      note.textContent = languageText('Бұл браузерде көшіру мүмкін болмады. Деректерді пішіннен қолмен көшіріңіз.','Не удалось скопировать. Выделите и скопируйте данные из формы вручную.','此浏览器无法自动复制，请手动选取表单内容。','No se pudo copiar. Seleccione y copie los datos del formulario manualmente.','تعذر النسخ تلقائيًا. يرجى تحديد تفاصيلك ونسخها من النموذج.','La copie a échoué. Sélectionnez et copiez les informations du formulaire manuellement.','Bu tarayıcıda kopyalanamadı. Bilgileri formdan elle seçip kopyalayın.','Kopieren nicht möglich. Bitte markieren und kopieren Sie die Angaben aus dem Formular.','Não foi possível copiar. Selecione e copie os dados do formulário manualmente.','Bu brauzerda nusxalab bo‘lmadi. Ma’lumotlarni formadan qo‘lda nusxalang.','Copy unavailable in this browser. Please select and copy your details from the form.');
      note.setAttribute('role', 'status');
    });
  });
}
