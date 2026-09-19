// Allied Pathways — shared site behaviour
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------------
     Mobile nav toggle
  --------------------------------------------------------------------- */
  var navToggle = document.querySelector('.nav-toggle');
  var mainNav = document.querySelector('.main-nav');
  if (navToggle && mainNav) {
    var closeNav = function () {
      mainNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    };
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mainNav.classList.contains('is-open')) {
        closeNav();
        navToggle.focus();
      }
    });
    document.addEventListener('click', function (e) {
      if (mainNav.classList.contains('is-open') && !mainNav.contains(e.target) && e.target !== navToggle) {
        closeNav();
      }
    });
    mainNav.querySelectorAll('.nav-links a').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });
  }

  /* ---------------------------------------------------------------------
     Accordion (Funding guide / FAQ)
  --------------------------------------------------------------------- */
  document.querySelectorAll('.accordion-trigger').forEach(function (trigger) {
    var panelId = trigger.getAttribute('aria-controls');
    var panel = document.getElementById(panelId);
    if (!panel) return;

    trigger.addEventListener('click', function () {
      var isOpen = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      if (isOpen) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  /* ---------------------------------------------------------------------
     Accessible testimonial carousel
     - keyboard operable prev/next + dots
     - pauses on hover/focus and honors prefers-reduced-motion
     - announces slide changes politely
  --------------------------------------------------------------------- */
  var track = document.querySelector('[data-testimonial-track]');
  if (track) {
    var slides = Array.prototype.slice.call(track.querySelectorAll('.testimonial-slide'));
    var dotsWrap = document.querySelector('[data-testimonial-dots]');
    var prevBtn = document.querySelector('[data-testimonial-prev]');
    var nextBtn = document.querySelector('[data-testimonial-next]');
    var pauseBtn = document.querySelector('[data-testimonial-pause]');
    var live = document.querySelector('[data-testimonial-live]');
    var current = 0;
    var timer = null;
    var playing = !prefersReducedMotion;

    slides.forEach(function (slide, i) {
      var dot = document.createElement('button');
      dot.className = 'testimonial-dot';
      dot.type = 'button';
      dot.setAttribute('aria-label', 'Show testimonial ' + (i + 1) + ' of ' + slides.length);
      dot.addEventListener('click', function () { goTo(i); stop(); });
      if (dotsWrap) dotsWrap.appendChild(dot);
    });
    var dots = dotsWrap ? Array.prototype.slice.call(dotsWrap.children) : [];

    function render() {
      slides.forEach(function (s, i) { s.classList.toggle('is-active', i === current); });
      dots.forEach(function (d, i) { d.setAttribute('aria-current', i === current ? 'true' : 'false'); });
      if (live) live.textContent = 'Testimonial ' + (current + 1) + ' of ' + slides.length;
    }
    function goTo(i) { current = (i + slides.length) % slides.length; render(); }
    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function start() {
      if (prefersReducedMotion) return;
      stop();
      timer = setInterval(next, 6000);
      playing = true;
      if (pauseBtn) pauseBtn.textContent = 'Pause';
    }
    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
      playing = false;
      if (pauseBtn) pauseBtn.textContent = 'Play';
    }

    if (nextBtn) nextBtn.addEventListener('click', function () { next(); stop(); });
    if (prevBtn) prevBtn.addEventListener('click', function () { prev(); stop(); });
    if (pauseBtn) pauseBtn.addEventListener('click', function () { playing ? stop() : start(); });

    // Pause on hover/focus within the widget
    var widget = document.querySelector('[data-testimonial-widget]');
    if (widget) {
      widget.addEventListener('mouseenter', stop);
      widget.addEventListener('focusin', stop);
    }

    render();
    if (!prefersReducedMotion) start();
  }

  /* ---------------------------------------------------------------------
     Form validation (Refer a Client / Contact)
     Accessible error summary pattern: focus moves to summary,
     each error links to its field, inline errors retained.
  --------------------------------------------------------------------- */
  document.querySelectorAll('form[data-validate]').forEach(function (form) {
    // The error summary / success panel live alongside the form (siblings
    // inside .form-card), not nested inside it, so search that scope.
    var scope = form.closest('.form-card') || form.parentElement || form;
    var summary = scope.querySelector('[data-error-summary]');
    var summaryList = scope.querySelector('[data-error-list]');
    var successPanel = scope.querySelector('[data-form-success]');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var errors = [];
      var seenRadioGroups = {};
      var fields = form.querySelectorAll('[required]');

      fields.forEach(function (field) {
        if (field.type === 'radio') {
          if (seenRadioGroups[field.name]) return; // one error per radio group, not per option
          seenRadioGroups[field.name] = true;

          var group = form.querySelectorAll('input[name="' + field.name + '"]');
          var groupValid = Array.prototype.some.call(group, function (r) { return r.checked; });
          var groupWrap = field.closest('.radio-group') || field.closest('fieldset');
          if (groupWrap) groupWrap.classList.toggle('has-error', !groupValid);

          if (!groupValid) {
            var legend = field.closest('fieldset') ? field.closest('fieldset').querySelector('legend') : null;
            var groupLabel = legend ? legend.textContent.replace('*', '').trim() : (field.name || 'This field');
            var jumpTarget = field.closest('.radio-group');
            errors.push({ id: jumpTarget ? jumpTarget.id : field.id, label: groupLabel });
          }
          return;
        }

        var wrap = field.closest('.field');
        var isValid = true;

        if (field.type === 'checkbox') {
          isValid = field.checked;
        } else if (field.type === 'email') {
          isValid = field.value.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
        } else {
          isValid = field.value.trim() !== '';
        }

        if (wrap) wrap.classList.toggle('has-error', !isValid);

        if (!isValid) {
          var label = wrap ? wrap.querySelector('label') : null;
          var labelText = label ? label.textContent.replace('*', '').trim() : (field.name || 'This field');
          errors.push({ id: field.id, label: labelText });
        }
      });

      if (errors.length > 0) {
        if (summaryList) {
          summaryList.innerHTML = '';
          errors.forEach(function (err) {
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.href = '#' + err.id;
            a.textContent = err.label;
            a.addEventListener('click', function (ev) {
              ev.preventDefault();
              var target = document.getElementById(err.id);
              if (target) { target.focus(); target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'center' }); }
            });
            li.appendChild(a);
            summaryList.appendChild(li);
          });
        }
        if (summary) {
          summary.classList.add('is-visible');
          summary.setAttribute('tabindex', '-1');
          summary.focus();
        }
        return;
      }

      if (summary) summary.classList.remove('is-visible');

      if (form.hasAttribute('data-mailto-form')) {
        var recipient = form.getAttribute('data-recipient') || '';
        var lines = [];
        fields.forEach(function (field) {
          if (field.type === 'checkbox' || field.type === 'radio') return;
          var wrap = field.closest('.field');
          var label = wrap ? wrap.querySelector('label') : null;
          var labelText = label ? label.textContent.replace('*', '').trim() : (field.name || 'Field');
          lines.push(labelText + ': ' + field.value.trim());
        });
        form.querySelectorAll('input:not([required]), textarea:not([required])').forEach(function (field) {
          if (field.type === 'checkbox' || field.value.trim() === '') return;
          var wrap = field.closest('.field');
          var label = wrap ? wrap.querySelector('label') : null;
          var labelText = label ? label.textContent.replace('*', '').trim() : (field.name || 'Field');
          lines.push(labelText + ': ' + field.value.trim());
        });
        var subject = 'New testimonial submission';
        var body = lines.join('\n\n');
        window.location.href = 'mailto:' + encodeURIComponent(recipient) + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      }

      form.style.display = 'none';
      if (successPanel) {
        successPanel.classList.add('is-visible');
        successPanel.setAttribute('tabindex', '-1');
        successPanel.focus();
      }
    });

    // Clear individual field error on input
    form.addEventListener('input', function (e) {
      var wrap = e.target.closest('.field');
      if (wrap) wrap.classList.remove('has-error');
    });
  });

  /* Current year in footer */
  document.querySelectorAll('[data-current-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
