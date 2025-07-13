// カスタムカーソル
const cursor = document.createElement("div")
cursor.className = "custom-cursor"
document.body.appendChild(cursor)

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX - 10 + "px"
  cursor.style.top = e.clientY - 10 + "px"
})

// ホバーエフェクト
const hoverElements = document.querySelectorAll("a, button, .cyber-btn, .nav-item, .tech-orb, .social-link")
hoverElements.forEach((element) => {
  element.addEventListener("mouseenter", () => {
    cursor.classList.add("hover")
  })

  element.addEventListener("mouseleave", () => {
    cursor.classList.remove("hover")
  })
})

// スムーズスクロール
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// ナビゲーションアクティブ状態
const navItems = document.querySelectorAll(".nav-item")
const sections = document.querySelectorAll("section")

window.addEventListener("scroll", () => {
  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navItems.forEach((item) => {
    item.classList.remove("active")
    if (item.getAttribute("href") === `#${current}`) {
      item.classList.add("active")
    }
  })
})

// スクロールアニメーション
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// アニメーション対象要素を監視
document
  .querySelectorAll(".about-card, .skill-category, .project-card, .info-card, .contact-form-container")
  .forEach((el) => {
    el.classList.add("fade-in")
    observer.observe(el)
  })

// フォーム送信
document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault()

  const formData = new FormData(this)
  const data = Object.fromEntries(formData)

  // 簡単なバリデーション
  if (!data.name || !data.email || !data.message) {
    showNotification("必須項目を入力してください", "error")
    return
  }

  // 送信ボタンを無効化
  const submitBtn = this.querySelector('button[type="submit"]')
  const originalText = submitBtn.innerHTML
  submitBtn.innerHTML = '<span>TRANSMITTING...</span><i class="fas fa-spinner fa-spin"></i>'
  submitBtn.disabled = true

  // 送信シミュレーション
  setTimeout(() => {
    showNotification("メッセージを送信しました！24時間以内にご返信いたします。", "success")
    this.reset()
    submitBtn.innerHTML = originalText
    submitBtn.disabled = false
  }, 2000)
})

// 通知システム
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${type === "success" ? "check-circle" : type === "error" ? "exclamation-circle" : "info-circle"}"></i>
      <span>${message}</span>
    </div>
  `

  // 通知スタイル
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === "success" ? "var(--neon-green)" : type === "error" ? "#ff0066" : "var(--neon-cyan)"};
    color: #000000;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    box-shadow: 0 0 30px currentColor;
    z-index: 10000;
    transform: translateX(400px);
    transition: all 0.3s ease;
    font-family: 'Orbitron', monospace;
    font-weight: 700;
  `

  document.body.appendChild(notification)

  // アニメーション
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // 自動削除
  setTimeout(() => {
    notification.style.transform = "translateX(400px)"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 4000)
}

// パーティクルエフェクト
function createParticle(x, y) {
  const particle = document.createElement("div")
  particle.style.cssText = `
    position: fixed;
    width: 4px;
    height: 4px;
    background: var(--neon-cyan);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    left: ${x}px;
    top: ${y}px;
    box-shadow: 0 0 10px var(--neon-cyan);
  `

  document.body.appendChild(particle)

  // アニメーション
  const angle = Math.random() * Math.PI * 2
  const velocity = Math.random() * 100 + 50
  const vx = Math.cos(angle) * velocity
  const vy = Math.sin(angle) * velocity

  let opacity = 1
  let posX = x
  let posY = y

  const animate = () => {
    posX += vx * 0.02
    posY += vy * 0.02
    opacity -= 0.02

    particle.style.left = posX + "px"
    particle.style.top = posY + "px"
    particle.style.opacity = opacity

    if (opacity > 0) {
      requestAnimationFrame(animate)
    } else {
      document.body.removeChild(particle)
    }
  }

  animate()
}

// クリック時のパーティクル
document.addEventListener("click", (e) => {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      createParticle(e.clientX, e.clientY)
    }, i * 50)
  }
})

// スキルバーアニメーション
const skillBars = document.querySelectorAll(".skill-fill")
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target
        const width = bar.style.width
        bar.style.width = "0%"
        setTimeout(() => {
          bar.style.transition = "width 2s ease"
          bar.style.width = width
        }, 500)
      }
    })
  },
  { threshold: 0.5 },
)

skillBars.forEach((bar) => {
  skillObserver.observe(bar)
})

// ランダムグリッチエフェクト
setInterval(() => {
  const glitchElements = document.querySelectorAll(".glitch")
  glitchElements.forEach((element) => {
    if (Math.random() < 0.1) {
      element.style.animation = "none"
      setTimeout(() => {
        element.style.animation = ""
      }, 100)
    }
  })
}, 3000)

// 背景エフェクトの強化
setInterval(() => {
  const shapes = document.querySelectorAll(".shape")
  shapes.forEach((shape) => {
    if (Math.random() < 0.3) {
      shape.style.filter = `hue-rotate(${Math.random() * 360}deg)`
    }
  })
}, 2000)

console.log("🚀 CYBER PORTFOLIO INITIALIZED 🌈")
console.log("Welcome to the future of web development!")
