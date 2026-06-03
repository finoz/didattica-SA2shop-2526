import './styles/main.scss'
import products from './data/products.json'

const BADGES = [null, null, null, 'NUOVO', 'BESTSELLER', '-15%', '-20%', 'LIMITATO']

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomStars() {
  const values = [3, 3.5, 4, 4.5, 5]
  return values[Math.floor(Math.random() * values.length)]
}

function renderStars(rating) {
  const full = Math.floor(rating)
  const half = rating % 1 !== 0
  const empty = 5 - full - (half ? 1 : 0)
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty)
}

function badgeClass(label) {
  if (!label) return ''
  if (label === 'NUOVO') return 'badge badge--new'
  if (label === 'BESTSELLER') return 'badge badge--bestseller'
  if (label.startsWith('-')) return 'badge badge--sale'
  if (label === 'LIMITATO') return 'badge badge--limited'
  return 'badge'
}

function initHero(product) {
  const img = document.getElementById('hero-img')
  const badge = document.getElementById('hero-price')
  img.src = product.product_image
  img.alt = product.product_name
  badge.textContent = 'DA ' + product.product_price
}

function initFeatured(product) {
  const img = document.getElementById('feat-img')
  const name = document.getElementById('feat-name')
  const price = document.getElementById('feat-price')
  const link = document.getElementById('feat-link')
  const badgeEl = document.getElementById('feat-badge')

  img.src = product.product_image
  img.alt = product.product_name
  name.textContent = product.product_name
  price.textContent = product.product_price
  link.href = '/prodotti/' + product.student_id + '/'

  const label = BADGES[randomInt(0, BADGES.length - 1)]
  if (label) {
    badgeEl.textContent = label
    badgeEl.className = badgeClass(label)
  } else {
    badgeEl.remove()
  }
}

function renderProductCard(product) {
  const badge = BADGES[randomInt(0, BADGES.length - 1)]
  const stars = randomStars()
  const reviews = randomInt(10, 200)

  const badgeHtml = badge
    ? `<span class="${badgeClass(badge)} product-card__badge">${badge}</span>`
    : ''

  return `
    <article class="product-card">
      <div class="product-card__image-wrap">
        <img
          class="product-card__image"
          src="${product.product_image}"
          alt="${product.product_name}"
          onerror="this.style.background='var(--color-surface)';"
        />
        ${badgeHtml}
      </div>
      <div class="product-card__info">
        <p class="product-card__name">${product.product_name}</p>
        <p class="product-card__sku">${product.product_sku}</p>
        <p class="product-card__price">${product.product_price}</p>
        <div class="product-card__stars">
          <span class="product-card__stars-icons">${renderStars(stars)}</span>
          <span class="product-card__stars-count">(${reviews})</span>
        </div>
        <a href="/prodotti/${product.student_id}/" class="product-card__btn">ACQUISTA</a>
      </div>
    </article>
  `
}

function initProducts(productList) {
  const grid = document.getElementById('products-grid')
  const count = document.getElementById('products-count')
  count.textContent = productList.length + ' prodotti'
  grid.innerHTML = productList.map(renderProductCard).join('')
}

function initHamburger() {
  const btn = document.getElementById('hamburger')
  const nav = document.getElementById('main-nav')

  btn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('nav--open')
    btn.classList.toggle('hamburger--open', isOpen)
    btn.setAttribute('aria-expanded', String(isOpen))
  })

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav--open')
      btn.classList.remove('hamburger--open')
      btn.setAttribute('aria-expanded', 'false')
    })
  })
}

document.addEventListener('DOMContentLoaded', () => {
  const shuffled = shuffle(products)

  initHero(shuffled[0])
  initFeatured(shuffled[1] || shuffled[0])
  initProducts(products)
  initHamburger()
})
