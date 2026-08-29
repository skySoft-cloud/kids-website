(function() {
  var SCROLL_THRESHOLD = 300;

  function detectSections() {
    var links = [];

    var subNavAnchors = document.querySelectorAll('.sub-nav a[href^="#"]');
    if (subNavAnchors.length > 0) {
      subNavAnchors.forEach(function(a) {
        var href = a.getAttribute('href');
        var id = href.slice(1);
        var target = document.getElementById(id);
        var label = a.textContent.trim();
        var num = '';
        if (target) {
          var numEl = target.querySelector('.section-title .num, .num');
          if (numEl) num = numEl.textContent.trim();
        }
        links.push({ href: href, label: label, num: num, type: 'anchor' });
      });
    } else {
      var sections = document.querySelectorAll('section.section, section[id]');
      sections.forEach(function(sec, i) {
        if (!sec.id) {
          sec.id = 'fab-sec-' + (i + 1);
        }
        var titleEl = sec.querySelector('.section-title, h2');
        var label = '';
        var num = '';
        if (titleEl) {
          var numEl = titleEl.querySelector('.num');
          if (numEl) num = numEl.textContent.trim();
          label = titleEl.textContent.replace(/^[\d\.]+/, '').trim();
        }
        if (!label) label = '章节 ' + (i + 1);
        links.push({ href: '#' + sec.id, label: label, num: num, type: 'section' });
      });
    }

    var crossPageLinks = [];
    var subNavCross = document.querySelectorAll('.sub-nav a:not([href^="#"])');
    subNavCross.forEach(function(a) {
      var href = a.getAttribute('href');
      var label = a.textContent.trim();
      if (href && !href.endsWith('.html') || href && href.indexOf('.html') >= 0) {
        if (a.classList.contains('active')) return;
        crossPageLinks.push({ href: href, label: label, num: '', type: 'page' });
      }
    });

    return { sections: links, pages: crossPageLinks };
  }

  function inject() {
    var fab = document.createElement('button');
    fab.className = 'fab-nav';
    fab.setAttribute('aria-label', '快捷导航');
    fab.innerHTML = '<svg viewBox="0 0 24 24"><path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/></svg>';
    document.body.appendChild(fab);

    var overlay = document.createElement('div');
    overlay.className = 'fab-overlay';
    document.body.appendChild(overlay);

    var sheet = document.createElement('div');
    sheet.className = 'fab-sheet';
    var html = '<div class="fab-sheet-handle"></div>';
    html += '<div class="fab-sheet-title">快速跳转</div>';
    html += '<div class="fab-sheet-list">';
    html += '<a href="#top" class="fab-sheet-item fab-sheet-top"><span class="fab-num"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 4l-8 8h5v8h6v-8h5z"/></svg></span><span class="fab-label">回到顶部</span></a>';

    var detected = detectSections();
    detected.sections.forEach(function(s) {
      html += '<a href="' + s.href + '" class="fab-sheet-item">';
      if (s.num) {
        html += '<span class="fab-num">' + s.num + '</span>';
      } else {
        html += '<span class="fab-num">·</span>';
      }
      html += '<span class="fab-label">' + s.label + '</span>';
      html += '</a>';
    });

    if (detected.pages.length > 0) {
      html += '<div class="fab-sheet-divider">相关页面</div>';
      detected.pages.forEach(function(p) {
        html += '<a href="' + p.href + '" class="fab-sheet-item">';
        html += '<span class="fab-num">›</span>';
        html += '<span class="fab-label">' + p.label + '</span>';
        html += '</a>';
      });
    }

    html += '</div>';
    sheet.innerHTML = html;
    document.body.appendChild(sheet);

    fab.addEventListener('click', function() {
      fab.classList.remove('show');
      overlay.classList.add('show');
      sheet.classList.add('show');
      document.body.style.overflow = 'hidden';
    });

    function close() {
      overlay.classList.remove('show');
      sheet.classList.remove('show');
      document.body.style.overflow = '';
      setTimeout(function() {
        var st = window.scrollY;
        if (st > SCROLL_THRESHOLD) fab.classList.add('show');
      }, 300);
    }

    overlay.addEventListener('click', close);

    sheet.querySelectorAll('.fab-sheet-item').forEach(function(item) {
      item.addEventListener('click', function(e) {
        if (this.classList.contains('fab-sheet-top')) {
          e.preventDefault();
          close();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          close();
        }
      });
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && sheet.classList.contains('show')) {
        close();
      }
    });

    var ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          var st = window.scrollY;
          if (st > SCROLL_THRESHOLD && !sheet.classList.contains('show')) {
            fab.classList.add('show');
          } else {
            fab.classList.remove('show');
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    var topTimer;
    window.addEventListener('scroll', function() {
      clearTimeout(topTimer);
      topTimer = setTimeout(function() {
        var st = window.scrollY;
        if (st <= SCROLL_THRESHOLD && !sheet.classList.contains('show')) {
          fab.classList.remove('show');
        }
      }, 150);
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
