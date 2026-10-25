/**
 * =========================================================
 * AT12C DEVELOPER ARCHIVE: DUAL SECRET ARCADE (dev-arcade.js)
 * 
 * ・第1弾: 『BLOOD PRESSURE』（サイバーサバイバルアクション）
 * ・第2弾: 『STELLAR COMMAND FRONT』（3D宇宙艦隊戦術＆操縦アクション）
 * 
 * ・Webサイト全17ページおよび2大ゲームを完全自作したAT12Cの開発者クレジットを提示
 * ・本体サイトのパフォーマンス（読込速度・FPS・メモリ）に負荷をかけない完全分離設計
 * =========================================================
 */
(function () {
/*
  let overlayEl = null;

  function createArcadeDom() {
    if (document.getElementById("dev-arcade-overlay")) {
      overlayEl = document.getElementById("dev-arcade-overlay");
      return;
    }

    const overlay = document.createElement("div");
    overlay.id = "dev-arcade-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "AT12C DEVELOPER ARCHIVE");

    overlay.innerHTML = `
      <div class="da-card" style="max-width: 580px;">
        <div class="da-header">
          <div class="da-title-wrap">
            <span class="da-pulse-dot" style="background:#FFA502; box-shadow:0 0 10px #FFA502;"></span>
            <div class="da-title">AT12C <span class="tag">DEV ARCHIVE // 2026</span></div>
          </div>
          <button type="button" class="da-close-btn" id="da-close-btn" aria-label="閉じる">&times;</button>
        </div>
        <div class="da-body">

          <!-- 開発者メッセージ（AT12Cより） -->
          <div class="da-note-box" style="margin-bottom: 4px;">
            <strong class="hl-gold">【サイトを見てくれてありがとう！】</strong><br>
            私が作ったレクリエーションサイトを見てくれてありがとうございます！<br>
            ちょっとしたおまけとして隠し要素（ミニゲーム）も作ってみたので、良ければやってみてね！<br>
            <span style="color: #FFA502; font-weight: bold; display: block; margin-top: 4px; text-align: right;">― AT12C より</span>
            <small style="color: #92CDFA; display:block; margin-top:4px;">※ゲームは別タブで開きます。スマホ・PCどちらでもプレイできます！</small>
          </div>

          <!-- ゲーム選択カード 1: STELLAR COMMAND FRONT -->
          <div class="da-game-card" id="card-stellar" style="background: rgba(7, 26, 44, 0.9); border: 2px solid #38B6F0; border-radius: 14px; padding: 14px 16px; display: flex; flex-direction: column; gap: 8px;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span style="background: rgba(56, 182, 240, 0.2); border: 1px solid #38B6F0; color: #38B6F0; font-size: 0.72rem; font-weight: 900; padding: 2px 10px; border-radius: 12px; letter-spacing: 0.5px;">ENTRY 02 // 3D宇宙艦隊戦術アクション</span>
              <span style="font-size: 0.75rem; color: #FFA502; font-weight: bold;">PC ＆ スマホ両対応</span>
            </div>
            <h3 style="font-size: 1.35rem; font-weight: 900; color: #FFFFFF; margin: 0; letter-spacing: 1px;">STELLAR COMMAND FRONT</h3>
            <p style="font-size: 0.8rem; color: #B0D4ED; margin: 0; line-height: 1.5;">
              最大200隻の巨大艦隊を指揮し、自ら旗艦や戦闘機を操縦して最前線で戦う本格3Dスペースアクション！
              <span style="display:block; color:#FFA502; font-size:0.78rem; font-weight:bold; margin-top:4px;">（※こちらの3D宇宙ゲームも私が作ってみました！良ければ遊んでみてね）</span>
            </p>
            <div style="display:flex; justify-content: space-between; align-items: center; margin-top: 4px;">
              <span style="font-size: 0.74rem; color: #7CA6C4;">[操作] 指揮 / 操縦 / 仮想スティック</span>
              <a href="js/engine/stellar-command.html" target="_blank" rel="noopener noreferrer" class="da-play-btn" style="width: auto; padding: 8px 22px; font-size: 0.88rem; background: linear-gradient(135deg, #38B6F0 0%, #1674A6 100%); box-shadow: 0 4px 15px rgba(56, 182, 240, 0.45);">
                <span>🚀 出撃する ↗</span>
              </a>
            </div>
          </div>

          <!-- ゲーム選択カード 2: BLOOD PRESSURE -->
          <div class="da-game-card" id="card-blood" style="background: rgba(30, 10, 16, 0.9); border: 2px solid #ef3448; border-radius: 14px; padding: 14px 16px; display: flex; flex-direction: column; gap: 8px;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span style="background: rgba(239, 52, 72, 0.2); border: 1px solid #ef3448; color: #ff6b7d; font-size: 0.72rem; font-weight: 900; padding: 2px 10px; border-radius: 12px; letter-spacing: 0.5px;">ENTRY 01 // サイバーサバイバルアクション</span>
              <span style="font-size: 0.75rem; color: #FFA502; font-weight: bold;">PC ＆ スマホ両対応</span>
            </div>
            <h3 style="font-size: 1.35rem; font-weight: 900; color: #FFFFFF; margin: 0; letter-spacing: 1px;">BLOOD PRESSURE</h3>
            <p style="font-size: 0.8rem; color: #E8B4B8; margin: 0; line-height: 1.5;">
              流した血痕が最強の武器になる！戦場の血液を起爆・変形させて押し寄せる敵を殲滅するハイスピードアクション！
              <span style="display:block; color:#FFA502; font-size:0.78rem; font-weight:bold; margin-top:4px;">（※このミニゲームも私が作ってみました！良ければ楽しんでね）</span>
            </p>
            <div style="display:flex; justify-content: space-between; align-items: center; margin-top: 4px;">
              <span style="font-size: 0.74rem; color: #BA8A8E;">[操作] WASD / マウス / 360°タッチ</span>
              <a href="js/engine/blood-pressure.html" target="_blank" rel="noopener noreferrer" class="da-play-btn" style="width: auto; padding: 8px 22px; font-size: 0.88rem;">
                <span>🩸 起動する ↗</span>
              </a>
            </div>
          </div>

          <button type="button" class="da-return-btn" id="da-return-btn">サイトに戻る</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    overlayEl = overlay;

    // イベントリスナー設定
    const closeBtn = overlay.querySelector("#da-close-btn");
    const returnBtn = overlay.querySelector("#da-return-btn");

    if (closeBtn) closeBtn.addEventListener("click", closeDevArcade);
    if (returnBtn) returnBtn.addEventListener("click", closeDevArcade);

    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) {
        closeDevArcade();
      }
    });

    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && overlayEl && overlayEl.classList.contains("active")) {
        closeDevArcade();
      }
    });
  }

  function openDevArcade(targetGame) {
    createArcadeDom();
    if (!overlayEl) return;

    // 特定ゲームが指定された場合、そのカードを強調ハイライト
    if (targetGame === 'stellar') {
      const cardS = overlayEl.querySelector('#card-stellar');
      if (cardS) {
        cardS.style.transform = 'scale(1.02)';
        cardS.style.boxShadow = '0 0 25px rgba(56, 182, 240, 0.7)';
      }
    } else if (targetGame === 'blood') {
      const cardB = overlayEl.querySelector('#card-blood');
      if (cardB) {
        cardB.style.transform = 'scale(1.02)';
        cardB.style.boxShadow = '0 0 25px rgba(239, 52, 72, 0.7)';
      }
    }

    overlayEl.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeDevArcade() {
    if (!overlayEl) return;
    overlayEl.classList.remove("active");
    document.body.style.overflow = "";
  }

  // グローバル公開
  window.openDevArcade = openDevArcade;
  window.closeDevArcade = closeDevArcade;

  openDevArcade();
*/
})();
